import { Github } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { AboutModal } from "./AboutModal";

export function Footer() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <footer className="border-t py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
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
                <button
                  onClick={() => setAboutOpen(true)}
                  className="block text-muted-foreground hover:text-foreground text-left"
                  data-testid="button-about"
                >
                  About
                </button>
                <Link 
                  href="/docs" 
                  className="block text-muted-foreground hover:text-foreground"
                  data-testid="link-docs"
                >
                  Documentation
                </Link>
                <a
                  href="https://github.com/gdorai/ai-cyber-kits"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  data-testid="link-github"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 AI Cyber Kits. Built for everyday digital safety.</p>
          </div>
        </div>
      </footer>
      
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
    </>
  );
}
