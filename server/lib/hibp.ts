// HaveIBeenPwned API integration
const HIBP_API_URL = "https://haveibeenpwned.com/api/v3";

interface HibpBreach {
  Name: string;
  Title: string;
  Domain: string;
  BreachDate: string;
  AddedDate: string;
  ModifiedDate: string;
  PwnCount: number;
  Description: string;
  DataClasses: string[];
  IsVerified: boolean;
  IsFabricated: boolean;
  IsSensitive: boolean;
  IsRetired: boolean;
  IsSpamList: boolean;
  LogoPath: string;
}

export async function checkBreaches(email: string): Promise<{
  breachCount: number;
  riskScore: number;
  breaches: Array<{
    name: string;
    date: string;
    severity: "low" | "medium" | "high";
    description: string;
  }>;
}> {
  try {
    const headers: Record<string, string> = {
      "User-Agent": "AICyberKits-SecurityTools",
    };

    // Add API key if available
    if (process.env.HIBP_API_KEY) {
      headers["hibp-api-key"] = process.env.HIBP_API_KEY;
    }

    const response = await fetch(
      `${HIBP_API_URL}/breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
      { headers }
    );

    if (response.status === 404) {
      // No breaches found
      return {
        breachCount: 0,
        riskScore: 0,
        breaches: [],
      };
    }

    // If API requires authentication (401) or rate limited (429), throw with specific status
    if (response.status === 401) {
      const error: any = new Error("HaveIBeenPwned API key required or invalid.");
      error.statusCode = 401;
      throw error;
    }

    if (response.status === 429) {
      const error: any = new Error("Rate limit exceeded. Please try again later.");
      error.statusCode = 429;
      throw error;
    }

    if (!response.ok) {
      const error: any = new Error(`Unable to check breaches at this time.`);
      error.statusCode = 503;
      throw error;
    }

    const breaches: HibpBreach[] = await response.json();
    
    const processedBreaches = breaches.map((breach) => {
      const severity = calculateSeverity(breach);
      const date = new Date(breach.BreachDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      return {
        name: breach.Title || breach.Name,
        date,
        severity,
        description: cleanDescription(breach.Description),
      };
    });

    const riskScore = calculateRiskScore(breaches);

    return {
      breachCount: breaches.length,
      riskScore,
      breaches: processedBreaches,
    };
  } catch (error: any) {
    if (error.statusCode) {
      throw error;
    }
    const err: any = new Error("Failed to check breaches: " + (error as Error).message);
    err.statusCode = 503;
    throw err;
  }
}

function calculateSeverity(breach: HibpBreach): "low" | "medium" | "high" {
  const sensitiveClasses = ["Passwords", "Credit cards", "Social security numbers", "Bank account numbers"];
  const hasSensitiveData = breach.DataClasses.some((dc) =>
    sensitiveClasses.some((sc) => dc.toLowerCase().includes(sc.toLowerCase()))
  );

  if (hasSensitiveData || breach.IsSensitive) {
    return "high";
  }

  if (breach.PwnCount > 1000000) {
    return "high";
  }

  if (breach.PwnCount > 100000) {
    return "medium";
  }

  return "low";
}

function calculateRiskScore(breaches: HibpBreach[]): number {
  if (breaches.length === 0) return 0;
  
  let baseScore = Math.min(breaches.length * 20, 60);
  
  const hasSensitive = breaches.some((b) => b.IsSensitive);
  if (hasSensitive) {
    baseScore += 20;
  }

  const hasPasswords = breaches.some((b) =>
    b.DataClasses.some((dc) => dc.toLowerCase().includes("password"))
  );
  if (hasPasswords) {
    baseScore += 15;
  }

  const recentBreach = breaches.some((b) => {
    const breachDate = new Date(b.BreachDate);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return breachDate > oneYearAgo;
  });
  if (recentBreach) {
    baseScore += 10;
  }

  return Math.min(baseScore, 100);
}

function cleanDescription(description: string): string {
  return description
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}
