import { z } from "zod";

export const breachCheckSchema = z.object({
  email: z.string().email(),
});

export const breachResponseSchema = z.object({
  breachCount: z.number(),
  riskScore: z.number(),
  breaches: z.array(z.object({
    name: z.string(),
    date: z.string(),
    severity: z.enum(["low", "medium", "high"]),
    description: z.string(),
  })),
});

export const phishingAnalysisSchema = z.object({
  emailText: z.string().min(1),
});

export const phishingResponseSchema = z.object({
  overallRisk: z.number(),
  urgencyScore: z.number(),
  financialRisk: z.number(),
  linkSafety: z.number(),
  suspiciousPatterns: z.array(z.object({
    type: z.string(),
    text: z.string(),
    reason: z.string(),
  })),
});

export const aiDetectionSchema = z.object({
  text: z.string().min(1),
});

export const aiDetectionResponseSchema = z.object({
  aiProbability: z.number(),
  confidence: z.string(),
  indicators: z.array(z.object({
    name: z.string(),
    score: z.number(),
    explanation: z.string(),
  })),
});

export const biasAnalysisSchema = z.object({
  text: z.string().min(1),
});

export const biasResponseSchema = z.object({
  objectivityScore: z.number(),
  emotionalLanguageCount: z.number(),
  biasIndicators: z.number(),
  highlights: z.array(z.object({
    text: z.string(),
    type: z.string(),
    explanation: z.string(),
  })),
});

export type BreachCheck = z.infer<typeof breachCheckSchema>;
export type BreachResponse = z.infer<typeof breachResponseSchema>;
export type PhishingAnalysis = z.infer<typeof phishingAnalysisSchema>;
export type PhishingResponse = z.infer<typeof phishingResponseSchema>;
export type AIDetection = z.infer<typeof aiDetectionSchema>;
export type AIDetectionResponse = z.infer<typeof aiDetectionResponseSchema>;
export type BiasAnalysis = z.infer<typeof biasAnalysisSchema>;
export type BiasResponse = z.infer<typeof biasResponseSchema>;
