import Button from "@/components/Button";
import Input from "@/components/Input";
import { useAuth } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axiosInstance";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user, loading } = useAuth();
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
      const res = await axiosInstance.post("/user/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(res);
      if (res.status === 200) {
        login(res?.data?.user, res?.data?.token);
        navigate("/dashboard");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred");
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
      <Button loading={loading} onClick={handleSubmit} disabled={false}>
        Continue
      </Button>
    </form>
  );
}
