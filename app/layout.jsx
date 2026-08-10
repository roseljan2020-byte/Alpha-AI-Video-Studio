import './globals.css'

export const metadata = {
  title: 'Alpha AI Video Studio - Turn Text to Video',
  description: 'Create stunning AI-powered videos from text prompts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-dark text-gray-100">
        {children}
      </body>
    </html>
  )
}
