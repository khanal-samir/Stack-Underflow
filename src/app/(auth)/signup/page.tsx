"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";

const RegisterPage = () => {
  const { signup, login } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // data collection
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    // validation
    if (!username || !email || !password) {
      setError("Please fill out all the fields");
      return;
    }
    //loading
    setLoading(true);
    setError("");
    //functionality
    const response = await signup(
      username.toString(),
      email.toString(),
      password.toString(),
    );
    if (response.error) {
      setError(() => response.error!.message);
    } else {
      const loginResponse = await login(email.toString(), password.toString());
      if (loginResponse.error) {
        setError(() => loginResponse.error!.message);
      }
    }
    setLoading(false);
  };

  return <div></div>;
};

export default RegisterPage;
