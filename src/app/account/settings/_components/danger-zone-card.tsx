import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CardHeaderTemplate from "./card-header-template";
import { TriangleAlertIcon } from "lucide-react";
import DeleteAccountSection from "./delete-account-section";

export default function DangerZoneCard() {
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardHeaderTemplate
            h2="Danger Zone"
            description="After deleting your account all data will be permanently deleted. This operation can't be undone."
            icon={TriangleAlertIcon}
            background="bg-destructive/10"
            iconColor="text-destructive"
          />
        </CardHeader>
        <CardContent>
          <DeleteAccountSection />
        </CardContent>
      </Card>
    </>
  );
}
