// prisma/seed.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

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
]

async function main() {
  console.log('🌱 Starting seed...')

  // Seed genres
  console.log('📚 Seeding genres...')
  
  for (const genreData of genres) {
    const genre = await prisma.genre.upsert({
      where: { slug: genreData.slug },
      update: {},
      create: genreData,
    })
    console.log(`✅ ${genre.emoji} ${genre.name}`)
  }

  console.log('🎉 Seeding finished!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })