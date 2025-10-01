import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiskMeter } from "./RiskMeter";
import { Shield, AlertTriangle, Key, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BreachLookup() {
  const [email, setEmail] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = () => {
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // todo: remove mock functionality
      setResults({
        breachCount: 2,
        riskScore: 65,
        breaches: [
          {
            name: "Adobe",
            date: "October 2013",
            severity: "high",
            description: "Email addresses and passwords compromised",
          },
          {
            name: "LinkedIn",
            date: "June 2012",
            severity: "medium",
            description: "Email addresses and hashed passwords exposed",
          },
        ],
      });
      setIsLoading(false);
    }, 1500);
  };

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
            data-testid="input-email"
          />
        </div>
        <Button
          onClick={handleCheck}
          disabled={isLoading || !email}
          className="w-full"
          data-testid="button-check-breach"
        >
          {isLoading ? "Checking..." : "Check for Breaches"}
        </Button>
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
              {results.breachCount} Breach{results.breachCount !== 1 ? "es" : ""} Found
            </h3>
            <div className="space-y-4">
              {results.breaches.map((breach: any, idx: number) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
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
          </div>

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
        </Card>
      )}
    </div>
  );
}
