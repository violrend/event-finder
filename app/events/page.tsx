import { SearchParamsType } from '@/lib/types';
import Image from 'next/image';
import { categories, getCities } from '@/api/api';

import { EventsPageContent } from './events-page-content';
import { EventResults } from './event-results';

export default async function EventsPage({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const { city, category } = await searchParams;
  const catLabel = categories.find((cat) => cat.value === category)?.label || '';

  const cities = getCities();

  return (
    <main className='flex flex-col'>
      <section className='fixed -mt-14 top-0 left-0 right-0 h-60 md:h-48 z-10'>
        <Image
          src='/hero-background.jpg'
          alt='Events in Turkey'
          fill
          sizes='100vw'
          quality={75}
          priority={true}
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='absolute bottom-8 z-50 w-full text-3xl lg:text-4xl font-bold text-white text-center'>
          {city && catLabel
            ? `${catLabel} Events in ${city}`
            : city
            ? `Events in ${city}`
            : catLabel
            ? `Events in ${catLabel}`
            : 'Events in Turkey'}
        </h1>
      </section>
      <div className='relative z-0 mt-32 md:mt-20'>
        <EventsPageContent categories={categories} cities={cities} />
        <section className='container px-2 md:px-4'>
          <EventResults searchParams={searchParams} />
        </section>
      </div>
    </main>
  );
}
