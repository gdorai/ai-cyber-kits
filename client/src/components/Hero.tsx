import heroImage from "@assets/generated_images/Security_hub_hero_image_f82a9740.png";
import { Button } from "@/components/ui/button";
import { Shield, Lock, CheckCircle } from "lucide-react";

export function Hero() {
  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[50vh] flex items-center py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-5 gap-8 items-center">
          <div className="md:col-span-3 space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Everyday Digital
              <br />
              <span className="text-primary">Safety Checkpoint</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Free, browser-based tools that blend cybersecurity hygiene with AI
              explainability. Protect yourself with instant breach checks,
              phishing detection, AI text analysis, and bias spotting.
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <Button
                size="lg"
                onClick={scrollToTools}
                data-testid="button-try-tools"
              >
                Try Tools Below
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-chart-2" />
                <span>100% Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-chart-2" />
                <span>No Data Stored</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-chart-2" />
                <span>Open Source</span>
              </div>
            </div>
          </div>
          <div className="md:col-span-2">
            <img
              src={heroImage}
              alt="Security visualization"
              className="w-full h-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
