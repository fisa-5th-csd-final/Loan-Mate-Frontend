import React from "react";

interface CategoryCardProps {
    title: string;
    children: React.ReactNode;
}

export default function CategoryCard({ title, children }: CategoryCardProps) {
    return (
        <div className="w-full max-w-4xl bg-white shadow-md rounded-xl p-4 space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <div className="text-gray-700 text-base leading-relaxed">{children}</div>
        </div>
    );
}
