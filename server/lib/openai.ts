import OpenAI from "openai";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
// This is using OpenAI's API, which points to OpenAI's API servers and requires your own API key.
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function detectAIText(text: string): Promise<{
  aiProbability: number;
  confidence: string;
  indicators: Array<{
    name: string;
    score: number;
    explanation: string;
  }>;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are an AI text detection expert. Analyze the provided text and determine if it was likely written by AI. Respond with JSON in this exact format:
{
  "aiProbability": number (0-100),
  "confidence": string ("Low", "Medium", or "High"),
  "indicators": [
    {
      "name": string,
      "score": number (0-100),
      "explanation": string
    }
  ]
}

Analyze for these indicators:
1. Repetitive Phrasing - similar sentence structures
2. Low Lexical Diversity - limited vocabulary variation
3. Formal Consistency - unusually consistent tone

Provide exactly 3 indicators in your response.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      aiProbability: Math.max(0, Math.min(100, Math.round(result.aiProbability || 0))),
      confidence: ["Low", "Medium", "High"].includes(result.confidence) ? result.confidence : "Medium",
      indicators: (result.indicators || []).slice(0, 3).map((ind: any) => ({
        name: ind.name || "Unknown",
        score: Math.max(0, Math.min(100, Math.round(ind.score || 0))),
        explanation: ind.explanation || "",
      })),
    };
  } catch (error) {
    const errorMsg = (error as Error).message;
    if (errorMsg.includes("quota") || errorMsg.includes("429")) {
      const err: any = new Error("AI detection temporarily unavailable due to API quota limits.");
      err.statusCode = 429;
      throw err;
    }
    const err: any = new Error("AI detection service error: " + errorMsg);
    err.statusCode = 503;
    throw err;
  }
}

export async function analyzePhishing(emailText: string): Promise<{
  overallRisk: number;
  urgencyScore: number;
  financialRisk: number;
  linkSafety: number;
  suspiciousPatterns: Array<{
    type: string;
    text: string;
    reason: string;
  }>;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a phishing detection expert. Analyze the email text for phishing indicators. Respond with JSON in this exact format:
{
  "overallRisk": number (0-100),
  "urgencyScore": number (0-100),
  "financialRisk": number (0-100),
  "linkSafety": number (0-100, where 0 is safe and 100 is dangerous),
  "suspiciousPatterns": [
    {
      "type": string ("urgency", "financial", "link", or "other"),
      "text": string (exact phrase from email),
      "reason": string (why it's suspicious)
    }
  ]
}

Look for:
- Urgent language (Act now!, Limited time!)
- Financial requests (verify account, payment info)
- Suspicious links or mismatched domains
- Grammar/spelling errors
- Impersonation attempts`,
        },
        {
          role: "user",
          content: emailText,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      overallRisk: Math.max(0, Math.min(100, Math.round(result.overallRisk || 0))),
      urgencyScore: Math.max(0, Math.min(100, Math.round(result.urgencyScore || 0))),
      financialRisk: Math.max(0, Math.min(100, Math.round(result.financialRisk || 0))),
      linkSafety: Math.max(0, Math.min(100, Math.round(result.linkSafety || 0))),
      suspiciousPatterns: (result.suspiciousPatterns || []).map((pattern: any) => ({
        type: pattern.type || "other",
        text: pattern.text || "",
        reason: pattern.reason || "",
      })),
    };
  } catch (error) {
    const errorMsg = (error as Error).message;
    if (errorMsg.includes("quota") || errorMsg.includes("429")) {
      const err: any = new Error("Phishing analysis temporarily unavailable due to API quota limits.");
      err.statusCode = 429;
      throw err;
    }
    const err: any = new Error("Phishing analysis service error: " + errorMsg);
    err.statusCode = 503;
    throw err;
  }
}

export async function analyzeBias(text: string): Promise<{
  objectivityScore: number;
  emotionalLanguageCount: number;
  biasIndicators: number;
  highlights: Array<{
    text: string;
    type: string;
    explanation: string;
  }>;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5",
      messages: [
        {
          role: "system",
          content: `You are a bias detection expert. Analyze the text for bias, loaded language, and subjectivity. Respond with JSON in this exact format:
{
  "objectivityScore": number (0-100, where 100 is completely objective),
  "emotionalLanguageCount": number,
  "biasIndicators": number,
  "highlights": [
    {
      "text": string (exact phrase from text),
      "type": string ("emotional", "subjective", or "bias"),
      "explanation": string (why it's problematic)
    }
  ]
}

Look for:
- Emotional/loaded language (shocking, unbelievable, terrible, amazing)
- Subjective statements without evidence (obviously, clearly, everyone knows)
- Gender/racial bias indicators
- One-sided framing`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      objectivityScore: Math.max(0, Math.min(100, Math.round(result.objectivityScore || 50))),
      emotionalLanguageCount: Math.max(0, Math.round(result.emotionalLanguageCount || 0)),
      biasIndicators: Math.max(0, Math.round(result.biasIndicators || 0)),
      highlights: (result.highlights || []).map((highlight: any) => ({
        text: highlight.text || "",
        type: highlight.type || "other",
        explanation: highlight.explanation || "",
      })),
    };
  } catch (error) {
    const errorMsg = (error as Error).message;
    if (errorMsg.includes("quota") || errorMsg.includes("429")) {
      const err: any = new Error("Bias analysis temporarily unavailable due to API quota limits.");
      err.statusCode = 429;
      throw err;
    }
    const err: any = new Error("Bias analysis service error: " + errorMsg);
    err.statusCode = 503;
    throw err;
  }
}
