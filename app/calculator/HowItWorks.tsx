"use client";
import { PortableText } from "@portabletext/react";

export default function HowItWorks({ title, body }: { title: string; body: any }) {
  return (
    <div className="mt-12 bg-white border border-gray-200 shadow-md rounded-xl p-6 sm:p-8">
      <h2 className="text-3xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="prose prose-blue max-w-none text-gray-700">
        <PortableText value={body} />
      </div>
    </div>
  );
}

