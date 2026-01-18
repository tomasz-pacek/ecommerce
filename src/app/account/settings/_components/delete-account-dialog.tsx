"use client";

import ActionButton from "@/components/action-button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { EyeClosedIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeleteAccountDialog({ open, onOpenChange }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    await authClient.deleteUser(
      {
        password,
      },
      {
        onRequest: () => {
          setIsDeleting(true);
        },
        onSuccess: () => {
          toast("Your account has been successfully deleted.");
          router.push("/");
          setIsDeleting(false);
        },
        onError: (ctx) => {
          toast(ctx.error.message || "Error deleting account");
          setIsDeleting(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <Label
          htmlFor="delete-account-password-input"
          className="flex flex-col items-start"
        >
          Enter your current password to delete your account
          <InputGroup>
            <InputGroupInput
              id="delete-account-password-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={isPasswordVisible ? "text" : "password"}
              autoComplete="off"
            />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <EyeClosedIcon /> : <EyeIcon />}
            </InputGroupAddon>
          </InputGroup>
        </Label>
        <ActionButton
          content="Delete"
          className="w-full cursor-pointer"
          variant="destructive"
          disabled={isDeleting}
          isPending={isDeleting}
          isPendingContent="Deleting..."
          onClick={handleDeleteAccount}
        />
      </DialogContent>
    </Dialog>
  );
}
