import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// Note: It automatically picks up GEMINI_API_KEY from the environment
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { businessName, postType, topic, tone, keywords } = body;

    if (!businessName || !postType || !topic || !tone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct the prompt for the AI
    const prompt = `
You are an expert Local SEO manager and social media copywriter. Write a highly engaging Google Business Profile post for a business named "${businessName}".

Post Type: ${postType} (e.g., general update, special offer, event announcement, or product highlight)
Topic/Description: ${topic}
Tone of Voice: ${tone}
Target Keywords: ${keywords || "None provided"}

Requirements:
1. Write a compelling headline (using emojis if appropriate for the tone).
2. Write a clear, engaging body paragraph that expands on the topic.
3. Include a strong Call to Action (CTA) at the end.
4. Naturally integrate the target keywords if provided.
5. Add relevant hashtags at the bottom, including a hashtag for the business name.
6. Format the output cleanly with appropriate spacing. DO NOT wrap the output in markdown code blocks like \`\`\`markdown.

Generate only the post content itself, without any introductory or concluding conversational filler.
    `.trim();

    // Call Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const content = response.text;

    if (!content) {
      throw new Error("Failed to generate content");
    }

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Error generating post:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
