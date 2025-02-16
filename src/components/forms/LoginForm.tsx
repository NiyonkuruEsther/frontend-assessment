"use client";
import Link from "next/link";
import Checkbox from "../shared/Checkbox";
import InputField from "../shared/InputField";

import { useRouter } from "next/navigation";
import Button from "../shared/Button";

export default function LoginForm() {
  const router = useRouter();

  return (
    <form className="flex flex-col gap-5 ">
      <span className="text-xl">Sign in to continue</span>
      <InputField name="email" placeholder="Email Address" />
      <InputField name="passord" placeholder="Password" />
      <div className="flex justify-between">
        <Checkbox label="Remember me" />
        <Link
          className="font-bold text-primary text-sm"
          href={"/forgot-password"}
        >
          Forgot Password
        </Link>
      </div>
      {/* <Button size="lg" className="mt-10">
        Login
      </Button> */}
      <Button variant="filled" onClick={() => router.push("/patients")}>
        Login
      </Button>
    </form>
  );
}
