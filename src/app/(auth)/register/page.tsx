import CardWrapper from "../_components/card-wrapper";
import RegisterForm from "./_components/register-form";
import PrismClient from "../_components/prism-client";
import NewHere from "../_components/new-here";

export default function RegisterPage() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <PrismClient />
      </div>

      <CardWrapper cardTitle="Create your account">
        <RegisterForm />
        <NewHere
          introText="Already been here?"
          actionText="Login to your account"
          href="/login"
        />
      </CardWrapper>
    </div>
  );
}
