import './globals.css'

export const metadata = {
  title: 'Math 209 Notes',
  description: 'Course notes for Math 209',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
