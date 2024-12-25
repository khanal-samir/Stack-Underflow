"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

const Login = () => {
  const { login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!email || !password) {
      setError("Please fill out all the fields");
      return;
    }
    setLoading(true);
    setError("");

    const loginResponse = await login(email.toString(), password.toString());
    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }
    setLoading(false);
  };
  return <div>login</div>;
};

export default Login;
