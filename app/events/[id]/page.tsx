import React from 'react';
import { fetchEventById } from '@/api/api';
import Image from 'next/image';
import { format } from 'date-fns';
import { Calendar, MapPinned, Popcorn, Theater } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function EventDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await fetchEventById(id);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <main className='flex flex-col'>
      <section className='fixed -mt-14 top-0 left-0 right-0 h-64 md:h-48 z-10'>
        <Image
          src={
            event.images.find((image) =>
              image.includes('RETINA_LANDSCAPE_16_9')
            ) || ''
          }
          alt={event.name}
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='absolute bottom-8 w-full text-3xl lg:text-4xl font-bold text-white text-center'>
          {event.name}
        </h1>
      </section>

      <section className='relative z-0 mt-44 md:mt-28 container px-4 md:px-6 flex flex-col space-y-8'>
        <div className='flex gap-4 justify-start'>
          <Calendar className='text-gray-600 min-h-6 min-w-6'/>
          <p className='font-semibold'>
            {format(new Date(event.date.localDate), 'EEEE, MMMM d, yyyy')}
            <br />
            {format(
              new Date(`${event.date.localDate}T${event.date.localTime}`),
              'HH:mm'
            )}
          </p>
        </div>
        <div className='flex gap-4 justify-start'>
          <Theater className='text-gray-600 min-h-6 min-w-6' />
          <p className='font-semibold'>{event.venue}</p>
        </div>
        <div className='flex gap-4 justify-start'>
          <MapPinned className='text-gray-600 min-h-6 min-w-6'/>
          <p className='text-sm'>
            {event.address} - {event.city}
          </p>
        </div>
        <div className='flex gap-4 justify-start'>
          <Popcorn className='text-gray-600 min-h-6 min-w-6'/>
          <p className='font-semibold'>
            {event.segment.name} - {event.genre.name}
          </p>
        </div>
        {event.attractions.length > 0 && (
          <div>
            <ul className='grid grid-cols-3 md:grid-cols-5 justify-center items-center gap-2'>
              {event.attractions.map((attraction) => (
                <li key={attraction.id} className='text-center text-sm place-items-center'>
                  <Image
                    src={
                      attraction.images.find((image) =>
                        image.includes('RETINA_LANDSCAPE_16_9')
                      ) || ''
                    }
                    alt={attraction.name}
                    width={100}
                    height={100}
                    className='rounded-lg'
                  ></Image>
                  {attraction.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className='pt-4'>
          <Link href={event.url} target='_blank' rel='noopener noreferrer'>
            <Button>Buy Tickets</Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
