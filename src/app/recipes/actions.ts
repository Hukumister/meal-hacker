"use server"

import {revalidatePath} from "next/cache";
import {type CreateRecipeFormValues, createRecipeSchema} from "@/form/recipe";
import {FormResponse} from "@/types/response";
import {extractRecipe} from "@/models/recipe-extract";
import {createRecipe} from "@/models/recipe";

export async function createRecipeAction(
    prevState: unknown,
    formData: CreateRecipeFormValues
  ): Promise<FormResponse<void>> {
    try {
      const result = createRecipeSchema.safeParse(formData);
      console.log("Validation result:", result); 
      if (!result.success) {
        return {
          success: false,
          errors: result.error.issues,
        };
      }
  
      console.log("Extracting recipe from description:", result.data.description);
      const recipe = await extractRecipe(result.data.description);
      console.log("Extracted recipe result:", recipe);
  
      if (!recipe) {
        return {
          success: false,
          errors: [],
          message: "Не удалось обработать рецепт, попробуйте еще раз",
        };
      }
  
      console.log("Creating recipe with title:", result.data.title);
      await createRecipe(result.data.title, recipe);
      console.log("Recipe created successfully!");
  
      revalidatePath("/recipes");
  
      return { success: true, data: undefined };
    } catch (error) {
      console.error("Error while creating recipe:", error);
      return {
        success: false,
        errors: [],
        message: "Failed to create recipe",
      };
    }
  }
  