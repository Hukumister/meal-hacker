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
                            <CardHeader className="mb-2">
                                <CardTitle className="text-lg w-full">{recipe.title}</CardTitle>
                            </CardHeader>

                            <div className="grid grid-cols-2 w-full text-sm gap-4">

                                <div>
                                    <h3>Каллории</h3>
                                    <p>{recipe.calories} ккал</p>
                                </div>

                                <div>
                                    <h3>Время</h3>
                                    <p>{recipe.cookingTime.total} мин</p>
                                </div>


                                <div>
                                    <h3>БЖУ</h3>

                                    <p>
                                        <span className="font-medium">{recipe.nutritionPerServing.protein} г</span>
                                        <span className="text-muted-foreground ml-1">белки</span>
                                    </p>

                                    <p>
                                        <span className="font-medium">{recipe.nutritionPerServing.fat} г</span>
                                        <span className="text-muted-foreground ml-1">жири</span>
                                    </p>

                                    <p>
                                        <span className="font-medium">{recipe.nutritionPerServing.carbs} г</span>
                                        <span className="text-muted-foreground ml-1">углеводы</span>
                                    </p>

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