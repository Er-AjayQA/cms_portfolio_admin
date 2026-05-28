import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const HeroShell = ({ title, description, buttonLabel, buttonRoute }) => {
  const router = useNavigate();

  return (
    <Card className="border-slate-200 bg-[linear-gradient(135deg,#182235_0%,#2b3b55_100%)] text-white shadow-[0_20px_60px_-42px_rgba(15,23,42,0.75)]">
      <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between">
        <CardHeader className="space-y-2 p-0">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/90">
            Project Management
          </p>
          <CardTitle className="text-3xl font-semibold tracking-tight text-white">
            {title}
          </CardTitle>
          <CardDescription className="max-w-2xl text-sm leading-6 text-slate-200">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Button
            className="h-11 rounded-xl bg-amber-300 px-5 text-slate-900 hover:bg-amber-200"
            onClick={() => router(buttonRoute)}
          >
            {buttonLabel}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
