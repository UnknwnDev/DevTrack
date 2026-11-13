import { useState } from "react";

export function useAuthForm(defaultEmail = "") {
  const [email, setEmail] = useState(defaultEmail);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return {
    email,
    name,
    password,
    setEmail,
    setName,
    setPassword,
    isValid: email.includes("@") && password.length >= 8,
  };
}
