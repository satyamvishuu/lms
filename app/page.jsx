'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/student/CourseCard';
import SearchBar from '../components/student/SearchBar';
import Footer from '../components/student/Footer';
import { useUser, UserButton, SignInButton } from '@clerk/nextjs';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';

// Language translations
const translations = {
  en: {
    langCode: 'EN',
    langName: 'English',
    // Navbar
    navOnlineCourses: 'Online Courses',
    navTestSeries: 'Test Series',
    navStudyMaterials: 'Study Materials',
    navBlogs: 'Blogs',
    navAbout: 'About',
    navLogin: 'Login',

    // Hero Section
    heroBadge: 'For Class 5 to 10 Students',
    heroTitle1: 'India\'s Leading',
    heroTitle2: 'Online Learning Platform',
    heroSubtitle: 'Trusted by 10,000+ students across India. Expert faculty, comprehensive curriculum, and proven results for Class 5 to 10.',
    searchPlaceholder: 'Search for courses...',
    btnStartLearning: 'Start Learning',
    btnExploreCourses: 'Explore Courses',

    // Stats
    statStudents: 'Students',
    statCourses: 'Courses',
    statTeachers: 'Expert Teachers',

    // Subjects
    subjectsTag: 'Subjects',
    subjectsTitle: 'Comprehensive Course Coverage',
    subjectsSubtitle: 'Choose from our expertly designed curriculum',
    mathematics: 'Mathematics',
    mathDesc: 'Complete NCERT & Advanced',
    science: 'Science',
    scienceDesc: 'Physics, Chemistry & Biology',
    english: 'English',
    englishDesc: 'Grammar & Literature',
    social: 'Social Studies',
    socialDesc: 'History, Geography & Civics',
    computer: 'Computer Science',
    computerDesc: 'Coding & Digital Literacy',
    art: 'Art & Craft',
    artDesc: 'Creative Skills Development',

    // Featured Courses
    featuredTag: 'Popular Courses',
    featuredTitle: 'Top Rated Programs',
    featuredSubtitle: 'Join thousands of successful students',
    viewAll: 'View All',
    exploreAll: 'Explore All Courses',

    // How it Works
    howTag: 'How It Works',
    howTitle: 'Your Learning Journey',
    howSubtitle: 'Three simple steps to academic excellence',
    step01Title: 'Select Your Course',
    step01Desc: 'Browse our comprehensive course catalog designed for CBSE/State Board curriculum.',
    step02Title: 'Secure Enrollment',
    step02Desc: 'Complete payment securely through Razorpay - UPI, cards, or net banking.',
    step03Title: 'Begin Learning',
    step03Desc: 'Access video lectures, study materials, and track your progress with detailed analytics.',

    // CTA
    ctaTitle: 'Ready to Excel in Your Academics?',
    ctaSubtitle: 'Join India\'s fastest-growing online learning platform for classes 5-10',
    ctaButton: 'Get Started Free',

    // Features
    feature1: 'Live Classes',
    feature2: 'Recorded Lectures',
    feature3: 'Doubt Resolution',
    feature4: 'Test Series',
  },
  as: {
    langCode: 'AS',
    langName: 'অসমীয়া',
    // Navbar
    navOnlineCourses: 'অনলাইন পাঠ্যক্ৰম',
    navTestSeries: 'পৰীক্ষা শৃংখলা',
    navStudyMaterials: 'অধ্যয়ন সামগ্ৰী',
    navBlogs: 'ব্লগ',
    navAbout: 'আমাৰ বিষয়ে',
    navLogin: 'লগইন',

    // Hero Section
    heroBadge: 'শ্ৰেণী ৫ ৰ পৰা ১০ লৈ ছাত্ৰ-ছাত্ৰীৰ বাবে',
    heroTitle1: 'ভাৰতৰ আগশাৰীৰ',
    heroTitle2: 'অনলাইন শিক্ষা মঞ্চ',
    heroSubtitle: 'সমগ্ৰ ভাৰতৰ ১০,০০০+ ছাত্ৰ-ছাত্ৰীয়ে বিশ্বাস কৰে। বিশেষজ্ঞ শিক্ষক, সম্পূৰ্ণ পাঠ্যক্ৰম আৰু শ্ৰেণী ৫ ৰ পৰা ১০ লৈ প্ৰমাণিত ফলাফল।',
    searchPlaceholder: 'পাঠ্যক্ৰম সন্ধান কৰক...',
    btnStartLearning: 'শিক্ষা আৰম্ভ কৰক',
    btnExploreCourses: 'পাঠ্যক্ৰম অন্বেষণ কৰক',

    // Stats
    statStudents: 'ছাত্ৰ-ছাত্ৰী',
    statCourses: 'পাঠ্যক্ৰম',
    statTeachers: 'বিশেষজ্ঞ শিক্ষক',

    // Subjects
    subjectsTag: 'বিষয়সমূহ',
    subjectsTitle: 'সম্পূৰ্ণ পাঠ্যক্ৰম সামৰণি',
    subjectsSubtitle: 'আমাৰ বিশেষজ্ঞভাৱে ডিজাইন কৰা পাঠ্যক্ৰমৰ পৰা বাছনি কৰক',
    mathematics: 'গণিত',
    mathDesc: 'সম্পূৰ্ণ NCERT আৰু উন্নত',
    science: 'বিজ্ঞান',
    scienceDesc: 'পদাৰ্থ বিজ্ঞান, ৰসায়ন আৰু জীৱবিজ্ঞান',
    english: 'ইংৰাজী',
    englishDesc: 'ব্যাকৰণ আৰু সাহিত্য',
    social: 'সমাজ বিজ্ঞান',
    socialDesc: 'ইতিহাস, ভূগোল আৰু নাগৰিকতা',
    computer: 'কম্পিউটাৰ বিজ্ঞান',
    computerDesc: 'কোডিং আৰু ডিজিটেল সাক্ষৰতা',
    art: 'কলা আৰু শিল্প',
    artDesc: 'সৃজনশীল দক্ষতা বিকাশ',

    // Featured Courses
    featuredTag: 'জনপ্ৰিয় পাঠ্যক্ৰম',
    featuredTitle: 'শীৰ্ষ ৰেটিং প্ৰগ্ৰেম',
    featuredSubtitle: 'হাজাৰ হাজাৰ সফল ছাত্ৰ-ছাত্ৰীৰ সৈতে যোগদান কৰক',
    viewAll: 'সকলো চাওক',
    exploreAll: 'সকলো পাঠ্যক্ৰম অন্বেষণ কৰক',

    // How it Works
    howTag: 'ই কেনেকৈ কাম কৰে',
    howTitle: 'আপোনাৰ শিক্ষা যাত্ৰা',
    howSubtitle: 'শৈক্ষিক উৎকৰ্ষতাৰ বাবে তিনিটা সহজ পদক্ষেপ',
    step01Title: 'আপোনাৰ পাঠ্যক্ৰম নিৰ্বাচন কৰক',
    step01Desc: 'CBSE/ৰাজ্য পৰিষদ পাঠ্যক্ৰমৰ বাবে ডিজাইন কৰা আমাৰ সম্পূৰ্ণ পাঠ্যক্ৰম তালিকা ব্ৰাউজ কৰক।',
    step02Title: 'সুৰক্ষিত পঞ্জীয়ন',
    step02Desc: 'Razorpay ৰ জৰিয়তে সুৰক্ষিতভাৱে পৰিশোধ সম্পূৰ্ণ কৰক - UPI, কাৰ্ড বা নেট বেংকিং।',
    step03Title: 'শিক্ষা আৰম্ভ কৰক',
    step03Desc: 'ভিডিঅ\' বক্তৃতা, অধ্যয়ন সামগ্ৰী প্ৰৱেশ কৰক আৰু বিশদ বিশ্লেষণৰ সৈতে আপোনাৰ অগ্ৰগতি ট্ৰেক কৰক।',

    // CTA
    ctaTitle: 'আপোনাৰ শৈক্ষিক ক্ষেত্ৰত উৎকৰ্ষ সাধনৰ বাবে প্ৰস্তুত?',
    ctaSubtitle: 'শ্ৰেণী ৫-১০ ৰ বাবে ভাৰতৰ দ্ৰুততম বৃদ্ধি পোৱা অনলাইন শিক্ষা মঞ্চত যোগদান কৰক',
    ctaButton: 'বিনামূলীয়া আৰম্ভ কৰক',

    // Features
    feature1: 'লাইভ ক্লাছ',
    feature2: 'ৰেকৰ্ড কৰা বক্তৃতা',
    feature3: 'সন্দেহ সমাধান',
    feature4: 'পৰীক্ষা শৃংখলা',
  }
};

