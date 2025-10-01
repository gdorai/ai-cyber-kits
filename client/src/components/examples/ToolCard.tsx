import { ToolCard } from "../ToolCard";
import { Shield } from "lucide-react";

export default function ToolCardExample() {
  return (
    <div className="p-8 max-w-sm">
      <ToolCard
        icon={Shield}
        title="Email Breach Lookup"
        description="Check if your email has been compromised in a data breach"
        onClick={() => console.log("Tool clicked")}
        testId="button-tool-example"
      />
    </div>
  );
}
