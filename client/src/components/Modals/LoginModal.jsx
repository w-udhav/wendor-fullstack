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
import toast from "react-hot-toast";
import SignupModal from "./SignupModal";

export default function LoginModal() {
  const { login, user, logout } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isSignUpClicked, setIsSignUpClicked] = React.useState(false);

  useEffect(() => {
    if (isSignUpClicked) {
      onOpenChange();
    }
  }, [isSignUpClicked]);

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
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error("Failed to login");
      console.error(error);
    }
  };

  const handleLogout = () => {
    try {
      logout();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
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
                <button
                  onClick={() => setIsSignUpClicked(true)}
                  className="text-sm text-left"
                >
                  Don't have an account?
                </button>
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

      <SignupModal isOpen={isSignUpClicked} onOpenChange={setIsSignUpClicked} />
    </>
  );
}
