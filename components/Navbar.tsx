'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/assets/img/logo.png"
          alt="KVDA Logo"
          width={40}
          height={40}
        />
        <span className="text-2xl font-bold text-blue-600">KVDA Attach</span>
      </Link>
      <div className="space-x-4">
        <Link href="/opportunities" className="text-gray-700 hover:text-blue-600">
          Opportunities
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-blue-600">
          Contact
        </Link>
        <Link href="/apply" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Apply Now
        </Link>
      </div>
    </nav>
  )
}
