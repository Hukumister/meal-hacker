import {useRouter, useSearchParams} from "next/navigation"
import {useEffect, useState} from "react"

type Filters = {
    [key: string]: string
}

export function useFilters<T extends Filters>(defaultFilters?: T) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [filters, setFilters] = useState<T>({
        ...defaultFilters,
        ...searchParamsToFilters<T>(searchParams),
    })

    useEffect(() => {
        const newSearchParams = filtersToSearchParams(filters, searchParams)
        if (newSearchParams.toString() !== searchParams.toString()) {
            router.replace(`?${newSearchParams.toString()}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    useEffect(() => {
        const filter = searchParamsToFilters<T>(searchParams)
        setFilters(filter)
    }, [searchParams])

    return [filters, setFilters] as const
}

export function filtersToSearchParams<T extends Filters>(filters: T, current?: URLSearchParams): URLSearchParams {
    if (Object.keys(filters).length === 0) {
        return new URLSearchParams()
    }

    const searchParams = new URLSearchParams(current?.toString())
    const entries = Object.entries(filters)

    entries.forEach(([key, value]) => {
        if (value && value !== "-") {
            searchParams.set(key, value)
        } else {
            searchParams.delete(key)
        }
    })

    searchParams.entries().forEach(([key]) => {
        if (filters[key] === "" || filters[key] === "-") {
            searchParams.delete(key)
        }
    })
    return searchParams
}

export function searchParamsToFilters<T extends Filters>(searchParams: URLSearchParams) {
    return Array.from(searchParams.keys()).reduce((acc, filter) => {
        const value = searchParams.get(filter) || ""
        acc[filter] = value === "-" ? "" : value
        return acc
    }, {} as Record<string, string>) as T
}

export function isFiltered(filters: Filters) {
    return Object.values(filters).some((value) => value !== "" && value !== "-")
}