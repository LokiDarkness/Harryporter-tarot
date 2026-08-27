import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const LIMIT = 12_000;

export async function POST(req: NextRequest) {
  try {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      return NextResponse.json(
        {
          error: "Thiếu GEMINI_API_KEY"
        },
        {
          status: 503
        }
      );
    }

    const body = await req.json() as {
      prompt?: string;
    };

    if (!body.prompt || body.prompt.length > 800) {
      return NextResponse.json(
        {
          error: "Lời thỉnh cầu chưa hợp lệ."
        },
        {
          status: 400
        }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: body.prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log("Gemini status:", response.status);
    console.log("Gemini response:", JSON.stringify(data));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Gemini API lỗi",
          details: data
        },
        {
          status: response.status
        }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((p: { text?: string }) => p.text || "")
        .join("")
        .trim();

    if (!text) {
      return NextResponse.json(
        {
          error: "Gemini không trả về nội dung.",
          details: data
        },
        {
          status: 502
        }
      );
    }

    return NextResponse.json({
      text
    });

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        error: "Màn sương đang quá dày.",
        details: error instanceof Error ? error.message : String(error)
      },
      {
        status: 502
      }
    );
  }
}
