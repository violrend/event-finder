import { SearchParamsType } from '@/lib/types';
import { EventResults } from './event-results';
import { FilterDropdown } from './filter-dropdown';
import Image from 'next/image';
import { categories } from '@/api/api';

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const { city, category } = await searchParams;
  const cat = categories.find((cat) => cat.value === category)?.label || '';

  return (
    <main className='flex flex-col'>
      <section className='fixed -mt-14 top-0 left-0 right-0 h-60 md:h-48 z-10'>
        <Image
          src='/hero-background.jpg'
          alt='Events in Turkey'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='absolute bottom-8 z-50 w-full text-3xl lg:text-4xl font-bold text-white text-center'>
          {city && cat
            ? `${cat} Events in ${city}`
            : city
            ? `Events in ${city}`
            : cat
            ? `Events in ${cat}`
            : 'Events in Turkey'}
        </h1>
      </section>
      <div className='relative z-0 mt-32 md:mt-20'>
      <section className='container px-2 md:px-4 mt-4'>
        <FilterDropdown />
      </section>
      <section className='container px-2 md:px-4'>
        <EventResults searchParams={searchParams} />
        </section>
        </div>
    </main>
  );
}
