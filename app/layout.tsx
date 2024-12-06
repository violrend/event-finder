import { inter, noto_serif } from './fonts/fonts'
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import "./globals.css"
import Footer from '@/components/footer'

export const metadata = {
  title: "Event Finder App",
  description: "Find events in your city",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${noto_serif.variable}`} suppressHydrationWarning>
      <body className={noto_serif.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

