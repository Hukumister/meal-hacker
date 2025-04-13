import {cache} from 'react'
import {prisma} from '@/lib/prisma'
import {Recipe, RecipeCategory} from "@prisma/client";

export type RecipeWithoutDates = Omit<Recipe, 'createdAt' | 'updatedAt'>

export type RecipeFilters = {
    search?: string
    sortBy?: 'cookingTime' | 'calories'
    sortOrder?: 'asc' | 'desc'
    category?: RecipeCategory
}

export const getRecipes = cache(async (
    filters: RecipeFilters,
    page: number = 1,
    limit: number = 15,
) => {
    const skip = (page - 1) * limit

    const where = {
        ...(filters.search && {
            OR: [
                {title: {contains: filters.search, mode: 'insensitive'}},
                {description: {contains: filters.search, mode: 'insensitive'}},
            ],
        }),
        ...(filters.category && {category: filters.category}),
    }

    const orderBy = filters.sortBy ? {
        [filters.sortBy]: filters.sortOrder || 'asc',
    } : undefined

    const [recipes, total] = await Promise.all([
        prisma.recipe.findMany({
            where,
            orderBy,
            skip,
            take: limit,
        }),
        prisma.recipe.count({where}),
    ])

    return {
        recipes,
        total,
    }
})

export const getRecipeById = cache(async (id: string) => {
    return prisma.recipe.findUnique({
        where: {id},
    })
}) 