"use client";
import { useRouter } from "next/navigation";

export default function ListHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
      <button
        className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
}
