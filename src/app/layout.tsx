import { ThemeProvider } from '@/components/themeProvider'
import './globals.css'
import { Inter } from 'next/font/google'
import { SearchProvider } from '@/contexts/searchContext'
import { Footer } from '@/components/layout/footer'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Star Wars Hub',
  description: 'Explore o universo Star Wars',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SearchProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="flex-grow">
              {children}
            </main>
            </NextIntlClientProvider>
            <Footer />
          </SearchProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

