"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();
  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/");
  };
  return (
    <Button
      size="sm"
      className="w-full cursor-pointer text-sm font-normal"
      variant="destructive"
      onClick={handleSignOut}
    >
      <LogOut className="size-4" />
      Log out
    </Button>
  );
}
