'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EventFilters({ initialFilters }: { initialFilters: { [key: string]: string | string[] | undefined } }) {
  const router = useRouter()
  const [filters, setFilters] = useState({
    city: initialFilters.city || '',
    category: Array.isArray(initialFilters.category) ? initialFilters.category[0] || '' : initialFilters.category || '',
    date: initialFilters.date || ''
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const searchParams = new URLSearchParams(filters as Record<string, string>)
    router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-end">
      <div className="flex-1">
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          value={filters.city}
          onChange={(e) => handleFilterChange('city', e.target.value)}
          placeholder="Enter city"
        />
      </div>
      <div className="flex-1">
        <Label htmlFor="category">Category</Label>
        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="music">Music</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="arts">Arts & Theater</SelectItem>
            <SelectItem value="family">Family</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1">
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
        />
      </div>
      <Button onClick={applyFilters}>Apply Filters</Button>
    </div>
  )
}

