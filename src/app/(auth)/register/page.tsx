import CardWrapper from "../_components/card-wrapper";
import RegisterForm from "./_components/register-form";
import PrismClient from "../_components/prism-client";

export default function RegisterPage() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PrismClient />
      </div>

      <CardWrapper cardTitle="Create your account">
        <RegisterForm />
      </CardWrapper>
    </div>
  );
}
