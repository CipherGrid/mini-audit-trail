import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import VersionsList from "./components/VersionsList";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

function App() {
  const [versions, setVersions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVersions();
  }, []);

  async function fetchVersions() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/versions`);
      const data = await res.json();
      if (!data.ok) throw new Error(data.error || "Failed to fetch versions");
      setVersions(data.versions || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function prependVersion(v) {
    const safe = (({
      id,
      timestamp,
      addedWords,
      removedWords,
      oldLength,
      newLength,
    }) => ({ id, timestamp, addedWords, removedWords, oldLength, newLength }))(
      v
    );
    setVersions((prev) => [safe, ...prev]);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Header
          server={API_BASE}
          onRefresh={fetchVersions}
          count={versions.length}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <Editor apiBase={API_BASE} onSaved={prependVersion} />
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Tip: Save versions frequently to capture small edits as separate
              entries.
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Version History</h3>
                <div className="text-sm text-gray-500">
                  {loading ? "Loading..." : `${versions.length} items`}
                </div>
              </div>

              {error && (
                <div className="mb-4 text-sm text-red-600">Error: {error}</div>
              )}

              <VersionsList versions={versions} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
