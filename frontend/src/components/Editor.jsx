import React, { useState } from "react";
import { Save, Trash2 } from "lucide-react";

function Editor({ apiBase, onSaved }) {
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  async function handleSave() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`${apiBase}/save-version`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Save failed");
      onSaved(data.version);
      setMsg({ type: "success", text: "Saved successfully" });
    } catch (err) {
      setMsg({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-medium text-gray-900">Content Editor</h2>
          <p className="text-sm text-gray-500">
            Type your content here. Click{" "}
            <span className="font-medium">Save Version</span> to record a
            snapshot in the audit trail.
          </p>
        </div>
        <div className="text-sm text-gray-600">
          Chars: <span className="font-mono">{content.length}</span>
        </div>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start typing or paste content here..."
        className="
          w-full p-4 border border-gray-200 rounded-lg
          resize-none min-h-80
          focus:outline-none focus:ring-1 focus:ring-gray-700 focus:border-gray-200
        "
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 disabled:opacity-50 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Version"}
          </button>

          <button
            onClick={() => {
              setContent("");
              setMsg(null);
            }}
            className="inline-flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm hover:bg-gray-50 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-gray-600" /> Clear
          </button>
        </div>

        <div>
          {msg && (
            <div
              className={`text-sm ${
                msg.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {msg.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Editor;
