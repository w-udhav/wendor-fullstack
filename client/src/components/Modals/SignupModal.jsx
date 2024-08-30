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
} from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { registerUser } from "@/utils/api";

export default function SignupModal() {
  const { login, loading, user, logout } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const { data, status } = await registerUser(formData);
      if (status === 201) {
        login(data?.user, data?.token);
        onOpenChange();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };

  console.log(user, loading);

  return (
    <>
      {!user ? (
        <Button color="primary" variant="flat" onPress={onOpen}>
          Login
        </Button>
      ) : (
        <Button color="danger" variant="flat" onPress={handleLogout}>
          Logout
        </Button>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <Input
                  label="Full Name"
                  type="text"
                  name="fullName"
                  variant="flat"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  variant="flat"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  variant="flat"
                  value={formData.password}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Login</ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  variant="flat"
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  variant="flat"
                  value={formData.password}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
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
