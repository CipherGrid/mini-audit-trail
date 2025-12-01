import React from "react";
import VersionItem from "./VersionItem";

function VersionsList({ versions = [], loading = false }) {
  if (loading) return <div className="text-sm text-gray-500">Loading...</div>;
  if (!versions || versions.length === 0)
    return (
      <div className="text-sm text-gray-500">
        No versions yet. Save your first version.
      </div>
    );

  return (
    <div className="space-y-4 max-h-[64vh] overflow-y-auto">
      {versions.map((v, idx) => (
        <VersionItem key={v.id ?? idx} v={v} />
      ))}
    </div>
  );
}

export default VersionsList;
