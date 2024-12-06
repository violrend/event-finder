import { Inter, Noto_Serif } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const noto_serif = Noto_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-noto-serif',
});
