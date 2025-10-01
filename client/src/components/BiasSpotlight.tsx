import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Eye, Flame, Scale } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { BiasResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function BiasSpotlight() {
  const [text, setText] = useState("");
  const { toast } = useToast();

  const analyzeMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await apiRequest<BiasResponse>("/api/analyze-bias", {
        method: "POST",
        body: JSON.stringify({ text }),
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

  const handleAnalyze = () => {
    if (!text.trim()) return;
    analyzeMutation.mutate(text);
  };

  const results = analyzeMutation.data;
  const isLoading = analyzeMutation.isPending;

  const getBiasColor = (type: string) => {
    if (type === "emotional") return "bg-chart-5/20 text-chart-5 border-chart-5/40";
    if (type === "subjective") return "bg-chart-3/20 text-chart-3 border-chart-3/40";
    return "bg-chart-4/20 text-chart-4 border-chart-4/40";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4">
          Bias Spotlight
        </h2>
        <p className="text-muted-foreground">
          Analyze text for loaded language, emotional bias, and subjectivity indicators.
        </p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <label htmlFor="bias-text" className="text-sm font-medium">
            Text to Analyze
          </label>
          <Textarea
            id="bias-text"
            placeholder="Paste news, articles, or any text to check for bias..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            data-testid="input-bias-text"
          />
        </div>
        <Button
          onClick={handleAnalyze}
          disabled={isLoading || !text.trim()}
          className="w-full"
          data-testid="button-analyze-bias"
        >
          {isLoading ? "Analyzing..." : "Analyze Bias"}
        </Button>
      </Card>

      {results && (
        <Card className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Scale className="w-5 h-5 text-chart-2" />
                <span className="text-sm font-medium">Objectivity</span>
              </div>
              <div className="text-2xl font-semibold">{results.objectivityScore}%</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Flame className="w-5 h-5 text-chart-5" />
                <span className="text-sm font-medium">Emotional Words</span>
              </div>
              <div className="text-2xl font-semibold">{results.emotionalLanguageCount}</div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <Eye className="w-5 h-5 text-chart-3" />
                <span className="text-sm font-medium">Bias Indicators</span>
              </div>
              <div className="text-2xl font-semibold">{results.biasIndicators}</div>
            </Card>
          </div>

          {results.highlights.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h3 className="text-xl font-semibold">Detected Issues</h3>
                <div className="flex gap-2 flex-wrap">
                  <Badge className={getBiasColor("emotional")}>Emotional</Badge>
                  <Badge className={getBiasColor("subjective")}>Subjective</Badge>
                </div>
              </div>
              <div className="space-y-3">
                {results.highlights.map((highlight, idx: number) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-start gap-3">
                      <Badge className={getBiasColor(highlight.type)} variant="outline">
                        {highlight.type}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-sm bg-muted px-2 py-1 rounded mb-2 inline-block break-all">
                          "{highlight.text}"
                        </div>
                        <p className="text-sm text-muted-foreground">{highlight.explanation}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
