import { NextResponse } from "next/server";
import RunwayML, { TaskFailedError } from "@runwayml/sdk";

export async function POST() {
  try {
    const apiKey = process.env.RUNWAYML_API_SECRET;

    if (!apiKey) {
      return NextResponse.json(
        { error: "RUNWAYML_API_SECRET fehlt." },
        { status: 500 }
      );
    }

    const client = new RunwayML({
      apiKey,
    });

    const task = await client.imageToVideo
      .create({
        model: "gen4.5",
        promptText:
          "A cinematic western music video, dramatic desert landscape, lone cowboy, dynamic camera movement, cinematic lighting, realistic film look",
        ratio: "1280:720",
        duration: 5,
      })
      .waitForTaskOutput();

    return NextResponse.json({
      success: true,
      taskId: task.id,
      videoUrl: task.output?.[0] ?? null,
      message: "Video erfolgreich erstellt.",
    });
  } catch (error) {
    if (error instanceof TaskFailedError) {
      return NextResponse.json(
        {
          error: "Runway Video-Generierung fehlgeschlagen.",
          details: error.taskDetails,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unbekannter Fehler",
      },
      { status: 500 }
    );
  }
}
