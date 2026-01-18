import { LucideIcon } from "lucide-react";

type Props = {
  h2: string;
  description: string;
  icon: LucideIcon;
  background?: string;
  iconColor?: string;
};

export default function CardHeaderTemplate({
  h2,
  description,
  icon,
  background = "bg-primary/10",
  iconColor = "text-primary",
}: Props) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${background} flex size-10 items-center justify-center rounded-xl`}
      >
        <Icon className={`size-5 ${iconColor}`} />
      </div>
      <div className="flex flex-col justify-center">
        <h2 className="text-base font-semibold">{h2}</h2>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}
