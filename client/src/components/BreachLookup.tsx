import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiskMeter } from "./RiskMeter";
import { Shield, AlertTriangle, Key, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import type { BreachResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function BreachLookup() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const checkBreachMutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest<BreachResponse>("/api/check-breach", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });
      return response;
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleCheck = () => {
    if (!email) return;
    checkBreachMutation.mutate(email);
  };

  const handleReset = () => {
    setEmail("");
    checkBreachMutation.reset();
  };

  const results = checkBreachMutation.data;
  const isLoading = checkBreachMutation.isPending;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Email/Domain Breach Lookup
        </h2>
        <p className="text-muted-foreground">
          Check if your email or domain has been compromised in a data breach.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-input" className="text-sm font-medium">
            Email Address or Domain
          </label>
          <Input
            id="email-input"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            data-testid="input-email"
          />
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCheck}
            disabled={isLoading || !email}
            className="flex-1"
            data-testid="button-check-breach"
          >
            {isLoading ? "Checking..." : "Check for Breaches"}
          </Button>
          {(email || results) && (
            <Button
              onClick={handleReset}
              variant="outline"
              disabled={isLoading}
              data-testid="button-reset-breach"
            >
              Reset
            </Button>
          )}
        </div>
      </Card>

      {results && (
        <Card className="p-6 space-y-6">
          <RiskMeter
            score={results.riskScore}
            label="Overall Risk Score"
            className="mb-6"
          />

          <div>
            <h3 className="text-xl font-semibold mb-4">
              {results.breachCount === 0 ? (
                <span className="flex items-center gap-2 text-chart-2">
                  <Shield className="w-5 h-5" />
                  No breaches found - You're safe!
                </span>
              ) : (
                `${results.breachCount} Breach${results.breachCount !== 1 ? "es" : ""} Found`
              )}
            </h3>
            {results.breaches.length > 0 && (
              <div className="space-y-4">
                {results.breaches.map((breach, idx: number) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-5 h-5 text-destructive" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-semibold">{breach.name}</h4>
                          <Badge variant={breach.severity === "high" ? "destructive" : "secondary"}>
                            {breach.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {breach.date}
                        </p>
                        <p className="text-sm">{breach.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {results.breachCount > 0 && (
            <Card className="p-4 bg-chart-4/10 border-chart-4/20">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-chart-4 flex-shrink-0 mt-0.5" />
                <div className="space-y-2">
                  <h4 className="font-medium">Recommended Actions</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Key className="w-3 h-3" />
                      Change your password immediately
                    </li>
                    <li className="flex items-center gap-2">
                      <Shield className="w-3 h-3" />
                      Enable two-factor authentication
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          )}
        </Card>
      )}
    </div>
  );
}
