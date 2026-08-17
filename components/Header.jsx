'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <span className="font-bold text-lg gradient-text">Alpha Video Studio</span>
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-gray-300 hover:text-indigo-600 transition">
            Generator
          </Link>
          <Link href="/pricing" className="text-gray-300 hover:text-indigo-600 transition">
            Pricing
          </Link>
        </nav>

        <div className="flex gap-3">
          <Link href="/pricing" className="px-4 py-2 text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-600/10 transition">
            Sign In
          </Link>
          <a href="https://roseljan.gumroad.com/l/rhubwe" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-indigo-600/50 transition">
            Get Started
          </a>
        </div>
      </div>
    </header>
  )
}
