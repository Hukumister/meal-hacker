import {cache} from 'react'
import {prisma} from '@/lib/prisma'
import {Prisma, Recipe as DbRecipe, RecipeCategory} from "@prisma/client";
import {CookingTime, Ingredient, Nutrition, Recipe, Weight} from "@/types/recipe";

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
                {title: {contains: filters.search}}
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
        recipes: recipes.map(convertDbToRecipe),
        total,
    }
})

export const getRecipeById = cache(async (id: string) => {
    const recipe = await prisma.recipe.findUnique({
        where: {id},
    })

    return recipe ? convertDbToRecipe(recipe) : null
})

export async function createRecipe(
    title: string,
    recipe: Recipe
) {
    return prisma.recipe.create({
        data: {
            title: title,
            ingredients: recipe.ingredients as Prisma.JsonArray,
            instructions: recipe.instructions as Prisma.JsonArray,
            cookingTime: recipe.cookingTime,
            calories: recipe.calories,
            caloriesPer100: recipe.caloriesPer100,
            servings: recipe.servings,
            category: RecipeCategory.LUNCH,
            nutritionPerServing: recipe.nutritionPerServing,
            nutritionPer100g: recipe.nutritionPer100,
            weight: recipe.weight as Prisma.JsonObject
        }
    })
}

function convertDbToRecipe(dbRecipe: DbRecipe): Recipe {
    return {
        id: dbRecipe.id,
        title: dbRecipe.title,
        ingredients: dbRecipe.ingredients as Ingredient[],
        instructions: dbRecipe.instructions as string[],
        cookingTime: dbRecipe.cookingTime as CookingTime,
        servings: dbRecipe.servings,
        calories: dbRecipe.calories,
        caloriesPer100: dbRecipe.caloriesPer100,
        nutritionPerServing: dbRecipe.nutritionPerServing as Nutrition,
        nutritionPer100: dbRecipe.nutritionPer100g as Nutrition,
        weight: dbRecipe.weight as Weight
    };
}
