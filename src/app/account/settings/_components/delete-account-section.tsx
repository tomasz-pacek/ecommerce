"use client";

import ActionButton from "@/components/action-button";
import DeleteAccountDialog from "./delete-account-dialog";
import { useState } from "react";

export default function DeleteAccountSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <ActionButton
        variant="destructive"
        className="cursor-pointer"
        content="Delete Account"
        onClick={() => setIsOpen(true)}
      />
      <DeleteAccountDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
