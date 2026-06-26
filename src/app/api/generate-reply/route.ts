import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const ai = new GoogleGenAI({});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { reviewContent, rating, authorName, sentiment } = body;

    if (!reviewContent || !rating || !authorName || !sentiment) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Construct the prompt for the AI
    const prompt = `
You are the owner or customer service manager of a local business. A customer named "${authorName}" has left a ${rating}-star review for your business.

Review content:
"${reviewContent}"

Review Sentiment: ${sentiment}

Task: Write a professional, empathetic, and personalized reply to this review.

Guidelines:
1. Address the customer by name.
2. If the review is positive (4-5 stars), express genuine gratitude, highlight something specific they mentioned, and invite them back.
3. If the review is neutral or negative (1-3 stars), apologize for their experience falling short, address their specific concerns empathetically, and provide a polite offer to make things right (e.g., asking them to contact support).
4. Keep the tone professional but warm and human.
5. Do NOT include placeholders like [Your Name] or [Business Name]. Write the response so it's ready to post as-is.
6. Generate ONLY the response text, without any introductory or concluding conversational filler.
    `.trim();

    // Call Gemini 2.5 Flash
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const reply = response.text;

    if (!reply) {
      throw new Error("Failed to generate reply");
    }

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Error generating reply:", error);
    return NextResponse.json(
      { error: "Failed to generate reply" },
      { status: 500 }
    );
  }
}
