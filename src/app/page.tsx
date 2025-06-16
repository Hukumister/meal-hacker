import {getRecipes, type RecipeFilters} from '@/models/recipe'
import {RecipeList} from '@/components/recipe/recipe-list'
import {RecipeFilterBar} from '@/components/recipe/recipe-filters'
import {Separator} from '@/components/ui/separator'
import {CreateRecipeDialog} from "@/components/recipe/create-recipe-dialog";

type RecipesPageParam = {
    page?: number
} & RecipeFilters

export default async function RecipesPage({searchParams}: { searchParams: Promise<RecipesPageParam> }) {
    const {page, ...filters} = await searchParams
    const {recipes, total} = await getRecipes(filters, page || 1)

    return (
        <div className="container p-6 space-y-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Recipes</h1>
                    <CreateRecipeDialog/>
                </div>
                <RecipeFilterBar initialFilters={filters}/>
            </div>
            <Separator/>
            <RecipeList
                items={recipes}
                total={total}
            />
        </div>
    )
} 