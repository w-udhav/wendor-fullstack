import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Icon from "../Icon";
import { categories } from "@/utils/constants";
import { axiosInstance } from "@/utils/axiosInstance";

export default function AddProductModal({ refreshData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = React.useState({
    name: "",
    price: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    const { name, price, category } = formData;

    try {
      const res = await axiosInstance.post("/product/create", {
        name,
        price,
        category,
      });
      if (res.status === 201) {
        console.log("Product created successfully");
        setFormData({
          name: "",
          price: "",
          category: "",
        });
        refreshData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Button
        onPress={onOpen}
        className="text-sm flex items-center justify-center py-2"
      >
        <Icon name="add" className="font-medium" /> Add Product
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        className="dark"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Product
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Product Name"
                  name="name"
                  variant="bordered"
                  value={formData.name}
                  onChange={handleChange}
                />
                <Select
                  label="Select an option"
                  variant="bordered"
                  className="w-full"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((category, index) => (
                    <SelectItem value={category} key={category}>
                      {category}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Product Price"
                  type="number"
                  name="price"
                  variant="bordered"
                  value={formData.price}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleCreate}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
