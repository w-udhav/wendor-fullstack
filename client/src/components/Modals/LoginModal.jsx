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
import { axiosInstance } from "@/utils/axiosInstance";
import Icon from "../Icon";

export default function LoginModal() {
  const { login, user, logout } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post("/user/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        login(res?.data?.user, res?.data?.token);
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
                  autoFocus
                  label="Email"
                  type="email"
                  name="email"
                  variant="flat"
                  endContent={
                    <Icon name="alternate_email" className="text-zinc-500" />
                  }
                  value={formData.email}
                  onChange={handleChange}
                />
                <Input
                  label="Password"
                  type="password"
                  name="password"
                  variant="flat"
                  endContent={
                    <Icon name="password" className="text-zinc-500" />
                  }
                  value={formData.password}
                  onChange={handleChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleLogin}>
                  Login
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
