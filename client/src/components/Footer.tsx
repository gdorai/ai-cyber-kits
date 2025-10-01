import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="border-t py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-4">AI Cyber Kits</h3>
            <p className="text-sm text-muted-foreground">
              Everyday digital safety tools powered by research-backed AI and
              cybersecurity best practices.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-4">Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                About
              </a>
              <a href="#" className="block text-muted-foreground hover:text-foreground">
                Documentation
              </a>
              <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-medium mb-4">Stay Safe</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Get monthly security tips
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">
                <Mail className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 AI Cyber Kits. Built for everyday digital safety.</p>
        </div>
      </div>
    </footer>
  );
}
