'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import { useLang } from '@/context/LangContext';
import { useAppContext } from '@/context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const navLabels = {
  en: {
    courses: 'Online Courses',
    testSeries: 'Test Series',
    studyMaterials: 'Study Materials',
    blogs: 'Blogs',
    about: 'About',
    myLearning: 'My Learning',
    login: 'Log In',
    langCode: 'অসমীয়া',
  },
  as: {
    courses: 'অনলাইন পাঠ্যক্ৰম',
    testSeries: 'পৰীক্ষা শৃংখলা',
    studyMaterials: 'অধ্যয়ন সামগ্ৰী',
    blogs: 'ব্লগ',
    about: 'আমাৰ বিষয়ে',
    myLearning: '🎒 মোৰ শিক্ষা',
    login: 'লগইন',
    langCode: 'English',
  },
};

const navLinks = [
  { href: '/courses', key: 'courses' },
  { href: '/my-enrollments', key: 'myLearning', auth: true },
  { href: '/test-series', key: 'testSeries' },
  { href: '/study-materials', key: 'studyMaterials' },
  { href: '/blogs', key: 'blogs' },
  { href: '/about', key: 'about' },
];

export default function ProfessionalNavbar() {
  const { lang, toggle } = useLang();
  const t = navLabels[lang];
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  const { isEducator, setIsEducator, getToken } = useAppContext();
  const [open, setOpen] = useState(false);

  // Teach button logic
  const becomeEducator = async () => {
    try {
      if (isEducator) {
        router.push('/educator');
        return;
      }

      const token = await getToken();

      const { data } = await axios.post(
        '/api/educator/update-role',
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setIsEducator(true);
        toast.success('🎉 You are now an Educator!');
        router.push('/educator');
      } else {
        toast.error(data.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-3xl font-black text-blue-600 tracking-tight">
              EDEMY
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(({ href, key, auth }) => {
              if (auth && !user) return null;

              const active =
                pathname === href || pathname.startsWith(href + '/');

              return (
                <Link
                  key={href}
                  href={href}
                  className={`font-medium transition-colors border-b-2 pb-0.5 ${
                    active
                      ? 'text-blue-600 border-blue-600'
                      : 'text-slate-700 border-transparent hover:text-blue-600 hover:border-blue-300'
                  }`}
                >
                  {t[key]}
                </Link>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Language Toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:flex items-center gap-2 border-2 border-blue-600 text-blue-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-blue-600 hover:text-white transition-all"
            >
              🌐 {t.langCode}
            </motion.button>

            {/* Teach Button */}
            {user && (
              <button
                onClick={becomeEducator}
                className="hidden sm:block px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold text-sm hover:bg-blue-600 hover:text-white transition-all"
              >
                {isEducator ? 'Teach' : 'Dashboard'}
              </button>
            )}

            {/* Auth */}
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="hidden sm:block px-5 py-2.5 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-600 hover:text-white transition-all text-sm">
                  {t.login}
                </button>
              </SignInButton>
            )}

            {/* Mobile Toggle */}
            <button
              className="lg:hidden text-2xl text-slate-700"
              onClick={() => setOpen(!open)}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden py-5 border-t border-slate-200 flex flex-col gap-4">

            {navLinks.map(({ href, key, auth }) => {
              if (auth && !user) return null;

              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="text-slate-700 font-medium hover:text-blue-600"
                >
                  {t[key]}
                </Link>
              );
            })}

            {/* Language */}
            <button
              onClick={toggle}
              className="text-left text-blue-600 font-semibold"
            >
              🌐 {t.langCode}
            </button>

            {/* Teach */}
            {user && (
              <button
                onClick={becomeEducator}
                className="text-left text-blue-600 font-semibold"
              >
                {isEducator ? '🏫 Dashboard' : '✨ Teach'}
              </button>
            )}

            {/* Auth */}
            {user ? (
              <UserButton afterSignOutUrl="/" />
            ) : (
              <SignInButton mode="modal">
                <button className="text-left text-blue-600 font-semibold">
                  {t.login}
                </button>
              </SignInButton>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}