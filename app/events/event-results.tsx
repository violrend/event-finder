import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EventRow } from './event-row'
import { RemovableFilterBadge } from './removable-filter-badge'
import { format } from 'date-fns'
import { EventSummaryType, EventType, SearchParamsType } from "@/lib/types"
import { fetchEventsAPI } from "@/api/api"

async function fetchEvents(searchParams: SearchParamsType) {
  // Put the fetch function in a try catch block
  // If there is an error, return an empty array
  try {
    return await fetchEventsAPI(searchParams)
  }
  catch (error) {
    console.error(error)
    return [] as EventType[]
  }
}

export async function EventResults({ searchParams }: { searchParams: SearchParamsType }) {
  const events:EventType[] = await fetchEvents(searchParams)

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} to ${format(endDate, 'd, yyyy')}`
    } else if (startDate.getFullYear() === endDate.getFullYear()) {
      return `${format(startDate, 'MMM d')} to ${format(endDate, 'MMM d, yyyy')}`
    } else {
      return `${format(startDate, 'MMM d, yyyy')} to ${format(endDate, 'MMM d, yyyy')}`
    }
  }

  const getFilterBadges = (params: SearchParamsType) => {
    const badges = []

    const city = params.city || '';
    const category = params.category || '';
    const startDateTime = params.startDateTime || '';
    const endDateTime = params.endDateTime || '';
    
    if (city) {
      badges.push({ key: 'city', value: city as string })
    }
    if (category) {
      badges.push({ key: 'category', value: category as string })
    }
    if (startDateTime && endDateTime) {
      badges.push({
        key: 'daterange',
        value: formatDateRange(startDateTime as string, endDateTime as string)
      })
    }
    return badges
  }

  const eventSummary:EventSummaryType[] = events.map((event: EventType) => ({
    id: event.id,
    name: event.name,
    date: `${event.date.localDate} ${event.date.localTime}`,
    image: event.images.find((image) => image.includes('TABLET_LANDSCAPE_LARGE')) ?? '',
    category: event.segment.name,
    venue: event.venue,
  }))


  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {getFilterBadges(searchParams).map((badge) => (
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
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Event Details</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Venue</TableHead>
            <TableHead className="hidden md:table-cell">Date & Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eventSummary.map((event: EventSummaryType) => (
            <EventRow key={event.id} event={{
              ...event,
              date: format(new Date(event.date), 'MMM d, yyyy h:mm a')
            }} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

