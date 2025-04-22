import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export type CreateRecipeFormValues = z.infer<typeof createRecipeSchema>; 