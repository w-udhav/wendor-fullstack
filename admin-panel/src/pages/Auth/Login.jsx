import Button from "@/components/Button";
import Input from "@/components/Input";
import { axiosInstance } from "@/utils/axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let isLoading = false;
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("admin/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      if (res.status === 200) {
        // using useAuth
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <Input
        id="email"
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        id="password"
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button isLoading={isLoading} onClick={handleSubmit} disabled={false}>
        Continue
      </Button>
    </form>
  );
}
