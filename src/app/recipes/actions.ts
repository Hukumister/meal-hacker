"use server"

import {revalidatePath} from "next/cache";
import {type CreateRecipeFormValues, createRecipeSchema} from "@/form/recipe";
import {FormResponse} from "@/types/response";
import {extractRecipe} from "@/models/recipe-extract";
import {createRecipe} from "@/models/recipe";

export async function createRecipeAction(
    prevState: any,
    formData: CreateRecipeFormValues
): Promise<FormResponse<void>> {
    try {
        const result = createRecipeSchema.safeParse(formData);

        if (!result.success) {
            return {
                success: false,
                errors: result.error.issues
            };
        }

        const recipe = await extractRecipe(result.data.description)
        if (!recipe) {
            return {
                success: false,
                errors: [],
                message: "Не удалось обработать рецепт попробуйте еще раз"
            };
        }

        if (recipe.success) {
            await createRecipe(result.data.title, recipe.data)
            revalidatePath("/recipes");

            return {success: true, data: undefined};
        } else {
            return {success: false, message: recipe.error, errors: []}
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            errors: [],
            message: "Failed to create recipe",
        };
    }
}

