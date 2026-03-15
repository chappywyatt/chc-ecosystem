"use client";

import { useState, type ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends Record<string, any>>({
  columns,
  data,
  keyField,
  onRowClick,
  emptyMessage = "No data available",
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const sorted = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        const cmp = String(aVal).localeCompare(String(bVal), undefined, {
          numeric: true,
        });
        return sortDir === "asc" ? cmp : -cmp;
      })
    : data;

  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-surface-card py-12 text-center text-text-secondary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-navy text-left text-sm font-medium text-white">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-4 py-3 ${col.sortable ? "cursor-pointer select-none hover:bg-navy-light" : ""} ${col.className ?? ""}`}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className="inline-flex items-center gap-1">
                  {col.header}
                  {col.sortable && sortKey === col.key && (
                    <span className="text-gold">{sortDir === "asc" ? "▲" : "▼"}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr
              key={String(row[keyField])}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={`border-t border-border text-sm text-text
                ${idx % 2 === 0 ? "bg-surface-card" : "bg-surface"}
                ${onRowClick ? "cursor-pointer hover:bg-fluent-light/30" : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.render
                    ? col.render(row)
                    : (row[col.key] as ReactNode) ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table, type Column };
