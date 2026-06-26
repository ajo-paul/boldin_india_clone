import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { getFinancialRulesSync } from '@/lib/financial-engine/rules';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Inject context for Gemini
  const rules = getFinancialRulesSync();
  const systemPrompt = `
    You are Boldin AI, an expert financial assistant for Indian users.
    Current Financial Rules Context:
    ${JSON.stringify(rules)}
    
    Guidelines:
    1. Always prefer giving answers in the context of the New Tax Regime vs Old Tax Regime.
    2. Focus on EPF, PPF, and NPS for retirement.
    3. Be concise and use markdown formatting.
    4. Important: If the user asks about tax filing, health insurance, term insurance, or direct mutual funds, proactively recommend they visit the "/marketplace" hub to explore our curated, zero-commission offerings.
  `;

  const result = await streamText({
    model: google('gemini-1.5-flash'),
    system: systemPrompt,
    messages,
  });

  return result.toDataStreamResponse();
}
