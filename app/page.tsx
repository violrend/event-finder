import { SearchForm } from '@/components/search-form';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='min-h-[90dvh] flex flex-col'>
      <section className='relative top-[-4rem] z-10 h-[60vh] flex items-center justify-center'>
        <Image
          src='/hero-background.jpg'
          alt='Events in Turkiye'
          fill
          sizes='100vw'
          quality={75}
          priority={true}
          className='object-cover'
        />
        <div className='absolute inset-0 bg-black/40' />
        <h1 className='relative z-10 lg:text-6xl font-bold text-white text-center'>
          Find events in Turkiye
        </h1>
      </section>
      <section className='container flex-grow mt-[-4rem] flex items-center justify-center p-4 md:p-8'>
        <SearchForm />
      </section>
    </main>
  );
}
