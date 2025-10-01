import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto" data-testid="modal-about">
        <DialogHeader>
          <DialogTitle>About AI Cyber Kits</DialogTitle>
          <DialogDescription>
            Making everyday digital safety simple, accessible, and trustworthy
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-semibold text-base mb-2">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              At AI Cyber Kits, our mission is to make everyday digital safety simple, accessible, and trustworthy. 
              We provide free, browser-based tools that help you:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
              <li>Check if your email or domain has been breached</li>
              <li>Detect phishing emails and scams</li>
              <li>Identify AI-generated text</li>
              <li>Spotlight bias in written content</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              All our tools are designed with explainable AI and user-friendly visualizations, so you understand 
              why a message or email is flagged and how to take action.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Tech Stack</h3>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Our platform leverages modern, lightweight technologies for fast, secure, and reliable checks:
            </p>
            
            <div className="space-y-3">
              <div>
                <h4 className="font-medium text-sm mb-1">Frontend</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  React 18 with TypeScript, Vite build tool, Tailwind CSS, shadcn/ui component library (Radix UI primitives), 
                  Wouter for routing, TanStack Query for state management
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">Backend</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Express.js with TypeScript running on Node.js, RESTful API design with Zod validation
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">AI & Analysis</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  OpenAI GPT-4o-mini model powers our phishing analysis, AI text detection, and bias spotlight features. 
                  All responses use structured JSON output for consistent, explainable results.
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-1">External APIs</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  HaveIBeenPwned API for breach database lookups, providing comprehensive data on email and domain breaches
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Privacy & Security</h3>
            <p className="text-muted-foreground leading-relaxed mb-2">
              Your privacy is our top priority.
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>We do not store your emails, text submissions, or any analyzed content</li>
              <li>All processing is ephemeral - data exists only during your active session</li>
              <li>Analysis happens through secure API calls to trusted services (OpenAI, HaveIBeenPwned)</li>
              <li>No cookies, no tracking, no data persistence</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-2">
              Our goal is to help you stay safe online without compromising your personal information.
            </p>
          </section>

          <section>
            <h3 className="font-semibold text-base mb-2">Open Source</h3>
            <p className="text-muted-foreground leading-relaxed">
              AI Cyber Kits is open source and available on GitHub. We believe in transparency and community-driven 
              development. Contributions, feedback, and suggestions are welcome!
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
