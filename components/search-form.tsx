'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { getCities, categories } from '@/api/api';
import { DatePickerWithPresets } from './date-picker-with-presets';

export function SearchForm() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [category, setCategory] = useState('');

  // Get cities data
  const cities = getCities();

  // TODO: Pass search parameter to url and navigate to events page
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (city) searchParams.set('city', city);
    if (category) searchParams.set('category', category);
    if (date?.from) searchParams.set('startDate', date.from.toISOString());
    if (date?.to) searchParams.set('endDate', date.to.toISOString());

    window.location.href = `/events?${searchParams.toString()}`;
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-3xl space-y-4'>
      <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <div>
          <Select value={city} onValueChange={(value) => setCity(value)}>
            <SelectTrigger className='w-full md:w-1/3 text-base'>
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
        <Select value={category} onValueChange={setCategory}>
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
        <DatePickerWithPresets
          date={date}
          setDate={setDate}
          className='w-full md:w-1/3'
        />
      </div>
      <Button type='submit' className='w-full'>
        <Search className='mr-2 h-4 w-4' /> <h5>Search Events</h5>
      </Button>
    </form>
  );
}
