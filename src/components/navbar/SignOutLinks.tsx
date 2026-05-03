"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "sonner";

const SignOutLinks = () => {
  const handleLogout = () => {
    toast("Logout Successfully!!");
  };

  return (
    <SignOutButton redirectUrl="/">
      <button
        className="w-full text-start cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLinks;
