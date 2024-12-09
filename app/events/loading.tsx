import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';
import { FilterDropdown } from './filter-dropdown';

export default function Loading() {
  return (
    // TODO: Add filter skeleton
    <main className='flex flex-col'>
      <section className='relative top-[-4rem] z-10 h-[20vh] flex place-items-end justify-center py-8 px-2'>
        <Image
          src='/hero-background.jpg'
          alt='Events in Turkey'
          fill
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='relative z-10 text-3xl lg:text-4xl font-bold text-white text-center'>
          Events in Turkey
        </h1>
      </section>
      <section className='container px-2 md:px-4 -mt-4'>
        <FilterDropdown />
      </section>
      <section className='container px-2 md:px-4 -mt-4'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Image</TableHead>
              <TableHead>Event Details</TableHead>
              <TableHead className='hidden md:table-cell'>Category</TableHead>
              <TableHead className='hidden md:table-cell'>Venue</TableHead>
              <TableHead className='hidden md:table-cell'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className='h-[80px] w-[80px] rounded-md' />
                </TableCell>
                <TableCell>
                  <Skeleton className='h-4 w-[250px]' />
                  <Skeleton className='h-4 w-[200px] mt-2 md:hidden' />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Skeleton className='h-4 w-[150px]' />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Skeleton className='h-4 w-[100px]' />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </main>
  );
}
