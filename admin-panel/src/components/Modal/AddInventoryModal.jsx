import React, { useEffect } from "react";
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
import { fetchProducts } from "@/utils/commonFunctions";

export default function AddInventoryModal({ refreshData }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [products, setProducts] = React.useState([]);
  const [formData, setFormData] = React.useState({
    productId: "",
    quantity: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreate = async () => {
    try {
      const res = await axiosInstance.post("/inventory/create", {
        productId: formData.productId,
        quantity: formData.quantity,
      });
      if (res.status === 201) {
        console.log("Product created successfully");
        setFormData({
          productId: "",
          quantity: "",
        });
        refreshData();
      }
    } catch (error) {
      console.log(error);
    }

    onOpenChange(false);
  };

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <>
      <Button
        onPress={onOpen}
        className="text-sm flex items-center justify-center py-2"
      >
        <Icon name="add" className="font-medium" /> Add Inventory
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
                <Select
                  label="Select a Product"
                  variant="bordered"
                  className="w-full"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                >
                  {products &&
                    products.map((product, index) => (
                      <SelectItem value={product?.id} key={product?.id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                </Select>
                <Input
                  label="Quantity"
                  type="number"
                  name="quantity"
                  variant="bordered"
                  value={formData.quantity}
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
