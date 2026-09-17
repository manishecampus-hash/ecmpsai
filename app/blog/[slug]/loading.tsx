import React from "react";

export default function BlogLoading() {
  return (
    <main className="min-h-screen bg-white text-gray-700 animate-pulse">
      {/* Top indeterminate progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-red-100 overflow-hidden">
        <div className="h-full bg-red-600 w-1/3 animate-[shimmer_1.2s_infinite_linear] rounded-r-full" />
      </div>

      <div className="mx-auto w-full max-w-[1264px] px-6 py-8">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2 mb-8">
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="h-4 w-3 bg-gray-200 rounded" />
          <div className="h-4 w-36 bg-gray-200 rounded" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_352px] gap-12 items-start">
          {/* Main Content Column */}
          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="space-y-3">
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
              <div className="h-10 w-3/4 bg-gray-200 rounded-xl" />
            </div>

            {/* Author & Meta Row */}
            <div className="flex items-center justify-between pt-2 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-gray-200" />
                <div className="space-y-1.5">
                  <div className="h-4 w-28 bg-gray-200 rounded" />
                  <div className="h-3 w-40 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-9 w-9 rounded-full bg-gray-200" />
                <div className="h-9 w-9 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Feature Image Skeleton */}
            <div className="h-72 sm:h-96 w-full rounded-2xl bg-gray-200" />

            {/* Paragraph lines skeleton */}
            <div className="space-y-4 pt-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>

            <div className="space-y-4 pt-6">
              <div className="h-7 w-48 bg-gray-200 rounded-lg" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="hidden lg:block space-y-6">
            <div className="rounded-2xl border border-gray-100 p-6 bg-gray-50 space-y-4">
              <div className="h-6 w-40 bg-gray-200 rounded-lg" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-11 w-full bg-gray-200 rounded-xl" />
              <div className="h-11 w-full bg-gray-200 rounded-xl" />
              <div className="h-11 w-full bg-gray-200 rounded-xl" />
              <div className="h-12 w-full bg-red-200 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
