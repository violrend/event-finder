'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

const categories = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'arts', label: 'Arts & Theater' },
  { value: 'family', label: 'Family' },
  { value: 'other', label: 'Other' },
];

export function SearchForm() {
  const [city, setCity] = useState('');
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    console.log({ city, category, date });
  };

  return (
    <form onSubmit={handleSubmit} className='w-full max-w-3xl space-y-4'>
      <div className='flex flex-col md:flex-row gap-4'>
        <Input
          type='text'
          placeholder='Enter city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='flex-grow'
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className='w-full md:w-[180px]'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <Button type='submit' className='w-full'>
        <Search className='mr-2 h-4 w-4' /> Search Events
      </Button>
    </form>
  );
}
