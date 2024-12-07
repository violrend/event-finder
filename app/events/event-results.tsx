import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EventRow } from './event-row'

// This is a mock function. Replace it with actual API call to Ticketmaster
async function fetchEvents(searchParams: { [key: string]: string | string[] | undefined }) {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('Fetching events with search params:', searchParams)
  
  // Mock data
  return [
    { id: '1', name: 'Concert A', category: 'Music', venue: 'Stadium X', date: '2023-07-15', image: 'https://picsum.photos/200' },
    { id: '2', name: 'Sports Event B', category: 'Sports', venue: 'Arena Y', date: '2023-07-20', image: 'https://picsum.photos/200' },
    { id: '3', name: 'Theater Show C', category: 'Arts', venue: 'Theater Z', date: '2023-07-25', image: 'https://picsum.photos/200' },
  ]
}

export async function EventResults({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const events = await fetchEvents(searchParams)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Event Details</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Venue</TableHead>
          <TableHead className="hidden md:table-cell">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(event => (
          <EventRow key={event.id} event={event} />
        ))}
      </TableBody>
    </Table>
  )
}

