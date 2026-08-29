"use client";

import { useState } from "react";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");

  async function createVideo() {
    if (!audioFile) {
      setStatus("Bitte zuerst eine Audiodatei auswählen.");
      return;
    }

    setStatus("Video wird vorbereitet...");

    try {
  const response = await fetch("/api/generate", {
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Fehler bei der Videogenerierung");
  }

  setStatus("Video-Generierung gestartet!");
} catch (error) {
  setStatus(
    error instanceof Error
      ? error.message
      : "Unbekannter Fehler"
  );
    }
  }
        return (
    <main>
      <h1>VidAI Music Video Studio</h1>

      <p>Erstelle dein Musikvideo mit KI.</p>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0] || null;
          setAudioFile(file);
          setStatus("");
        }}
      />

      {audioFile && (
        <>
          <p>Ausgewählte Datei: {audioFile.name}</p>

          <button onClick={createVideo}>
            🎬 Video erstellen
          </button>
        </>
      )}

      {status && <p>{status}</p>}
    </main>
  );
  }
