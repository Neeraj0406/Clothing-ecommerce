// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '#new-in', label: 'New In' },
  { href: '#women', label: 'Women' },
  { href: '#men', label: 'Men' },
  { href: '#accessories', label: 'Accessories' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="container sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-pink-100">
      <div className=" flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500" />
          <span className="text-xl font-semibold tracking-wide text-purple-900">
            Lumière
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-purple-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-purple-700 hover:text-purple-900"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-pink-400 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-md hover:from-pink-500 hover:to-purple-600"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-pink-50 md:hidden"
          aria-label="Toggle navigation"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav panel */}
      {open && (
        <div className="border-t border-pink-100 bg-white md:hidden">
          <nav className="space-y-1 px-4 py-3 text-sm font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-2 py-2 hover:bg-pink-50 hover:text-purple-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-pink-100 pt-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="w-1/2 rounded-full border border-purple-200 px-3 py-2 text-center text-xs font-semibold text-purple-800"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="w-1/2 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 px-3 py-2 text-center text-xs font-semibold text-white"
              >
                Sign up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
