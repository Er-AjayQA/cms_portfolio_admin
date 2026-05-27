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
    <Card className="flex flex-row items-center justify-between">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Button variant="outline" onClick={() => router(buttonRoute)}>
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  );
};
