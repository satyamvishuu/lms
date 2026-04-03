'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '@/components/student/Footer';

const t = {
  en: {
    badge: 'Free Resources',
    title: 'Study Materials',
    subtitle: 'Download NCERT-aligned notes, worksheets, formula sheets and previous year papers — all free for Class 5 to 10.',
    tabAll: 'All Materials', tabNotes: 'Notes', tabWorksheets: 'Worksheets', tabFormulas: 'Formula Sheets', tabPapers: 'Previous Papers',
    download: 'Download PDF',
    preview: 'Preview',
    free: 'Free',
    pages: 'pages',
    filterLabel: 'Filter by Class:',
    all: 'All', c5: 'Class 5', c6: 'Class 6', c7: 'Class 7', c8: 'Class 8', c9: 'Class 9', c10: 'Class 10',
    tipTitle: 'How to use these materials?',
    tip1: 'Download the chapter notes before watching video lectures.',
    tip2: 'Solve worksheets after completing each chapter.',
    tip3: 'Use formula sheets during quick revision before exams.',
    tip4: 'Practice previous year papers in timed conditions.',
  },
  as: {
    badge: 'বিনামূলীয়া সম্পদ',
    title: 'অধ্যয়ন সামগ্ৰী',
    subtitle: 'NCERT-সংৰেখিত টোকা, কাৰ্যপত্ৰিকা, সূত্ৰ পত্ৰ আৰু বিগত বছৰৰ প্ৰশ্নপত্ৰ ডাউনলোড কৰক — শ্ৰেণী ৫ ৰ পৰা ৮ লৈ সকলো বিনামূলীয়া।',
    tabAll: 'সকলো সামগ্ৰী', tabNotes: 'টোকা', tabWorksheets: 'কাৰ্যপত্ৰিকা', tabFormulas: 'সূত্ৰ পত্ৰ', tabPapers: 'বিগত পৰীক্ষাপত্ৰ',
    download: 'PDF ডাউনলোড কৰক',
    preview: 'পূৰ্বদৰ্শন',
    free: 'বিনামূলীয়া',
    pages: 'পৃষ্ঠা',
    filterLabel: 'শ্ৰেণী অনুসাৰে ফিল্টাৰ কৰক:',
    all: 'সকলো', c5: 'শ্ৰেণী ৫', c6: 'শ্ৰেণী ৬', c7: 'শ্ৰেণী ৭', c8: 'শ্ৰেণী ৮',
    tipTitle: 'এই সামগ্ৰীবোৰ কেনেকৈ ব্যৱহাৰ কৰিব?',
    tip1: 'ভিডিঅ\' বক্তৃতা চোৱাৰ আগতে অধ্যায়ৰ টোকা ডাউনলোড কৰক।',
    tip2: 'প্ৰতিটো অধ্যায় সম্পূৰ্ণ কৰাৰ পিছত কাৰ্যপত্ৰিকা সমাধান কৰক।',
    tip3: 'পৰীক্ষাৰ আগতে দ্ৰুত পুনৰাবৃত্তিৰ সময়ত সূত্ৰ পত্ৰ ব্যৱহাৰ কৰক।',
    tip4: 'নিৰ্ধাৰিত সময়ত বিগত বছৰৰ প্ৰশ্নপত্ৰ অনুশীলন কৰক।',
  },
};

const materials = [
  { id: 1, title: 'Chapter-wise Maths Notes', titleAs: 'অধ্যায়-ভিত্তিক গণিত টোকা', type: 'Notes', class: 'Class 6', subject: 'Mathematics', pages: 48, icon: '📐', color: 'blue', file: '/pdfs/maths-notes.pdf' },
  { id: 2, title: 'Science Formula Sheet', titleAs: 'বিজ্ঞান সূত্ৰ পত্ৰ', type: 'Formulas', class: 'Class 7', subject: 'Science', pages: 12, icon: '🔬', color: 'green' },
  { id: 3, title: 'English Grammar Worksheet', titleAs: 'ইংৰাজী ব্যাকৰণ কাৰ্যপত্ৰিকা', type: 'Worksheets', class: 'Class 5', subject: 'English', pages: 20, icon: '📖', color: 'purple' },
  { id: 4, title: 'Social Studies Map Work', titleAs: 'সমাজ বিজ্ঞান মানচিত্ৰ কাৰ্য', type: 'Worksheets', class: 'Class 8', subject: 'Social', pages: 15, icon: '🌍', color: 'orange' },
  { id: 5, title: 'Maths Previous Year Papers', titleAs: 'গণিত বিগত বছৰৰ প্ৰশ্নপত্ৰ', type: 'Papers', class: 'Class 8', subject: 'Mathematics', pages: 60, icon: '📝', color: 'red' },
  { id: 6, title: 'Computer Science Notes', titleAs: 'কম্পিউটাৰ বিজ্ঞান টোকা', type: 'Notes', class: 'Class 7', subject: 'Computer', pages: 30, icon: '💻', color: 'cyan' },
  { id: 7, title: 'Physics Formula Cheatsheet', titleAs: 'পদাৰ্থ বিজ্ঞান সূত্ৰ প্ৰতাৰকপত্ৰ', type: 'Formulas', class: 'Class 8', subject: 'Science', pages: 8, icon: '⚡', color: 'yellow' },
  { id: 8, title: 'English Literature Notes', titleAs: 'ইংৰাজী সাহিত্য টোকা', type: 'Notes', class: 'Class 6', subject: 'English', pages: 35, icon: '📚', color: 'pink' },
];

