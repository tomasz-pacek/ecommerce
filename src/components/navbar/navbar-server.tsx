import { getCurrentSession } from "@/lib/auth-utils";
import { NavbarClient } from "./navbar-client";
import { Suspense } from "react";

async function NavbarData() {
  const session = await getCurrentSession();
  return <NavbarClient session={session} />;
}

export default function NavbarServer() {
  return (
    <Suspense fallback={<div className="bg-background/80 h-16 border-b" />}>
      <NavbarData />
    </Suspense>
  );
}
