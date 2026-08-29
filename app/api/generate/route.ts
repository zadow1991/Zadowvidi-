import { NextResponse } from "next/server";

export async function POST() {
  try {
    const apiKey = process.env.RUNWAYML_API_SECRET;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RUNWAYML_API_SECRET fehlt." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.dev.runwayml.com/v1/image_to_video",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "X-Runway-Version": "2024-11-06",
        },
        body: JSON.stringify({
          model: "gen4.5",
          promptText:
            "A cinematic music video, dynamic camera movement, dramatic lighting, professional music video aesthetic",
          ratio: "1280:720",
          duration: 5,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || "Runway API Fehler", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      taskId: data.id,
      message: "Video-Generierung gestartet.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unbekannter Serverfehler",
      },
      { status: 500 }
    );
  }
}
