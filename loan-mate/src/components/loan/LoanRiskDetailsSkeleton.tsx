import React from "react";

export default function LoanRiskDetailsSkeleton() {
  return (
    <div className="w-full py-4 animate-pulse">
      {/* AI Comment Box Skeleton */}
      <div className="mb-6 w-full h-24 bg-gray-200 rounded-2xl" />

      {/* ProgressBar Skeleton */}
      <div className="mb-6 w-full">
        <div className="h-4 w-24 bg-gray-200 rounded mb-2" />
        <div className="h-2 w-full bg-gray-200 rounded-full" />
      </div>

      {/* Summary Box Skeleton */}
      <div className="mb-6 grid grid-cols-2 bg-gray-50 rounded-2xl py-5 px-2 gap-4">
        <div className="flex flex-col gap-2 items-center justify-center border-r border-gray-200">
          <div className="h-3 w-12 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
        <div className="flex flex-col gap-2 items-center justify-center">
          <div className="h-3 w-16 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Details Grid Skeleton */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 px-1">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex flex-col gap-2 ${i % 2 === 1 ? 'items-end' : ''}`}>
            <div className="h-3 w-14 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
