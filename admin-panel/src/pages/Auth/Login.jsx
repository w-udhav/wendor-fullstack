import Button from "@/components/Button";
import Input from "@/components/Input";
import React from "react";

export default function Login() {
  return (
    <form className="flex flex-col gap-3">
      <Input type="text" placeholder="Email" />
      <Input type="text" placeholder="Password" />
      <Button disabled={false}>Continue</Button>
    </form>
  );
}
