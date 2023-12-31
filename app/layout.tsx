import './globals.css'
import { Public_Sans } from 'next/font/google'

const public_Sans = Public_Sans({ subsets: ['latin'] })

export const metadata = {
  title: 'No Parent Emails',
  description: 'No Parent Emails | Generated by Supabase + Next',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={public_Sans.className}>
        <main className="flex flex-col items-center justify-between min-h-screen p-24">
          {children}
        </main>
      </body>
    </html>
  )
}
