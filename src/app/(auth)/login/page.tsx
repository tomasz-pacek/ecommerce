import CardWrapper from "../_components/card-wrapper";
import NewHere from "../_components/new-here";
import PrismClient from "../_components/prism-client";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PrismClient />
      </div>

      <CardWrapper cardTitle="Login to your account">
        <LoginForm />
        <NewHere
          introText="New here?"
          actionText="Create your account"
          href="/register"
        />
      </CardWrapper>
    </div>
  );
}