const colorMap = {
  blue: 'bg-blue-50 border-blue-200 text-blue-600',
  green: 'bg-green-50 border-green-200 text-green-600',
  purple: 'bg-purple-50 border-purple-200 text-purple-600',
  orange: 'bg-orange-50 border-orange-200 text-orange-600',
  red: 'bg-red-50 border-red-200 text-red-600',
  cyan: 'bg-cyan-50 border-cyan-200 text-cyan-600',
  yellow: 'bg-yellow-50 border-yellow-200 text-yellow-600',
  pink: 'bg-pink-50 border-pink-200 text-pink-600',
};

export default function StudyMaterialsPage() {
  const { lang } = useLang();
  const tx = t[lang];
  const [activeTab, setActiveTab] = useState('All Materials');
  const [classFilter, setClassFilter] = useState('All');

  const tabs = [tx.tabAll, tx.tabNotes, tx.tabWorksheets, tx.tabFormulas, tx.tabPapers];
  const classFilters = [tx.all, tx.c5, tx.c6, tx.c7, tx.c8, tx.c9, tx.c10];
  const classMap = { [tx.c5]: 'Class 5', [tx.c6]: 'Class 6', [tx.c7]: 'Class 7', [tx.c8]: 'Class 8', [tx.c9]: 'Class 9', [tx.c10]: 'Class 10', };
  const typeMap = { [tx.tabNotes]: 'Notes', [tx.tabWorksheets]: 'Worksheets', [tx.tabFormulas]: 'Formulas', [tx.tabPapers]: 'Papers' };

  const filtered = materials.filter((m) => {
    const classMatch = classFilter === tx.all || m.class === classMap[classFilter];
    const typeMatch = activeTab === tx.tabAll || m.type === typeMap[activeTab];
    return classMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-5 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-yellow-400 rounded-full" />
              {tx.badge}
            </div>
            <h1 className="text-5xl font-bold mb-5">{tx.title}</h1>
            <p className="text-xl text-green-200 max-w-2xl mx-auto leading-relaxed">{tx.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-4 items-center justify-between">
          {/* Type tabs */}
          <div className="flex gap-2 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === tab
                  ? 'bg-green-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Class filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">{tx.filterLabel}</span>
            <select
  value={classFilter}
  onChange={(e) => setClassFilter(e.target.value)}
  className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
>
  {classFilters.map((f) => (
    <option key={f} value={f}>
      {f}
    </option>
  ))}
</select>
          </div>
        </div>
      </div>

      {/* Materials grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-slate-500 font-medium mb-8">
            {filtered.length} {lang === 'en' ? 'materials found' : 'সামগ্ৰী পোৱা গৈছে'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((mat, i) => (
              <motion.div
                key={mat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className={`p-5 border-b ${colorMap[mat.color]} border-2`}>
                  <div className="text-4xl mb-3">{mat.icon}</div>
                  <h3 className="font-bold text-slate-900 leading-tight">
                    {lang === 'en' ? mat.title : mat.titleAs}
                  </h3>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="text-xs font-semibold bg-white/70 text-slate-700 px-2 py-0.5 rounded-full">{mat.class}</span>
                    <span className="text-xs font-semibold bg-white/70 text-slate-700 px-2 py-0.5 rounded-full">{mat.type}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between text-sm text-slate-500 mb-4">
                    <span>{mat.pages} {tx.pages}</span>
                    <span className="font-bold text-green-600">{tx.free}</span>
                  </div>
                  {mat.file ? (
                    <a
                      href={mat.file}
                      download
                      className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-xl hover:bg-green-700 transition-colors text-sm flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      {tx.download}
                    </a>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-300 text-gray-600 font-semibold py-2.5 rounded-xl cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      Not Available
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips box */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8">
            <h3 className="font-bold text-blue-900 text-xl mb-5 flex items-center gap-2">
              💡 {tx.tipTitle}
            </h3>
            <ul className="space-y-3">
              {[tx.tip1, tx.tip2, tx.tip3, tx.tip4].map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-blue-800 font-medium">
                  <span className="mt-0.5 w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
