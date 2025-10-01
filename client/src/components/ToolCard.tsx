import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  testId: string;
}

export function ToolCard({
  icon: Icon,
  title,
  description,
  onClick,
  testId,
}: ToolCardProps) {
  return (
    <Card className="p-6 space-y-4 hover-elevate transition-all">
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="text-xl md:text-2xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <Button onClick={onClick} className="w-full" data-testid={testId}>
        Try Tool
      </Button>
    </Card>
  );
}
