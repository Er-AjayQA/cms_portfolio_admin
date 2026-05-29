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
import { cn } from "@/lib/utils";

export const HeroShell = ({
  badgeText = null,
  title = null,
  description = null,
  buttonLabel = null,
  buttonIcon = null,
  buttonRoute = null,
  buttonFunction,
  className,
}) => {
  const router = useNavigate();

  return (
    <Card className={cn("app-hero", className)}>
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <CardHeader className="p-0 space-y-2">
          {badgeText && (
            <Badge className="px-10! text-[10px] font-medium uppercase tracking-[0.28em] text-amber-200/90">
              {badgeText}
            </Badge>
          )}

          {CardTitle && (
            <CardTitle className="text-3xl font-semibold tracking-tight text-white">
              {title}
            </CardTitle>
          )}

          {description && (
            <CardDescription className="max-w-2xl text-sm leading-6 text-slate-200">
              {description}
            </CardDescription>
          )}
        </CardHeader>

        {buttonLabel && (
          <CardContent className="p-0">
            <Button
              variant="outline"
              className="h-11 flex items-center justify-center gap-2 border-none bg-[color:var(--brand-warm)] px-5 text-slate-900 hover:bg-[color:var(--brand-warm)]/90"
              onClick={buttonRoute ? () => router(buttonRoute) : buttonFunction}
            >
              {buttonIcon ? buttonIcon : ""} {buttonLabel}
            </Button>
          </CardContent>
        )}
      </div>
    </Card>
  );
};
