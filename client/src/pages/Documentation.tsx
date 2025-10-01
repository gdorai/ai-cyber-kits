import { Shield, AlertTriangle, Sparkles, Eye, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Documentation() {
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home" asChild>
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Documentation</h1>
          <p className="text-muted-foreground text-lg">
            Learn how to use each tool effectively to protect your digital safety
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                Breach Lookup
              </CardTitle>
              <CardDescription>
                Check if your email address or domain has been compromised in a data breach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">How to Use</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Enter your email address or domain name</li>
                  <li>Click "Check for Breaches"</li>
                  <li>Review the results showing any breaches found</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Understanding Results</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Safe:</strong> No breaches found for this email/domain</li>
                  <li><strong>Breached:</strong> Shows breach name, date, compromised data types, and affected account count</li>
                  <li><strong>What to do:</strong> Change passwords immediately for affected accounts and enable two-factor authentication</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Data Source</h4>
                <p className="text-sm text-muted-foreground">
                  Powered by <a href="https://haveibeenpwned.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline" data-testid="link-hibp">HaveIBeenPwned</a>, 
                  a trusted database of billions of breached accounts.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-primary" />
                Phishing Analyzer
              </CardTitle>
              <CardDescription>
                Detect phishing attempts and suspicious emails using AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">How to Use</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Copy the suspicious email content (including sender, subject, and body)</li>
                  <li>Paste it into the text area</li>
                  <li>Click "Analyze for Phishing"</li>
                  <li>Review the detailed analysis and risk indicators</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Understanding Results</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Risk Level:</strong> Safe, Suspicious, or Dangerous</li>
                  <li><strong>Red Flags:</strong> Specific phishing indicators detected (urgency tactics, suspicious links, etc.)</li>
                  <li><strong>Recommendations:</strong> Clear actions you should take</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Technology</h4>
                <p className="text-sm text-muted-foreground">
                  Uses OpenAI's GPT-4o-mini model to analyze email patterns, language tactics, and common phishing techniques.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-primary" />
                AI Text Detector
              </CardTitle>
              <CardDescription>
                Identify whether text was likely generated by AI or written by a human
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">How to Use</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Paste the text you want to analyze</li>
                  <li>Click "Detect AI Content"</li>
                  <li>Review the confidence score and analysis</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Understanding Results</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Confidence Score:</strong> Percentage likelihood that text is AI-generated</li>
                  <li><strong>Indicators:</strong> Specific patterns that suggest AI authorship (repetition, formality, structure)</li>
                  <li><strong>Important:</strong> No detector is 100% accurate - use results as one data point, not definitive proof</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Technology</h4>
                <p className="text-sm text-muted-foreground">
                  Analyzes linguistic patterns, stylistic markers, and structural characteristics using AI-powered analysis.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-primary" />
                Bias Spotlight
              </CardTitle>
              <CardDescription>
                Identify potential bias in written content across multiple dimensions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-semibold text-sm mb-1">How to Use</h4>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Paste the text you want to analyze for bias</li>
                  <li>Click "Analyze for Bias"</li>
                  <li>Review detected bias types and specific examples</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Understanding Results</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong>Bias Types:</strong> Gender, racial, political, ageism, and other forms of bias</li>
                  <li><strong>Severity:</strong> Low, Medium, or High impact</li>
                  <li><strong>Examples:</strong> Specific phrases or language that contain bias</li>
                  <li><strong>Suggestions:</strong> Alternative phrasing for more neutral language</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">Technology</h4>
                <p className="text-sm text-muted-foreground">
                  Uses advanced language analysis to detect biased language patterns across multiple categories.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Privacy Note</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                All tools process your input ephemerally - nothing is stored or logged. Your data is only used 
                during the active analysis session and immediately discarded afterward.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
