# Filters Pattern Documentation

## Overview
This document describes the filter pattern implementation using the `useFilters` hook in our application. The pattern provides a type-safe, URL-synchronized way to manage filter states across the application.

## Basic Usage

### Filter Type Definition
```typescript
type YourFilters = {
    status?: string;
    category?: string;
    date?: string;
    // Add more filter fields as needed
}
```

### Hook Implementation
```typescript
import { useFilters } from "@/hooks/use-filters";

function YourComponent() {
    const [filters, setFilters] = useFilters<YourFilters>({
        status: "",
        category: "",
        date: ""
    });

    const handleFilterChange = (name: keyof YourFilters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        // Your component JSX
    );
}
```

## Features

### URL Synchronization
- Filters are automatically synchronized with URL parameters
- Filter state persists across page reloads
- Shareable URLs with filter states

### Type Safety
- TypeScript support for filter keys and values
- Compile-time checking for filter names
- Autocomplete support in IDE

### State Management
- Centralized filter state management
- Consistent update patterns
- Easy integration with React components

## Common Patterns

### Single Filter Update
```typescript
// Update single filter
handleFilterChange("status", "active");

// With UI component
<Select
    value={filters.status}
    onValueChange={(value) => handleFilterChange("status", value)}
>
    <SelectItem value="active">Active</SelectItem>
    <SelectItem value="inactive">Inactive</SelectItem>
</Select>
```

### Multiple Filters Update
```typescript
// Update multiple filters at once
const handleMultipleFiltersChange = (newFilters: Partial<YourFilters>) => {
    setFilters((prev) => ({
        ...prev,
        ...newFilters
    }));
};

// Usage
handleMultipleFiltersChange({
    status: "active",
    category: "new"
});
```

### Reset Filters
```typescript
// Reset all filters
const handleResetFilters = () => {
    setFilters({
        status: "",
        category: "",
        date: ""
    });
};

// Reset specific filter
const handleResetFilter = (name: keyof YourFilters) => {
    setFilters((prev) => ({
        ...prev,
        [name]: ""
    }));
};
```

## Integration Examples

### With Form Components
```typescript
function FilterForm() {
    const handleFormSubmit = (formData: YourFilters) => {
        setFilters((prev) => ({
            ...prev,
            ...formData
        }));
    };

    return (
        <Form onSubmit={handleFormSubmit}>
            {/* Form fields */}
        </Form>
    );
}
```

### With Data Fetching
```typescript
function FilteredList() {
    const [filters, setFilters] = useFilters<YourFilters>(defaultFilters);
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data when filters change
        fetchFilteredData(filters).then(setData);
    }, [filters]);

    return (
        <div>
            {/* Filter UI */}
            {/* Data display */}
        </div>
    );
}
```

## Best Practices

### Do's
- Define filter types explicitly
- Use TypeScript for type safety
- Handle empty/default filter values
- Clean up filter values when component unmounts
- Use meaningful filter names
- Document filter purposes and valid values

### Don'ts
- Don't mutate filter state directly
- Don't use filter values without type checking
- Don't skip default values
- Don't use non-serializable filter values
- Don't ignore URL parameter synchronization

## API Reference

### useFilters Hook
```typescript
function useFilters<T extends Filters>(defaultFilters?: T): [T, (filters: T) => void]
```

#### Parameters
- `defaultFilters`: Optional default filter values

#### Returns
- Array containing:
  1. Current filter state
  2. Filter update function

### Helper Functions
```typescript
// Convert filters to URL parameters
filtersToSearchParams<T>(filters: T): URLSearchParams

// Convert URL parameters to filters
searchParamsToFilters<T>(searchParams: URLSearchParams): T

// Check if any filters are active
isFiltered(filters: Filters): boolean
```

## Examples

### Basic Filter Implementation
```typescript
function ProductList() {
    const [filters, setFilters] = useFilters<ProductFilters>({
        category: "",
        price: "",
        availability: ""
    });

    const handleFilterChange = (name: keyof ProductFilters, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div>
            <Select
                value={filters.category}
                onValueChange={(value) => handleFilterChange("category", value)}
            >
                {/* Category options */}
            </Select>
            
            <Input
                value={filters.price}
                onChange={(e) => handleFilterChange("price", e.target.value)}
            />
            
            {/* More filter UI */}
        </div>
    );
}
```