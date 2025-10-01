import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RiskMeter } from "./RiskMeter";
import { AlertTriangle, DollarSign, Link as LinkIcon, Clock } from "lucide-react";

export function PhishingAnalyzer() {
  const [emailText, setEmailText] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = () => {
    if (!emailText.trim()) return;
    
    setIsLoading(true);
    // Simulate analysis
    setTimeout(() => {
      // todo: remove mock functionality
      setResults({
        overallRisk: 75,
        urgencyScore: 85,
        financialRisk: 70,
        linkSafety: 60,
        suspiciousPatterns: [
          {
            type: "urgency",
            text: "Act now!",
            reason: "Creates false sense of urgency",
          },
          {
            type: "financial",
            text: "verify your account",
            reason: "Common phishing tactic requesting sensitive information",
          },
          {
            type: "link",
            text: "http://suspicious-link.com",
            reason: "Domain doesn't match claimed sender",
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
          Phishing Email Analyzer
        </h2>
        <p className="text-muted-foreground">
          Paste a suspicious email to detect phishing patterns and assess risk.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="email-text" className="text-sm font-medium">
            Email Content
          </label>
          <Textarea
            id="email-text"
            placeholder="Paste the suspicious email text here..."
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            rows={8}
            data-testid="input-email-text"
          />
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isLoading || !emailText.trim()}
          className="w-full"
          data-testid="button-analyze-phishing"
        >
          {isLoading ? "Analyzing..." : "Analyze Email"}
        </Button>
      </Card>

      {results && (
        <Card className="p-6 space-y-6">
          <RiskMeter
            score={results.overallRisk}
            label="Phishing Risk Score"
            className="mb-6"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-5 h-5 text-chart-3" />
                <span className="text-sm font-medium">Urgency Score</span>
              </div>
              <div className="text-2xl font-semibold">{results.urgencyScore}%</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <DollarSign className="w-5 h-5 text-chart-3" />
                <span className="text-sm font-medium">Financial Risk</span>
              </div>
              <div className="text-2xl font-semibold">{results.financialRisk}%</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <LinkIcon className="w-5 h-5 text-chart-3" />
                <span className="text-sm font-medium">Link Safety</span>
              </div>
              <div className="text-2xl font-semibold">{results.linkSafety}%</div>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Suspicious Patterns Detected</h3>
            <div className="space-y-3">
              {results.suspiciousPatterns.map((pattern: any, idx: number) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-sm bg-muted px-2 py-1 rounded mb-2 inline-block">
                        "{pattern.text}"
                      </div>
                      <p className="text-sm text-muted-foreground">{pattern.reason}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
