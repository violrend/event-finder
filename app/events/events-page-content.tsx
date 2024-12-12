'use client';

import { Suspense } from 'react';
import { FilterDropdown } from './filter-dropdown';
import { EventResults } from './event-results';
import { SearchParamsType } from '@/lib/types';

export function EventsPageContent({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  return (
    <>
      <section className='container px-2 md:px-4 mt-4'>
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterDropdown />
        </Suspense>
      </section>
      <section className='container px-2 md:px-4'>
        <Suspense fallback={<div>Loading events...</div>}>
          <EventResults searchParams={searchParams} />
        </Suspense>
      </section>
    </>
  );
}