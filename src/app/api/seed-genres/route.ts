import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const genres = [
  { name: "Action", emoji: "🎬", slug: "action" },
  { name: "Comedy", emoji: "😂", slug: "comedy" },
  { name: "Romance", emoji: "💕", slug: "romance" },
  { name: "Horror", emoji: "😱", slug: "horror" },
  { name: "Sci-Fi", emoji: "🚀", slug: "sci-fi" },
  { name: "Drama", emoji: "📚", slug: "drama" },
  { name: "Mystery", emoji: "🔍", slug: "mystery" },
  { name: "Fantasy", emoji: "⚔️", slug: "fantasy" },
  { name: "Musical", emoji: "🎭", slug: "musical" },
  { name: "Animation", emoji: "🌟", slug: "animation" },
  { name: "Crime", emoji: "🔥", slug: "crime" },
  { name: "Documentary", emoji: "🌍", slug: "documentary" },
];

export async function GET() {
  const results = [];
  for (const genreData of genres) {
    const genre = await prisma.genre.upsert({
      where: { slug: genreData.slug },
      update: {},
      create: genreData,
    });
    results.push({ name: genre.name, emoji: genre.emoji, slug: genre.slug });
  }
  return NextResponse.json({ message: "Genres seeded!", genres: results });
}
