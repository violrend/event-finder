'use client';

import { TableCell, TableRow } from '@/components/ui/table';
import { EventSummaryType } from '@/lib/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export function EventRow({ event }: { event: EventSummaryType }) {
  const router = useRouter();

  const handleRowClick = () => {
    router.push(`/events/${event.id}`);
  };

  return (
    <TableRow onClick={handleRowClick} className='cursor-pointer'>
      <TableCell className='font-medium'>
        <Image
          src={event.image}
          alt={event.name}
          width={100}
          height={100}
          className='rounded-sm'
        />
      </TableCell>
      <TableCell>
        <div className='font-semibold'>{event.name}</div>
        <div className='text-sm text-gray-500 md:hidden'>{event.venue}</div>
        <div className='text-sm text-gray-500 md:hidden flex justify-between'>
          <span>{event.category}</span>
          <span>
            {new Date(event.date).toLocaleString('en-US', {
              hour12: false,
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </span>
        </div>
      </TableCell>
      <TableCell className='hidden md:table-cell'>{event.category}</TableCell>
      <TableCell className='hidden md:table-cell'>{event.venue}</TableCell>
      <TableCell className='hidden md:table-cell'>
        {new Date(event.date).toLocaleString('en-US', {
          hour12: false,
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          year: 'numeric',
        })}
      </TableCell>
    </TableRow>
  );
}
