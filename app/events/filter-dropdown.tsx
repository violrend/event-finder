'use client';


import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { getCities, categories } from '@/api/api';
import { DatePickerWithPresets } from '@/components/date-picker-with-presets';
import { useEffect, useState } from 'react';
import { FilterType } from '@/lib/types';
import { DateRange } from 'react-day-picker';

export function FilterDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<FilterType>({
    city: '',
    category: '',
    dateRange: undefined,
  });

  useEffect(() => {
    setLocalFilters({
      city: searchParams.get('city') || '',
      category: searchParams.get('category') || '',
      dateRange: {
        from: searchParams.get('startDateTime')
          ? new Date(searchParams.get('startDateTime')!)
          : undefined,
        to: searchParams.get('endDateTime')
          ? new Date(searchParams.get('endDateTime')!)
          : undefined,
      },
    });
  }, [searchParams]);


  const handleFilterChange = (key: string, value: string | DateRange | undefined) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    const newSearchParams = new URLSearchParams();
    if (localFilters.city) newSearchParams.set('city', localFilters.city);
    if (localFilters.category)
      newSearchParams.set('category', localFilters.category);
    if (localFilters.dateRange?.from)
      newSearchParams.set(
        'startDateTime',
        localFilters.dateRange.from.toISOString()
      );
    if (localFilters.dateRange?.to)
      newSearchParams.set(
        'endDateTime',
        localFilters.dateRange.to.toISOString()
      );
    router.push(`/events?${newSearchParams.toString()}`);
    setOpen(false);
  };

  const clearFilters = () => {
    setLocalFilters({
      city: '',
      category: '',
      dateRange: undefined,
    });
    router.push('/events');
    setOpen(false);
  };


  // Get cities data
  const cities = getCities();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='mb-4'>
          <Filter className='mr-2 h-4 w-4' />
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-70'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <p className='text-sm text-muted-foreground'>
              Customize your event search
            </p>
          </div>
          <div className='grid gap-2'>
            <div className='grid items-center gap-4'>
              <Select
                value={localFilters.city}
                onValueChange={(value) => handleFilterChange('city', value)}
              >
                <SelectTrigger className='h-8 col-span-2'>
                  <SelectValue placeholder='Select city' />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.value} value={city.label}>
                      {city.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid items-center gap-4'>
              <Select
                value={localFilters.category}
                onValueChange={(value) => handleFilterChange('category', value)}
              >
                <SelectTrigger className='h-8 col-span-2'>
                  <SelectValue placeholder='Select category' />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className='grid items-center gap-4'>
              <DatePickerWithPresets
                date={localFilters.dateRange}
                setDate={(value) => handleFilterChange('dateRange', value)}
              />
            </div>
            <Button onClick={applyFilters}>Apply Filters</Button>
          <Button variant='link' onClick={clearFilters} className='mt-2'>
            Clear Filters
          </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
