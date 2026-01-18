import { authClient } from "@/lib/auth-client";

export function useAuth() {
  const { data: session, isPending } = authClient.useSession();

  return {
    user: session?.user,
    isLoading: isPending,
    isLoggedIn: !!session?.user,
    session,
  };
}
