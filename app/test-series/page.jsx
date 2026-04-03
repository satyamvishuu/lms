'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '@/components/student/Footer';

const t = {
  en: {
    badge: 'Exam Preparation',
    title: 'Test Series',
    subtitle: 'Practice with real exam-pattern questions. Track your performance, identify weak areas, and boost your score.',
    filterAll: 'All Classes',
    filter5: 'Class 5',
    filter6: 'Class 6',
    filter7: 'Class 7',
    filter8: 'Class 8',
    questions: 'Questions',
    duration: 'Duration',
    mins: 'mins',
    free: 'Free',
    premium: 'Premium',
    startBtn: 'Download Test',
    learnMore: 'View Details',
    whyTitle: 'Why Our Test Series?',
    w1t: 'NCERT Aligned', w1d: 'Every question mapped to CBSE/NCERT syllabus for Class 5–8.',
    w2t: 'Instant Results', w2d: 'Get detailed score analysis with chapter-wise breakdown immediately.',
    w3t: 'Adaptive Difficulty', w3d: 'Questions adjust to your level — from easy warm-ups to exam-level challenges.',
    w4t: 'Progress Tracking', w4d: 'Track improvement over time with performance graphs and rank comparisons.',
    ctaTitle: 'Ready to Test Your Knowledge?',
    ctaSub: 'Join 10,000+ students who practice daily and score higher.',
    ctaBtn: 'Start Free Test',
  },
  as: {
    badge: 'পৰীক্ষাৰ প্ৰস্তুতি',
    title: 'পৰীক্ষা শৃংখলা',
    subtitle: 'প্ৰকৃত পৰীক্ষাৰ আৰ্হিৰ প্ৰশ্নেৰে অনুশীলন কৰক। আপোনাৰ প্ৰদৰ্শন ট্ৰেক কৰক, দুৰ্বল ক্ষেত্ৰ চিহ্নিত কৰক আৰু আপোনাৰ নম্বৰ বৃদ্ধি কৰক।',
    filterAll: 'সকলো শ্ৰেণী',
    filter5: 'শ্ৰেণী ৫',
    filter6: 'শ্ৰেণী ৬',
    filter7: 'শ্ৰেণী ৭',
    filter8: 'শ্ৰেণী ৮',
    questions: 'প্ৰশ্ন',
    duration: 'সময়সীমা',
    mins: 'মিনিট',
    free: 'বিনামূলীয়া',
    premium: 'প্ৰিমিয়াম',
    startBtn: 'ডাউনলোড পৰীক্ষা',
    learnMore: 'বিৱৰণ চাওক',
    whyTitle: 'আমাৰ পৰীক্ষা শৃংখলা কিয়?',
    w1t: 'NCERT সংৰেখিত', w1d: 'প্ৰতিটো প্ৰশ্ন শ্ৰেণী ৫-৮ ৰ CBSE/NCERT পাঠ্যক্ৰমৰ সৈতে মেপ কৰা।',
    w2t: 'তাৎক্ষণিক ফলাফল', w2d: 'অধ্যায়-ভিত্তিক বিভাজনৰ সৈতে তৎক্ষণাৎ বিশদ নম্বৰ বিশ্লেষণ পাওক।',
    w3t: 'অভিযোজিত কঠিনতা', w3d: 'প্ৰশ্নবোৰ আপোনাৰ স্তৰ অনুযায়ী সামঞ্জস্য হয়।',
    w4t: 'অগ্ৰগতি ট্ৰেকিং', w4d: 'পৰিৱেষ্টন গ্ৰাফ আৰু ৰেংক তুলনাৰ সৈতে সময়ৰ সৈতে উন্নতি ট্ৰেক কৰক।',
    ctaTitle: 'আপোনাৰ জ্ঞান পৰীক্ষা কৰিবলৈ সাজু?',
    ctaSub: '১০,০০০+ ছাত্ৰ-ছাত্ৰীৰ সৈতে যোগ দিয়ক যি প্ৰতিদিন অনুশীলন কৰে।',
    ctaBtn: 'বিনামূলীয়া পৰীক্ষা আৰম্ভ কৰক',
  },
};

