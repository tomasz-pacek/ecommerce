"use client";

import { Button } from "./ui/button";

type Props = {
  content: string;
  className: string;
  isPending?: boolean;
  isPendingContent?: string;
  type?: "button" | "submit" | "reset";
};

export default function ActionButton({
  content,
  className,
  isPending,
  isPendingContent,
  type,
}: Props) {
  return (
    <Button className={className} disabled={isPending} type={type}>
      {isPending ? isPendingContent : content}
    </Button>
  );
}
