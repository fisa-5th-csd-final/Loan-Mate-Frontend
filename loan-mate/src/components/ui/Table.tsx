"use client";

import React from "react";

interface BaseProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: BaseProps) {
  return (
    <div className={`w-full flex flex-col ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function TableHeader({
  children,
  className,
  columns,
}: BaseProps & { columns?: string }) {
  return (
    <div
      className={`grid items-center text-[13px] px-1 text-gray-700 font-semibold mb-2 ${
        className ?? ""
      }`}
      style={{ gridTemplateColumns: columns || "1fr 1fr 1fr" }}
    >
      {children}
    </div>
  );
}


interface TableRowProps {
  columns?: string;
  children?: React.ReactNode;
}

export function TableRow({ columns = "1fr 1fr 1fr", children }: TableRowProps) {
  return (
    <div
      className="grid gap-2 py-3"
      style={{ gridTemplateColumns: columns }}
    >
      {children}
    </div>
  );
}


export function TableCell({ children, className }: BaseProps) {
  return (
    <div className={`text-gray-800 text-sm ${className ?? ""}`}>
      {children}
    </div>
  );
}

export function TableDivider() {
  return <div className="h-[1px] bg-white my-1" />;
}
