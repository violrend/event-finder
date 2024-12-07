import { EventFilters } from './event-filters';
import { EventResults } from './event-results';

export default function EventsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-6'>Event Search Results</h1>
      <EventFilters initialFilters={searchParams} />
      <EventResults searchParams={searchParams} />
    </div>
  );
}
