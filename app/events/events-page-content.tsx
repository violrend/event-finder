'use client';

import { Suspense } from 'react';
import { FilterDropdown } from './filter-dropdown';
import { RemovableFilterBadge } from './removable-filter-badge';

export function EventsPageContent({
  categories,
  cities,
}: {
  categories: { value: string; label: string }[];
  cities: { value: string; label: string }[];
}) {
  return (
    <>
      <section className='container px-2 md:px-4 mt-4'>
        <Suspense fallback={<div>Loading filters...</div>}>
          <FilterDropdown categories={categories} cities={cities} />
        </Suspense>
      </section>
      <section className='container px-2 md:px-4'>
        <Suspense fallback={<div>Loading events...</div>}>
          <RemovableFilterBadge categories={categories} />
        </Suspense>
      </section>
    </>
  );
}
