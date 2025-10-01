import type { Express } from "express";
import { createServer, type Server } from "http";
import { checkBreaches } from "./lib/hibp";
import { detectAIText, analyzePhishing, analyzeBias } from "./lib/openai";
import {
  breachCheckSchema,
  phishingAnalysisSchema,
  aiDetectionSchema,
  biasAnalysisSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/check-breach", async (req, res) => {
    try {
      const { email } = breachCheckSchema.parse(req.body);
      const result = await checkBreaches(email);
      res.json(result);
    } catch (error: any) {
      console.error("Breach check error:", error);
      // Handle Zod validation errors
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Invalid email format" });
      }
      // Use statusCode from error if available, otherwise default to 400
      const statusCode = error.statusCode || 503;
      res.status(statusCode).json({ error: error.message });
    }
  });

  app.post("/api/analyze-phishing", async (req, res) => {
    try {
      const { emailText } = phishingAnalysisSchema.parse(req.body);
      const result = await analyzePhishing(emailText);
      res.json(result);
    } catch (error: any) {
      console.error("Phishing analysis error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Email text is required" });
      }
      const statusCode = error.statusCode || 503;
      res.status(statusCode).json({ error: error.message });
    }
  });

  app.post("/api/detect-ai", async (req, res) => {
    try {
      const { text } = aiDetectionSchema.parse(req.body);
      const result = await detectAIText(text);
      res.json(result);
    } catch (error: any) {
      console.error("AI detection error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Text is required" });
      }
      const statusCode = error.statusCode || 503;
      res.status(statusCode).json({ error: error.message });
    }
  });

  app.post("/api/analyze-bias", async (req, res) => {
    try {
      const { text } = biasAnalysisSchema.parse(req.body);
      const result = await analyzeBias(text);
      res.json(result);
    } catch (error: any) {
      console.error("Bias analysis error:", error);
      if (error.name === "ZodError") {
        return res.status(400).json({ error: "Text is required" });
      }
      const statusCode = error.statusCode || 503;
      res.status(statusCode).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
