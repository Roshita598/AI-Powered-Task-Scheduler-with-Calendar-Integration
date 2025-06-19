// frontend/src/app/page.tsx
"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/parse-task/", {
        text: input,
      });
      setResult(JSON.parse(res.data.parsed));
    } catch (err) {
      console.error(err);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">🧠 AI Task Scheduler</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your task (e.g., Finish report by Friday 3pm, high priority)"
        className="w-full max-w-xl p-4 rounded border border-gray-300 mb-4"
        rows={4}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Parsing..." : "Parse Task"}
      </button>

      {result && (
        <div className="mt-6 bg-white shadow p-4 rounded w-full max-w-xl">
          <h2 className="text-xl font-semibold mb-2">📝 Parsed Task</h2>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
