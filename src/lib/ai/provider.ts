import { IAIProvider } from "./types";
import { DemoAIProvider } from "./demo-provider";
import { GeminiAIProvider } from "./gemini-provider";

let aiProviderInstance: IAIProvider | null = null;

export function getAIProvider(): IAIProvider {
  if (!aiProviderInstance) {
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0);
    const providerType = process.env.AI_PROVIDER?.toLowerCase();

    if (hasGeminiKey || providerType === "gemini" || providerType === "production") {
      aiProviderInstance = new GeminiAIProvider();
    } else {
      aiProviderInstance = new DemoAIProvider();
    }
  }
  return aiProviderInstance;
}
