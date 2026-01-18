import { LucideIcon } from "lucide-react";

type Props = {
  h2: string;
  description: string;
  icon: LucideIcon;
};

export default function CardHeaderTemplate({ h2, description, icon }: Props) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <div className="bg-primary/10 flex size-10 items-center justify-center rounded-xl">
        <Icon className="text-primary size-5" />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-base font-semibold">{h2}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
