"use server";

import { prisma } from "@/lib/prisma_client/primsa_client";


export async function getGenreList() {
    return prisma.genre.findMany({
        orderBy: { name: 'asc' },
    });
}

export async function getGenreBySlug(slug: string) {
    return prisma.genre.findUnique({
        where: { slug },
    });
}
