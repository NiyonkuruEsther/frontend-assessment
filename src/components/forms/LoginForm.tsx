"use client";
import Link from "next/link";
import Button from "../shared/Button";
import Checkbox from "../shared/Checkbox";
import InputField from "../shared/InputField";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);

    try {
      router.push("/patients");
    } catch (error) {
      console.error("Navigation error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <span className="text-xl">Sign in to continue</span>
      <InputField name="email" placeholder="Email Address" />
      <InputField name="password" placeholder="Password" />
      <div className="flex justify-between">
        <Checkbox label="Remember me" />
        <Link
          className="font-bold text-primary text-sm"
          href={"/forgot-password"}
        >
          Forgot Password
        </Link>
      </div>
      <Button variant="filled" type="submit" disabled={isLoading}>
        {isLoading
          ? <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span>Loading...</span>
            </div>
          : "Login"}
      </Button>
    </form>
  );
}
