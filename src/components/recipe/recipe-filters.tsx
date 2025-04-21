'use client'

import { useFilters, isFiltered } from '@/hooks/use-filters'
import { type RecipeFilters } from '@/models/recipe'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { XIcon } from 'lucide-react'

interface RecipeFilterBarProps {
  initialFilters: RecipeFilters
}

export function RecipeFilterBar({ initialFilters }: RecipeFilterBarProps) {
  const [filters, setFilters] = useFilters<RecipeFilters>(initialFilters)

  const handleFilterChange = (name: keyof RecipeFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value || undefined,
    }))
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center">
      {/* Search */}
      <div className="flex-1">
        <Input
          type="search"
          placeholder="Search recipes..."
          value={filters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Category Filter */}
        <Select 
          value={filters.category || ''} 
          onValueChange={(value) => handleFilterChange('category', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-">All Categories</SelectItem>
            <SelectItem value="BREAKFAST">Breakfast</SelectItem>
            <SelectItem value="LUNCH">Lunch</SelectItem>
            <SelectItem value="DINNER">Dinner</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select 
          value={filters.sortBy || ''} 
          onValueChange={(value) => handleFilterChange('sortBy', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cookingTime">Cooking Time</SelectItem>
            <SelectItem value="calories">Calories</SelectItem>
          </SelectContent>
        </Select>

        {/* Sort Order */}
        <Select 
          value={filters.sortOrder || ''} 
          onValueChange={(value) => handleFilterChange('sortOrder', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {isFiltered(filters) && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClearFilters}
            className="shrink-0"
          >
            <XIcon className="h-4 w-4" />
            <span className="sr-only">Clear filters</span>
          </Button>
        )}
      </div>
    </div>
  )
} 