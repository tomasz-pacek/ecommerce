import NavbarServer from "@/components/navbar/navbar-server";
import SignOutButton from "./_components/sign-out-button";
import { getCurrentSession } from "@/lib/auth-utils";
import { getInitials } from "@/utils/get-initials";
import AccountNavigation from "./_components/account-navigation";

type Props = {
  children: React.ReactNode;
};

export default async function AccountLayout({ children }: Props) {
  const session = await getCurrentSession();
  const userInitials = getInitials(session?.user?.name || "");

  return (
    <>
      <NavbarServer />
      <div className="container mx-auto flex items-start justify-center gap-x-8 pt-24">
        <aside className="shrink-0 lg:w-72">
          <div className="bg-card border-border sticky top-24 rounded-2xl border p-6">
            {/* User Info */}
            <div className="border-border flex items-center gap-4 border-b pb-6">
              <div className="bg-primary flex h-14 w-14 items-center justify-center rounded-full">
                <span className="text-secondary-foreground text-xl font-semibold">
                  {userInitials}
                </span>
              </div>
              <div>
                <h3 className="text-foreground font-semibold">
                  {session?.user?.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <AccountNavigation />
            {/* Sign Out */}
            <div className="border-border mt-6 border-t pt-6">
              <SignOutButton />
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </>
  );
}
