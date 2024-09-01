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

export default function SignupModal({ isOpen, onOpenChange }) {
  const { login, loading, user, logout } = useAuth();
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

  console.log(user, loading);

  return (
    <Modal isOpen={isOpen} onClose={() => onOpenChange(false)}>
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
                Sign Up
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
