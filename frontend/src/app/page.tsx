"use client";

import { useState } from "react";

export default function Home() {
  const [brand, setBrand] = useState("");
  const [tone, setTone] = useState("");
  const [audience, setAudience] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function handleGenerate() {
    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, tone, audience }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ad-scenes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="p-10 max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">AdForge - Forge Your Advertisements</h1>

      {/* FORM */}
      <div className="space-y-4">
        <input
          className="w-full p-3 border rounded"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="Tone (e.g. happy, emotional, energetic)"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        />

        <input
          className="w-full p-3 border rounded"
          placeholder="Audience (e.g. adults, professionals)"
          value={audience}
          onChange={(e) => setAudience(e.target.value)}
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          {loading ? "Generating..." : "Generate Ad"}
        </button>
      </div>

      {/* RESULTS */}
      {result && (
        <div className="space-y-8 mt-10">
          <h2 className="text-2xl font-semibold">Generated Script</h2>
          <p className="p-4 rounded border bg-black-50">{result.script}</p>

          <h2 className="text-2xl font-semibold">Scenes</h2>

          <div className="space-y-6">
            {result.scenes.map((scene: any) => (
              <div key={scene.id} className="border p-4 rounded-lg">
                <h3 className="font-bold text-lg">Scene {scene.id}</h3>

                <p className="mt-2 text-gray-700">{scene.description}</p>

                {/* Video preview */}
                <video
                  src={scene.videoUrl}
                  controls
                  className="w-full mt-4 rounded"
                />

                {/* Keywords */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {scene.keywords.map((kw: string, i: number) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-black-200 rounded text-sm"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={exportJSON}
            className="px-6 py-3 bg-green-600 text-white rounded"
          >
            Export JSON
          </button>
        </div>
      )}
    </main>
  );
}
