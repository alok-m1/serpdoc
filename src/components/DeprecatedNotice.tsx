import React from "react";
import { AlertTriangle } from "lucide-react";

interface DeprecatedNoticeProps {
  title?: string;
  message?: string;
}

export function DeprecatedNotice({
  title = "Deprecated",
  message = "This endpoint is deprecated and will be removed in a future release. Please migrate to the newer API.",
}: DeprecatedNoticeProps) {
  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-md border border-yellow-200 bg-yellow-50 px-3 py-2 text-sm text-yellow-800 dark:border-yellow-800/40 dark:bg-yellow-900/20 dark:text-yellow-300"
    >
      <AlertTriangle className="size-4 shrink-0" />

      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="text-sm opacity-90">{message}</div>
      </div>
    </div>
  );
}