const subjects = [
  { id: 'math', nameEn: 'Mathematics', nameAs: 'গণিত', emoji: '📐' },
  { id: 'science', nameEn: 'Science', nameAs: 'বিজ্ঞান', emoji: '🔬' },
  { id: 'english', nameEn: 'English', nameAs: 'ইংৰাজী', emoji: '📖' },
  { id: 'social', nameEn: 'Social Studies', nameAs: 'সমাজ বিজ্ঞান', emoji: '🌍' },
  { id: 'computer', nameEn: 'Computer Science', nameAs: 'কম্পিউটাৰ বিজ্ঞান', emoji: '💻' },
  { id: 'art', nameEn: 'Art & Craft', nameAs: 'কলা আৰু শিল্প', emoji: '🎨' },
];

export default function Home() {
  const { allCourses } = useAppContext();
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const toggleLanguage = () => {
    setLang(lang === 'en' ? 'as' : 'en');
  };

  // Professional Navbar Component
  <ProfessionalNavbar />

  return (
    <div className="overflow-x-hidden bg-white">

      <ProfessionalNavbar />

      {/* ── HERO SECTION ── Professional & Clean */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-24 pb-20 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-full">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                {t.heroBadge}
              </div>

              {/* Main Heading */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4">
                  {t.heroTitle1}
                  <br />
                  <span className="text-blue-600">{t.heroTitle2}</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                  {t.heroSubtitle}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
                >
                  {t.btnStartLearning}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 font-semibold px-8 py-4 rounded-lg border-2 border-slate-200 hover:border-blue-600 hover:text-blue-600 transition-colors"
                >
                  {t.btnExploreCourses}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200">
                {[
                  { number: '10,000+', label: t.statStudents },
                  { number: '200+', label: t.statCourses },
                  { number: '50+', label: t.statTeachers },
                ].map(({ number, label }) => (
                  <div key={label}>
                    <div className="text-3xl font-bold text-slate-900">{number}</div>
                    <div className="text-sm text-slate-600 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Professional Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="text-sm text-slate-500 font-medium">Your Dashboard</div>
                    <div className="text-2xl font-bold text-slate-900 mt-1">Performance Overview</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    A+
                  </div>
                </div>

                {/* Progress Bars */}
                <div className="space-y-5">
                  {[
                    { label: 'Mathematics', pct: 92, color: 'bg-blue-600' },
                    { label: 'Science', pct: 88, color: 'bg-green-600' },
                    { label: 'English', pct: 95, color: 'bg-purple-600' },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold text-slate-700">{label}</span>
                        <span className="text-sm font-bold text-slate-900">{pct}%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-full ${color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Achievement Badges */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-medium mb-3">Recent Achievements</div>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gradient-to-br from-yellow-100 to-orange-100 border border-yellow-200 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🏆</div>
                      <div className="text-xs font-semibold text-slate-700">Top 10%</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-blue-100 to-cyan-100 border border-blue-200 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">⭐</div>
                      <div className="text-xs font-semibold text-slate-700">95+ Score</div>
                    </div>
                    <div className="flex-1 bg-gradient-to-br from-green-100 to-emerald-100 border border-green-200 rounded-lg p-3 text-center">
                      <div className="text-2xl mb-1">🎯</div>
                      <div className="text-xs font-semibold text-slate-700">30 Day Streak</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Achievement Cards */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl px-4 py-3 shadow-xl font-semibold text-sm"
              >
                ✓ 100% Attendance
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-xl px-4 py-3 shadow-xl font-semibold text-sm"
              >
                🔥 7 Day Streak
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SUBJECTS SECTION ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-blue-50 text-blue-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
              {t.subjectsTag}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.subjectsTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.subjectsSubtitle}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {subjects.map(({ id, emoji, nameEn, nameAs }) => (
              <Link href={`/courses?search=${lang === 'en' ? nameEn : nameAs}`} key={id}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white border-2 border-blue-600 rounded-xl p-6 cursor-pointer shadow-sm hover:shadow-md transition-all group"
                >
                  <div className="text-center">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{emoji}</div>
                    <h4 className="font-bold text-slate-800 text-base">{lang === 'en' ? nameEn : nameAs}</h4>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="inline-block bg-orange-50 text-orange-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
                {t.featuredTag}
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-2">{t.featuredTitle}</h2>
              <p className="text-lg text-slate-600">{t.featuredSubtitle}</p>
            </div>
            <Link
              href="/courses"
              className="hidden md:inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
            >
              {t.viewAll}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCourses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              {t.exploreAll}
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block bg-green-50 text-green-600 font-semibold text-sm px-4 py-2 rounded-full mb-4">
              {t.howTag}
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">{t.howTitle}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{t.howSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: t.step01Title, desc: t.step01Desc, icon: '🎯', color: 'from-blue-500 to-cyan-600' },
              { step: '02', title: t.step02Title, desc: t.step02Desc, icon: '🔒', color: 'from-purple-500 to-pink-600' },
              { step: '03', title: t.step03Title, desc: t.step03Desc, icon: '🚀', color: 'from-orange-500 to-red-600' },
            ].map(({ step, title, desc, icon, color }) => (
              <motion.div
                key={step}
                whileHover={{ y: -8 }}
                className="relative bg-white rounded-2xl p-8 shadow-lg border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className={`absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                  {icon}
                </div>
                <div className="mt-8">
                  <div className="text-xs font-bold text-slate-400 tracking-widest mb-3">STEP {step}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t.ctaTitle}</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                {t.ctaSubtitle}
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold px-10 py-5 rounded-xl text-lg hover:bg-blue-50 transition-colors shadow-2xl"
              >
                {t.ctaButton}
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}