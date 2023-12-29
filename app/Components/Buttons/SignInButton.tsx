"use client";
import { Button } from "@nextui-org/react";

import { useSession, signIn, signOut } from "next-auth/react";
const SignInButton = () => {
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-x-2">
        <span>{session.user.name}</span>
        <Button onClick={() => signOut()}>Sign out</Button>
      </div>
    );
  }
  return (
    <div>
      <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
        Sign In
      </Button>
    </div>
  );
};

export default SignInButton;
