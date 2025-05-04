import { inter, noto_serif } from './fonts/fonts';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import './globals.css';
import Footer from '@/components/footer';

export const metadata = {
  title: 'Event Finder App',
  description: 'Find events in your city',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} ${noto_serif.variable}`}
      suppressHydrationWarning
    >
      <body className={`min-h-screen flex flex-col ${inter.className}`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem={true}
          disableTransitionOnChange
        >
          <Header />
          <main className='flex-grow'>{children}</main>
          <Footer />
        </ThemeProvider>

        
      </body>
    </html>
  );
}
