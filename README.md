# Everyday Digital Safety & AI Checkpoint

A free, privacy-first web application providing essential cybersecurity and AI analysis tools for everyday users. AICyberKits helps you stay safe online with four powerful security tools that explain results in plain English.

## Core Features

### 1. **Email/Domain Breach Lookup**
Check if your email has been exposed in data breaches using the HaveIBeenPwned API.
- View breach count and risk score
- See detailed breach information
- Get recommended security actions

### 2. **Phishing Email Analyzer**
Detect phishing attempts by analyzing suspicious emails.
- Overall phishing risk assessment
- Urgency, financial risk, and link safety scores
- Specific suspicious pattern identification
- Clear explanations of red flags

### 3. **AI Text Detector**
Identify AI-generated content with confidence scoring.
- AI probability percentage
- Multiple detection indicators
- Detailed explanations for each indicator

### 4. **Bias Spotlight**
Analyze text for bias, emotional language, and subjectivity.
- Objectivity score
- Emotional language detection
- Bias indicator counting
- Highlighted problematic phrases with explanations

## Privacy First

- **No data storage** - All analysis is ephemeral
- **No user tracking** - Your data is never logged
- **Browser-based processing** - Minimal server interaction
- **Open source** - Audit the code yourself

## Getting Started

### Prerequisites
- Node.js 20+ installed
- HaveIBeenPwned API key (get one at https://haveibeenpwned.com/API/Key)
- OpenAI API key (get one at https://platform.openai.com/api-keys)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aicyberkits.git
cd aicyberkits
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```
HIBP_API_KEY=your_hibp_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

> **Note:** The app uses OpenAI's `gpt-4o-mini` model by default. To use a different model, edit `server/lib/openai.ts` and change the `model` parameter.

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to the URL shown in the terminal (typically `http://localhost:5000`)

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **TanStack Query** for state management
- **Wouter** for routing

### Backend
- **Express.js** with TypeScript
- **In-memory storage** (stateless, privacy-first)
- **Zod** for validation
- **OpenAI API** for AI-powered analysis
- **HaveIBeenPwned API** for breach data

## Project Structure

```
checksafe/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Page components
│   │   └── lib/         # Utilities
├── server/              # Express backend
│   ├── lib/             # API integrations
│   ├── routes.ts        # API endpoints
│   └── index.ts         # Server entry
├── shared/              # Shared types/schemas
└── design_guidelines.md # UI/UX design system
```

## API Endpoints

### POST `/api/check-breach`
Check if an email appears in data breaches.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (example):**
```json
{
  "breachCount": 3,
  "riskScore": 65,
  "breaches": [
    {
      "name": "Adobe",
      "date": "October 2013",
      "severity": "high",
      "description": "..."
    }
  ]
}
```

### POST `/api/analyze-phishing`
Analyze email text for phishing indicators.

**Request:**
```json
{
  "emailText": "URGENT: Verify your account..."
}
```

**Response (example):**
```json
{
  "overallRisk": 85,
  "urgencyScore": 95,
  "financialRisk": 70,
  "linkSafety": 80,
  "suspiciousPatterns": [...]
}
```

### POST `/api/detect-ai`
Detect if text is AI-generated.

**Request:**
```json
{
  "text": "In today's digital landscape..."
}
```

**Response (example):**
```json
{
  "aiProbability": 72,
  "confidence": "Medium",
  "indicators": [...]
}
```

### POST `/api/analyze-bias`
Analyze text for bias and emotional language.

**Request:**
```json
{
  "text": "This revolutionary product..."
}
```

**Response (example):**
```json
{
  "objectivityScore": 25,
  "emotionalLanguageCount": 5,
  "biasIndicators": 3,
  "highlights": [...]
}
```
- Light/Dark mode support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Disclaimer

This is provided for educational and informational purposes. While we strive for accuracy:
- Breach data comes from third-party sources (HaveIBeenPwned)
- AI detection is probabilistic, not definitive
- Always verify critical security decisions with multiple sources
- OpenAI API calls may be slow for longer text inputs (20-30 seconds typical); consider using shorter excerpts

