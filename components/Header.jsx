'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-lg">Alpha Video Studio</span>
        </Link>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white font-semibold hover:shadow-lg transition">
            Get Started
          </button>
        </div>
      </div>
    </header>
  )
}
