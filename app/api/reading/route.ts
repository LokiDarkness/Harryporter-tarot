import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const REQUEST_TIMEOUT_MS = 12_000;
const DEFAULT_GEMINI_MODEL = "gemini-2.0-flash";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>;
    };
  }>;
};

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Quả cầu đang bị màn sương che phủ. Xin hãy thử lại sau." },
      { status: 503 },
    );
  }

  let prompt: string | undefined;

  try {
    const payload = (await request.json()) as { prompt?: unknown };
    prompt = typeof payload.prompt === "string" ? payload.prompt.trim() : undefined;
  } catch {
    return NextResponse.json({ error: "Lời thỉnh cầu chưa hợp lệ." }, { status: 400 });
  }

  if (!prompt || prompt.length > 8_000) {
    return NextResponse.json({ error: "Lời thỉnh cầu chưa hợp lệ." }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const model = process.env.GEMINI_MODEL ?? DEFAULT_GEMINI_MODEL;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, maxOutputTokens: 1_000 },
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new Error("Gemini request failed");
    }

    const data = (await response.json()) as GeminiResponse;
    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim();

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    return NextResponse.json({ text });
  } catch {
    return NextResponse.json(
      { error: "Màn sương đang quá dày. Xin hãy thử lại sau ít phút." },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}
