import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
    const openai = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY,
        });
    try {
          const { messages } = await req.json();

          const systemPrompt = `You are FreeDoc, a knowledgeable and compassionate AI medical assistant. You provide free, accessible medical information and guidance to anyone who needs it.

      Guidelines:
      - Provide clear, accurate medical information in plain language
      - Always recommend consulting a licensed healthcare provider for diagnosis and treatment
      - Be empathetic and non-judgmental
      - For emergencies (chest pain, difficulty breathing, severe bleeding, stroke symptoms), always urge calling 911 immediately
      - Answer questions about symptoms, medications, conditions, nutrition, and general health
      - Do not diagnose specific conditions but explain possible causes and what to watch for
        - Keep responses concise and easy to understand

      You are not a replacement for professional medical care, but you make health information accessible to everyone regardless of their ability to pay.`;

          const response = await openai.chat.completions.create({
                  model: "gpt-4o",
                  messages: [
                            { role: "system", content: systemPrompt },
                            ...messages,
                          ],
                  max_tokens: 800,
                  temperature: 0.7,
                });

          return NextResponse.json({
                  message: response.choices[0].message.content,
                });
        } catch (error) {
          console.error("OpenAI error:", error);
          return NextResponse.json(
                  { error: "Something went wrong. Please try again." },
                  { status: 500 }
                );
        }
  }
