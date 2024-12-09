'use client';

import {
  format,
  addDays,
  startOfDay,
  endOfDay,
  nextMonday,
} from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

export function DatePickerWithPresets({
  className,
  date,
  setDate,
}: {
  className?: string;
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    const today = new Date();

    switch (value) {
      case 'today':
        setDate({
          from: startOfDay(today),
          to: endOfDay(today),
        });
        setOpen(false); // Close popover after selection
        break;
      case 'tomorrow':
        const tomorrow = addDays(today, 1);
        setDate({
          from: startOfDay(tomorrow),
          to: endOfDay(tomorrow),
        });
        setOpen(false); // Close popover after selection
        break;
      case 'weekend':
        // Find next Saturday (0 = Sunday, 6 = Saturday)
        const currentDay = today.getDay();
        const daysUntilSaturday = currentDay === 6 ? 0 : 6 - currentDay;
        const nextSaturday = addDays(today, daysUntilSaturday);
        const nextSunday = addDays(nextSaturday, 1);

        setDate({
          from: startOfDay(nextSaturday),
          to: endOfDay(nextSunday),
        });
        setOpen(false);
        break;
      case 'nextWeek':
        const monday = nextMonday(today);
        const followingSunday = addDays(monday, 6);
        setDate({
          from: startOfDay(monday),
          to: endOfDay(followingSunday),
        });
        setOpen(false); // Close popover after selection
        break;
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={'outline'}
            className={cn(
              'w-[240px] justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align='start'
          className='flex w-auto flex-col space-y-2 p-2'
        >
          <Select onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue placeholder='Select' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='today'>Today</SelectItem>
              <SelectItem value='tomorrow'>Tomorrow</SelectItem>
              <SelectItem value='weekend'>This Weekend</SelectItem>
              <SelectItem value='nextWeek'>Next Week</SelectItem>
            </SelectContent>
          </Select>
          <div className='rounded-md border'>
            <Calendar
              mode='range'
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate?.from) {
                  setDate({
                    from: startOfDay(selectedDate.from),
                    to: selectedDate.to
                      ? endOfDay(selectedDate.to)
                      : endOfDay(selectedDate.from),
                  });
                  setOpen(false); // Close popover after selection
                }
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
