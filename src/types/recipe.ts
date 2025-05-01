export type Ingredient = {
    name: string;
    amount: number;
    unit: string; // г/мл/шт/ст.л./ч.л./по вкусу/и т.д.
}

export type CookingTime = {
    total: number;
    active: number;
    passive: number;
}

export type Nutrition = {
    protein: number;
    fat: number;
    carbs: number;
}

export type Weight = {
    amount: number;
    unit: string; // г/мл/унция/фунт/и т.д.
}

export type Recipe = {
    id: string;
    title: string;
    ingredients: Ingredient[];
    instructions: string[];
    calories: number,
    caloriesPer100: number,
    cookingTime: CookingTime;
    nutritionPerServing: Nutrition;
    nutritionPer100: Nutrition;
    servings: number;
    weight: Weight;
}