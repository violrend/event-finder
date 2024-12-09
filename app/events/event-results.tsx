import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EventRow } from './event-row'
import { RemovableFilterBadge } from './removable-filter-badge'
import { format } from 'date-fns'
import { SearchParamsType } from "@/lib/types"

// TODO: This is a mock function. Replace it with actual API call to Ticketmaster
async function fetchEvents(searchParams: SearchParamsType) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log(searchParams)
  
  // Mock data
  return [
    { id: '1', name: 'Concert A', category: 'Music', venue: 'Stadium X', date: '2023-07-15T20:00:00', image: 'https://picsum.photos/200' },
    { id: '2', name: 'Sports Event B', category: 'Sports', venue: 'Arena Y', date: '2023-07-20T15:30:00', image: 'https://picsum.photos/200' },
    { id: '3', name: 'Theater Show C', category: 'Arts', venue: 'Theater Z', date: '2023-07-25T19:00:00', image: 'https://picsum.photos/200' },
  ]
}

export async function EventResults({ searchParams }: { searchParams: SearchParamsType }) {
  const events = await fetchEvents(searchParams)

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
          {events.map(event => (
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

