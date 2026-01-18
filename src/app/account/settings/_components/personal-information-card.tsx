import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "lucide-react";
import PersonalInformationForm from "./personal-information-form";
import { getCurrentSession } from "@/lib/auth-utils";
import { AuthSession } from "@/types/auth";
import CardHeaderTemplate from "./card-header-template";

export default async function PersonalInformationCard() {
  const session: AuthSession = await getCurrentSession();
  return (
    <Card className="w-full">
      <CardHeader>
        <CardHeaderTemplate
          h2="Personal Information"
          description="Manage your name and email"
          icon={User}
        />
      </CardHeader>
      <CardContent>
        <PersonalInformationForm session={session} />
      </CardContent>
    </Card>
  );
}
