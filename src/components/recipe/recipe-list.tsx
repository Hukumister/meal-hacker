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
                        <CardContent className="flex-1 flex-col w-full p-1">
                            <CardHeader className="p-0 mb-2">
                                <CardTitle className="text-lg text-center w-full">{recipe.title}</CardTitle>
                            </CardHeader>

                            <div className="flex justify-between w-full text-sm items-start ">
                                <div className="flex flex-col text-center ml-5">
                                    <div className='font-medium mb-1 text-center gap-2'>Energy value</div>
                                    <span className="text-muted-foreground">{recipe.calories} cal</span>

                                    <div className="font-medium mb-1 text-center gap-2 mt-2">Time</div>
                                    <span className="text-muted-foreground">{recipe.cookingTime.total} min</span>
                                </div>
                                <div className="flex flex-col text-right mr-5">
                                    <div className="font-medium mb-1 text-center">PFC</div>
                                    <div className="grid grid-cols-1 gap-2 text-left">
                                        <div>
                                            <span className="font-medium">{recipe.nutritionPerServing.protein} g</span>
                                            <span className="text-muted-foreground ml-1">protein</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">{recipe.nutritionPerServing.fat} g</span>
                                            <span className="text-muted-foreground ml-1">fats</span>
                                        </div>
                                        <div>
                                            <span className="font-medium">{recipe.nutritionPerServing.carbs} g</span>
                                            <span className="text-muted-foreground ml-1">carbs</span>
                                        </div>
                                    </div>
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