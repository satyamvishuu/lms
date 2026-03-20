'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { useAppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user }  = useUser();
  const router    = useRouter();
  const { isEducator, setIsEducator, authHeaders } = useAppContext();
  const [open, setOpen] = useState(false);

  const becomeEducator = async () => {
    try {
      if (isEducator) { router.push('/educator'); return; }
      const { data } = await axios.post('/api/educator/update-role');
      if (data.success) {
        setIsEducator(true);
        toast.success('🎉 You are now an Educator!');
        router.push('/educator');
      } else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-fun">
              <span className="text-white text-lg font-black">E</span>
            </div>
            <span className="text-2xl font-black text-primary-700 group-hover:text-primary-500 transition-colors">
              Edemy<span className="text-accent-500">.</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/courses" className="text-gray-600 font-semibold hover:text-primary-600 transition-colors">
              📚 Courses
            </Link>
            {user && (
              <Link href="/my-enrollments" className="text-gray-600 font-semibold hover:text-primary-600 transition-colors">
                🎒 My Learning
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <button onClick={becomeEducator} className="btn-outline text-sm py-2 px-4">
                  {isEducator ? '🏫 Dashboard' : '✨ Teach'}
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary text-sm py-2 px-5">🚀 Get Started</button>
              </SignInButton>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-primary-600 text-2xl" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-primary-100 flex flex-col gap-4 pb-5">
            <Link href="/courses" onClick={() => setOpen(false)} className="text-gray-600 font-semibold hover:text-primary-600">📚 Courses</Link>
            {user && (
              <Link href="/my-enrollments" onClick={() => setOpen(false)} className="text-gray-600 font-semibold hover:text-primary-600">🎒 My Learning</Link>
            )}
            {user ? (
              <div className="flex items-center gap-4">
                <button onClick={becomeEducator} className="btn-outline text-sm py-2 px-4">
                  {isEducator ? '🏫 Dashboard' : '✨ Teach'}
                </button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button className="btn-primary text-sm">🚀 Get Started</button>
              </SignInButton>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}