import PasswordCard from "./_components/password-card";
import PersonalInformationCard from "./_components/personal-information-card";

export default function AccountSettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-center">
        <h1 className="text-foreground text-3xl font-bold">Settings</h1>
      </div>
      <PersonalInformationCard />
      <PasswordCard />
    </div>
  );
}