const tests = [
  { id: 1, title: 'Mathematics Full Test', titleAs: 'গণিত সম্পূৰ্ণ পৰীক্ষা', class: 'Class 6', questions: 40, duration: 60, subject: 'Maths', free: true, color: 'blue', icon: '📐', file: '/tests/maths-full-test.pdf' },
  { id: 2, title: 'Science Chapter Test', titleAs: 'বিজ্ঞান অধ্যায় পৰীক্ষা', class: 'Class 7', questions: 30, duration: 45, subject: 'Science', free: true, color: 'green', icon: '🔬' },
  { id: 3, title: 'English Grammar Test', titleAs: 'ইংৰাজী ব্যাকৰণ পৰীক্ষা', class: 'Class 5', questions: 25, duration: 30, subject: 'English', free: false, color: 'purple', icon: '📖' },
  { id: 4, title: 'Social Studies Mock Test', titleAs: 'সমাজ বিজ্ঞান মক পৰীক্ষা', class: 'Class 8', questions: 50, duration: 75, subject: 'Social', free: false, color: 'orange', icon: '🌍' },
  { id: 5, title: 'Computer Science Test', titleAs: 'কম্পিউটাৰ বিজ্ঞান পৰীক্ষা', class: 'Class 7', questions: 30, duration: 40, subject: 'CS', free: true, color: 'cyan', icon: '💻' },
  { id: 6, title: 'Annual Practice Paper', titleAs: 'বাৰ্ষিক অনুশীলন পত্ৰ', class: 'Class 8', questions: 80, duration: 120, subject: 'All', free: false, color: 'red', icon: '📝' },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-600' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600', badge: 'bg-green-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600', badge: 'bg-purple-600' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', badge: 'bg-orange-600' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-100 text-cyan-600', badge: 'bg-cyan-600' },
  red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100 text-red-600', badge: 'bg-red-600' },
};

export default function TestSeriesPage() {
  const { lang } = useLang();
  const tx = t[lang];

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-5 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              {tx.badge}
            </div>
            <h1 className="text-5xl font-bold mb-5">{tx.title}</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto leading-relaxed">{tx.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}

      {/* Test Cards */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test, i) => {
              const c = colorMap[test.color];
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className={`bg-white rounded-2xl border-2 ${c.border} overflow-hidden shadow-sm hover:shadow-lg transition-all`}
                >
                  <div className={`${c.bg} px-6 py-5 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center text-2xl`}>
                        {test.icon}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-base">
                          {lang === 'en' ? test.title : test.titleAs}
                        </div>
                        <div className="text-sm text-slate-500 font-medium">{test.class} • {test.subject}</div>
                      </div>
                    </div>
                    <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${test.free ? 'bg-green-500' : 'bg-slate-700'}`}>
                      {test.free ? tx.free : tx.premium}
                    </span>
                  </div>
                  <div className="px-6 py-5">
                    <div className="flex gap-6 text-sm text-slate-600 mb-5">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                        <span><strong>{test.questions}</strong> {tx.questions}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <span><strong>{test.duration}</strong> {tx.mins}</span>
                      </div>
                    </div>
                    {test.file ? (
                      <a
                        href={test.file}
                        download
                        className={`w-full ${c.badge} text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity text-center block`}
                      >
                        {tx.startBtn}
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full bg-gray-300 text-gray-600 font-semibold py-3 rounded-xl cursor-not-allowed"
                      >
                        Not Available
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-slate-900 text-center mb-14">{tx.whyTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { emoji: '📚', title: tx.w1t, desc: tx.w1d, bg: 'bg-blue-50 border-blue-200' },
              { emoji: '⚡', title: tx.w2t, desc: tx.w2d, bg: 'bg-yellow-50 border-yellow-200' },
              { emoji: '🎯', title: tx.w3t, desc: tx.w3d, bg: 'bg-green-50 border-green-200' },
              { emoji: '📊', title: tx.w4t, desc: tx.w4d, bg: 'bg-purple-50 border-purple-200' },
            ].map(({ emoji, title, desc, bg }) => (
              <div key={title} className={`rounded-2xl border-2 ${bg} p-7`}>
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-700 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">{tx.ctaTitle}</h2>
          <p className="text-blue-200 mb-8">{tx.ctaSub}</p>
          <Link href="/courses" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-xl">
            {tx.ctaBtn}
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
