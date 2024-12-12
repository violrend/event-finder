'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { format } from 'date-fns';

export function RemovableFilterBadge({
  categories,
}: {
  categories: { value: string; label: string }[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleRemove = (key:string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (key === 'daterange') {
      newSearchParams.delete('startDateTime');
      newSearchParams.delete('endDateTime');
      newSearchParams.set('page', '0');
    } else {
      newSearchParams.delete(key);
      newSearchParams.set('page', '0');
    }
    router.push(`/events?${newSearchParams.toString()}`);
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    if (
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      return `${format(startDate, 'MMM d')} to ${format(endDate, 'd, yyyy')}`;
    } else if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} to ${format(
        endDate,
        'MMM d, yyyy'
      )}`;
    } else {
      return `${format(startDate, 'MMM d, yyyy')} to ${format(
        endDate,
        'MMM d, yyyy'
      )}`;
    }
  };

  const getFilterBadges = (params: URLSearchParams) => {
    const badges = [];
    const city = params.get('city');
    const category = params.get('category');
    const startDateTime = params.get('startDateTime');
    const endDateTime = params.get('endDateTime');
    const cat = categories.find((cat) => cat.value === category)?.label || '';

    if (city) {
      badges.push({ key: 'city', value: city as string });
    }
    if (cat) {
      badges.push({ key: 'category', value: cat as string });
    }
    if (startDateTime && endDateTime) {
      badges.push({
        key: 'daterange',
        value: formatDateRange(startDateTime as string, endDateTime as string),
      });
    }
    return badges;
  };

  return (
    <div className='flex flex-wrap gap-2'>
      {getFilterBadges(searchParams).map((badge) => (
        <Badge
          variant='secondary'
          className='flex items-center gap-1'
          key={badge.key}
        >
          <button
            onClick={() => handleRemove(badge.key)}
            className='p-0 h-4 w-4 rounded-full hover:bg-muted-foreground/20'
          >
            <X className='h-3 w-3' />
          </button>
          {badge.value}
        </Badge>
      ))}
    </div>
  );
}
