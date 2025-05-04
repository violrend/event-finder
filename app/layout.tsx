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
      <script type="text/javascript"> var vglnk = {key: '56f53588b18da5199d57ebb9da80688f'}; (function(d, t) {var s = d.createElement(t); s.type = 'text/javascript';s.async = true; s.src = '//cdn.viglink.com/api/vglnk.js'; var r = d.getElementsByTagName(t)[0]; r.parentNode.insertBefore(s, r); }(document, 'script')); </script>
    </html>
  );
}
