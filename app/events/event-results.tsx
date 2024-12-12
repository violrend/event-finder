import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { EventRow } from './event-row';
import { RemovableFilterBadge } from './removable-filter-badge';
import { format } from 'date-fns';
import { EventType, PaginationType, SearchParamsType } from '@/lib/types';
import { categories, fetchEventsAPI } from '@/api/api';
import EventPagination from './event-pagination';
import { Separator } from '@/components/ui/separator';

async function fetchEvents({
  searchParams,
}: {
  searchParams: SearchParamsType;
}): Promise<{ events: EventType[]; pagination: PaginationType }> {
  try {
    const response = await fetchEventsAPI(searchParams);
    return response as { events: EventType[]; pagination: PaginationType };
  } catch (error) {
    console.error(error);
    return { events: [], pagination: { currentPage: 0, totalPages: 0 } };
  }
}

export async function EventResults({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const { events, pagination } = await fetchEvents({ searchParams });

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

  const getFilterBadges = async (params: SearchParamsType) => {
    const badges = [];
    const { city, category, startDateTime, endDateTime } = await params;
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

  if (!events || events.length === 0) {
    return (
      <div>
        <div className='flex flex-wrap gap-2'>
          {(await getFilterBadges(searchParams)).map((badge) => (
            <RemovableFilterBadge
              key={badge.key}
              filterKey={badge.key}
              filterValue={badge.value}
            />
          ))}
        </div>
        <div className='h-40 pt-10 w-full text-center'>No events found</div>
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-wrap gap-2'>
        {(await getFilterBadges(searchParams)).map((badge) => (
          <RemovableFilterBadge
            key={badge.key}
            filterKey={badge.key}
            filterValue={badge.value}
          />
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'></TableHead>
            <TableHead>Event Details</TableHead>
            <TableHead className='hidden md:table-cell'>Category</TableHead>
            <TableHead className='hidden md:table-cell'>Venue</TableHead>
            <TableHead className='hidden md:table-cell'>Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event: EventType) => (
            <EventRow
              key={event.id}
              event={{
                id: event.id,
                name: event.name,
                date: format(
                  new Date(`${event.date.localDate} ${event.date.localTime}`),
                  'MMM d, yyyy h:mm a'
                ),
                image:
                  event.images.find((image) =>
                    image.includes('TABLET_LANDSCAPE_LARGE')
                  ) ?? '',
                category: event.segment.name,
                venue: event.venue,
              }}
            />
          ))}
        </TableBody>
      </Table>
      <Separator className='my-4'/>
      <EventPagination searchParams={searchParams} pagination={pagination} />
    </>
  );
}
