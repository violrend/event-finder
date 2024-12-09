'use client'

import { useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AutoComplete } from "@/components/ui/autocomplete"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { getCities, categories } from "@/api/api"
import { DateRange } from 'react-day-picker'

type Filter = {
  city: string
  category: string
  date: DateRange | undefined
}

export function EventFilters(initialFilters: Filter) {
  // const router = useRouter()
  const [filters, setFilters] = useState<Filter>({
    city: initialFilters.city || '',
    category: initialFilters.category || '',
    date: initialFilters.date || undefined
  })
  const [searchCityValue, setSearchCityValue] = useState('');

  // Get cities data
  const data = getCities(searchCityValue);

  const handleFilterChange = (key: string, value: string | DateRange | undefined) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    console.log(filters)
    // TODO: Pass search parameter to url and navigate to events page
    // const searchParams = new URLSearchParams(filters as Record<string, string>)
    // router.push(`/search?${searchParams.toString()}`)
  }

  return (
    <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <div className='w-full md:w-1/3'>
          <AutoComplete
            selectedValue={filters.city}
            onSelectedValueChange={(value) => handleFilterChange('city', value)}
            searchValue={searchCityValue}
            onSearchValueChange={setSearchCityValue}
            items={data ?? []}
            placeholder='Enter City'
          />
        </div>
        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger className='w-full md:w-1/3 text-base'>
            <SelectValue placeholder='Select Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePickerWithRange date={filters.date} setDate={(value) => handleFilterChange('date', value)} className='w-full md:w-1/3'/>
      </div>
  )
}

