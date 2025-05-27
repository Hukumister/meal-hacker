import {cn} from '@/lib/utils'
import {Pagination} from '@/components/pagination'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Recipe} from "@/types/recipe";

interface RecipeListProps {
    items: Recipe[]
    total: number
}

export function RecipeList({items, total}: RecipeListProps) {
    return (
        <div className="space-y-6">
            {/* Grid/List View Container */}
            <div className={cn(
                "grid gap-4",
                // Grid view for desktop (4 columns)
                "md:grid-cols-4",
                // List view for mobile (1 column)
                "grid-cols-1"
            )}>
                {items.map((recipe) => (
                    <Card
                        key={recipe.id}
                        className={cn(
                            "overflow-hidden",
                            // Grid card style
                            "md:flex md:flex-col",
                            // List item style for mobile
                            "flex items-center gap-4"
                        )}
                    >
                        <CardContent className="flex-1 p-4">
                            <CardHeader className="p-1 mb-1 top-0">
                                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                            </CardHeader>

                            <div className="flex flex-wrap gap-2 text-sm">
                                <span className="text-muted-foreground">{recipe.cookingTime.total} min</span>
                                <span className="text-muted-foreground">{recipe.nutritionPerServing.calories} cal</span>
                            </div>

                            <div className="mt-2 text-sm grid grid-cols-3 gap-2">
                                <div>
                                    <span className="font-medium">{recipe.nutritionPerServing.protein} g</span>
                                    <span className="text-muted-foreground ml-1">protein</span>
                                </div>
                                <div>
                                    <span className="font-medium">{recipe.nutritionPerServing.fat}g</span>
                                    <span className="text-muted-foreground ml-1">fats</span>
                                </div>
                                <div>
                                    <span className="font-medium">{recipe.nutritionPerServing.carbs}g</span>
                                    <span className="text-muted-foreground ml-1">carbs</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {total > 15 && (
                <Pagination
                    totalItems={total}
                    itemsPerPage={15}
                />
            )}
        </div>
    )
} 