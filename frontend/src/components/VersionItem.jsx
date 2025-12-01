import React from "react";

function SmallBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${className}`}
    >
      {children}
    </span>
  );
}

function VersionItem({ v }) {
  const {
    id = "",
    timestamp = "",
    addedWords = [],
    removedWords = [],
    oldLength = 0,
    newLength = 0,
  } = v || {};

  return (
    <div className="border border-gray-100 rounded-lg p-4 bg-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{timestamp}</div>
          <div className="text-sm font-medium text-gray-800 mt-1">
            {id ? id.slice(0, 10) + (id.length > 10 ? "…" : "") : "—"}
          </div>
        </div>

        <div className="text-sm text-gray-600 text-right">
          <div>
            old <span className="font-mono">{oldLength}</span>
          </div>
          <div>
            new <span className="font-mono">{newLength}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div>
          <div className="text-xs text-gray-500 mb-1">Added words</div>
          {addedWords && addedWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {addedWords.map((w, i) => (
                <SmallBadge key={i} className="bg-green-50 text-green-800">
                  {w}
                </SmallBadge>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400">—</div>
          )}
        </div>

        <div>
          <div className="text-xs text-gray-500 mb-1">Removed words</div>
          {removedWords && removedWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {removedWords.map((w, i) => (
                <SmallBadge key={i} className="bg-red-50 text-red-800">
                  {w}
                </SmallBadge>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400">—</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VersionItem;
