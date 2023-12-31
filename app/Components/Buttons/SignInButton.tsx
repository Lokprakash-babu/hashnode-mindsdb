"use client";

import Button from ".";
const SignInButton = () => {
  const session = {};
  if (session && session.user) {
    return (
      <div className="flex gap-x-2">
        <span>{session.user.name}</span>
        <Button>Sign out</Button>
      </div>
    );
  }
  return (
    <div>
      <Button>Sign In</Button>
    </div>
  );
};

export default SignInButton;
