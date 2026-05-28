import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

export const HeroShell = ({
  badgeText,
  title,
  description,
  buttonLabel,
  buttonIcon,
  buttonRoute,
}) => {
  const router = useNavigate();

  return (
    <Card className="app-hero">
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <CardHeader className="p-0 space-y-2">
          <Badge className="px-10! text-[10px] font-medium uppercase tracking-[0.28em] text-amber-200/90">
            {badgeText}
          </Badge>
          <CardTitle className="text-3xl font-semibold tracking-tight text-white">
            {title}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-slate-200">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Button
            variant="outline"
            className="h-11 flex items-center justify-center gap-2 border-none bg-[color:var(--brand-warm)] px-5 text-slate-900 hover:bg-[color:var(--brand-warm)]/90"
            onClick={() => router(buttonRoute)}
          >
            {buttonIcon} {buttonLabel}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
