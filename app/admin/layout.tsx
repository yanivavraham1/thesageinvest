"use client";

import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
    const storedKey = localStorage.getItem("secretKey");

    if (storedKey === secretKey) {
      setIsAuthenticated(true);
    } else {
      const enteredKey = prompt("Enter the secret key:");
      if (enteredKey === secretKey) {
        localStorage.setItem("secretKey", secretKey);
        setIsAuthenticated(true);
      } else {
        alert("Incorrect secret key.");
        window.location.href = "/";
      }
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a spinner
  }

  if (!isAuthenticated) {
    return null; // will redirect anyway
  }

  return <>{children}</>;
}
