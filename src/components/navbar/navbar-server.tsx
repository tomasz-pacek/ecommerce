import { getCurrentSession } from "@/lib/auth-utils";
import { NavbarClient } from "./navbar-client";

export default async function NavbarServer() {
  const session = await getCurrentSession();
  return <NavbarClient session={session} />;
}
