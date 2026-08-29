"use client";

import { useState } from "react";

export default function Home() {
  const [audioName, setAudioName] = useState("");

  return (
    <main>
      <h1>VidAI Music Video Studio</h1>

      <p>Erstelle dein Musikvideo mit KI.</p>

      <input
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setAudioName(file.name);
        }}
      />

      {audioName && <p>Ausgewählte Datei: {audioName}</p>}
    </main>
  );
}
