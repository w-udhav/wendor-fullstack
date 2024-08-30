import { axiosInstance } from "./axiosInstance";

export const registerUser = async (data) => {
  if (!data) {
    return;
  }
  const res = await axiosInstance.post("/user/auth/register", {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
  });
  console.log(res);
  return { data: res.data, status: res.status };
};
