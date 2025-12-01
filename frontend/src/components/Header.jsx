import React from "react";
import { Cloud, RefreshCw } from "lucide-react";

function Header({ server, onRefresh, count }) {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow">
          <Cloud className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Mini Audit Trail
          </h1>
          <p className="text-sm text-gray-500">
            Small, focused audit trail generator
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
    </header>
  );
}

export default Header;
