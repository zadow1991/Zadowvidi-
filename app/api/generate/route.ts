import { NextResponse } from "next/server";

export async function POST() {
  try {
    const apiKey = process.env.RUNWAYML_API_SECRET;
    const imageUrl = process.env.RUNWAY_TEST_IMAGE_URL;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RUNWAYML_API_SECRET fehlt." },
        { status: 500 }
      );
    }

    if (!imageUrl) {
      return NextResponse.json(
        { error: "RUNWAY_TEST_IMAGE_URL fehlt." },
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
          promptImage: imageUrl,
          promptText:
            "A cinematic western music video, dramatic desert landscape, lone cowboy riding through the sunset, dynamic camera movement, cinematic lighting, realistic film look",
          ratio: "1280:720",
          duration: 5,
        }),
      }
    );

    const responseText = await response.text();

    let data: unknown;

    try {
      data = JSON.parse(responseText);
    } catch {
      data = { raw: responseText };
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          error: `Runway API Fehler (${response.status})`,
          details: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      taskId:
        typeof data === "object" &&
        data !== null &&
        "id" in data
          ? (data as { id: string }).id
          : null,
      message: "Video-Generierung gestartet.",
      details: data,
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
