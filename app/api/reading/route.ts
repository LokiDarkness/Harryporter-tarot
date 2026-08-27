import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
      return NextResponse.json(
        { error: "Thiếu GEMINI_API_KEY" },
        { status: 500 }
      );
    }

    const body = await req.json();

    if (!body.prompt || typeof body.prompt !== "string") {
      return NextResponse.json(
        { error: "Câu hỏi không hợp lệ." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": key,
        },

        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: body.prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("Gemini status:", response.status);
    console.log(
      "Gemini FULL response:",
      JSON.stringify(data, null, 2)
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data?.error?.message ||
            "Gemini API không thể xử lý yêu cầu.",
        },
        {
          status: response.status,
        }
      );
    }

    const text =
      data?.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim();

    if (!text) {
      return NextResponse.json(
        {
          error: "Gemini không trả về nội dung.",
        },
        {
          status: 502,
        }
      );
    }

    return NextResponse.json({
      text,
    });

  } catch (error) {

    console.error("SERVER ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Lỗi máy chủ",
      },
      {
        status: 500,
      }
    );
  }
}
