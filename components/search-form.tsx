'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AutoComplete } from '@/components/ui/autocomplete';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/date-range-picker';
import { Search } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { getCities } from '@/api/api';

export function SearchForm() {
  const [city, setCity] = useState('');
  const [searchCityValue, setSearchCityValue] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [category, setCategory] = useState('');

  const data = getCities(searchCityValue);
  const categories = [
    { value: 'music', label: 'Music' },
    { value: 'sports', label: 'Sports' },
    { value: 'arts', label: 'Arts & Theater' },
    { value: 'film', label: 'Film' },
    { value: 'other', label: 'Other' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ city, category, date });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-3xl space-y-4'>
      <div className='flex flex-col md:flex-row gap-4 justify-between'>
        <div className='w-full md:w-1/3'>
          <AutoComplete
            selectedValue={city}
            onSelectedValueChange={setCity}
            searchValue={searchCityValue}
            onSearchValueChange={setSearchCityValue}
            items={data ?? []}
            placeholder='Enter City'
          />
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
        <DatePickerWithRange date={date} setDate={setDate} className='w-full md:w-1/3'/>
      </div>
      <Button type='submit' className='w-full'>
        <Search className='mr-2 h-4 w-4' /> <h5>Search Events</h5>
      </Button>
    </form>
  );
}
