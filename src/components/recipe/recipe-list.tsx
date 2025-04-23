import { type Recipe } from '@prisma/client'
import { cn } from '@/lib/utils'
import { Pagination } from '@/components/pagination'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface RecipeListProps {
  items: Recipe[]
  total: number
}

export function RecipeList({ items, total }: RecipeListProps) {
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
            {recipe.imageUrl && (
              <div className={cn(
                "relative",
                // Grid image style
                "md:w-full md:h-48",
                // List image style
                "w-24 h-24"
              )}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            
            <CardContent className="flex-1 p-4">
              <CardHeader className="p-0 mb-2">
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <CardDescription className="line-clamp-2">
                  {recipe.description}
                </CardDescription>
              </CardHeader>
              
              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  {recipe.cookingTime} min
                </span>
                <span className="text-muted-foreground">
                  {recipe.calories} cal
                </span>
                <span className="text-muted-foreground capitalize">
                  {recipe.category.toLowerCase()}
                </span>
              </div>
              
              <div className="mt-2 text-sm grid grid-cols-3 gap-2">
                <div>
                  <span className="font-medium">{recipe.proteins}g</span>
                  <span className="text-muted-foreground ml-1">protein</span>
                </div>
                <div>
                  <span className="font-medium">{recipe.fats}g</span>
                  <span className="text-muted-foreground ml-1">fats</span>
                </div>
                <div>
                  <span className="font-medium">{recipe.carbs}g</span>
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