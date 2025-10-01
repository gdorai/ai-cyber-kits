import { useState } from "react";
import { Hero } from "@/components/Hero";
import { ToolCard } from "@/components/ToolCard";
import { BreachLookup } from "@/components/BreachLookup";
import { PhishingAnalyzer } from "@/components/PhishingAnalyzer";
import { AIDetector } from "@/components/AIDetector";
import { BiasSpotlight } from "@/components/BiasSpotlight";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Card } from "@/components/ui/card";
import { Shield, FileSearch, Sparkles, Eye, Lock, Brain, BookOpen } from "lucide-react";

type ActiveTool = "breach" | "phishing" | "ai" | "bias" | null;

export default function Home() {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg">CheckSafe</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <Hero />

      <section id="tools" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          {activeTool === null ? (
            <>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-semibold mb-4">
                  Four Essential Tools
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Quick, free, and powerful security checks at your fingertips
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <ToolCard
                  icon={Shield}
                  title="Breach Lookup"
                  description="Check if your email has been compromised in data breaches"
                  onClick={() => setActiveTool("breach")}
                  testId="button-tool-breach"
                />
                <ToolCard
                  icon={FileSearch}
                  title="Phishing Analyzer"
                  description="Detect suspicious patterns in emails with AI-powered analysis"
                  onClick={() => setActiveTool("phishing")}
                  testId="button-tool-phishing"
                />
                <ToolCard
                  icon={Sparkles}
                  title="AI Text Detector"
                  description="Identify AI-generated content with confidence scores"
                  onClick={() => setActiveTool("ai")}
                  testId="button-tool-ai"
                />
                <ToolCard
                  icon={Eye}
                  title="Bias Spotlight"
                  description="Uncover loaded language and subjectivity in any text"
                  onClick={() => setActiveTool("bias")}
                  testId="button-tool-bias"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-chart-2/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-chart-2" />
                  </div>
                  <h3 className="font-semibold mb-2">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">
                    No data stored, all processing local or ephemeral
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-chart-4/10 flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-chart-4" />
                  </div>
                  <h3 className="font-semibold mb-2">AI-Powered</h3>
                  <p className="text-sm text-muted-foreground">
                    Research-backed detection algorithms
                  </p>
                </Card>
                <Card className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-6 h-6 text-chart-3" />
                  </div>
                  <h3 className="font-semibold mb-2">Educational</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn while you check with detailed explanations
                  </p>
                </Card>
              </div>
            </>
          ) : (
            <div className="max-w-4xl mx-auto">
              <button
                onClick={() => setActiveTool(null)}
                className="mb-6 text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
                data-testid="button-back-to-tools"
              >
                ← Back to all tools
              </button>
              {activeTool === "breach" && <BreachLookup />}
              {activeTool === "phishing" && <PhishingAnalyzer />}
              {activeTool === "ai" && <AIDetector />}
              {activeTool === "bias" && <BiasSpotlight />}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
