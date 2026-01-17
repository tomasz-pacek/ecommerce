import CardWrapper from "../_components/card-wrapper";
import PrismClient from "../_components/prism-client";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PrismClient />
      </div>

      <CardWrapper cardTitle="Login to your account">
        <LoginForm />
      </CardWrapper>
    </div>
  );
}
