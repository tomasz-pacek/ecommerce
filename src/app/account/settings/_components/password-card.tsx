import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CardHeaderTemplate from "./card-header-template";
import { LockIcon } from "lucide-react";
import PasswordForm from "./password-form";

export default function PasswordCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardHeaderTemplate
          h2="Change password"
          description="Update your account password"
          icon={LockIcon}
        />
      </CardHeader>
      <CardContent>
        <PasswordForm />
      </CardContent>
    </Card>
  );
}
