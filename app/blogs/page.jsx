'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '@/components/student/Footer';

const t = {
  en: {
    badge:    'Insights & Tips',
    title:    'Learning Blog',
    subtitle: 'Expert study tips, exam strategies, and subject guides to help Class 5–8 students excel.',
    search:   'Search articles...',
    readMore: 'Read Article',
    minRead:  'min read',
    categories: ['All', 'Study Tips', 'Exam Strategy', 'Subject Guide', 'Parent Corner', 'Success Stories'],
    featured: 'Featured',
  },
  as: {
    badge:    'অন্তৰ্দৃষ্টি আৰু টিপছ',
    title:    'শিক্ষণ ব্লগ',
    subtitle: 'শ্ৰেণী ৫-৮ৰ ছাত্ৰ-ছাত্ৰীসকলক উৎকৃষ্ট হ\'বত সহায় কৰিবলৈ বিশেষজ্ঞ অধ্যয়ন টিপছ, পৰীক্ষা কৌশল আৰু বিষয় নিৰ্দেশিকা।',
    search:   'প্ৰবন্ধ সন্ধান কৰক...',
    readMore: 'প্ৰবন্ধ পঢ়ক',
    minRead:  'মিনিট পঢ়া',
    categories: ['সকলো', 'অধ্যয়ন টিপছ', 'পৰীক্ষা কৌশল', 'বিষয় নিৰ্দেশিকা', 'অভিভাৱক কোণ', 'সাফল্যৰ কাহিনী'],
    featured: 'বৈশিষ্ট্য',
  },
};

const blogs = [
  {
    slug: 'how-to-score-95-in-maths',
    title: 'How to Score 95+ in Class 8 Mathematics',
    titleAs: 'শ্ৰেণী ৮ গণিতত ৯৫+ নম্বৰ কেনেকৈ পাব',
    excerpt: 'A complete chapter-by-chapter strategy used by top scorers. Includes time management tips and must-do NCERT exercises.',
    excerptAs: 'শীৰ্ষ স্কোৰাৰসকলে ব্যৱহাৰ কৰা সম্পূৰ্ণ অধ্যায়-ভিত্তিক কৌশল। সময় ব্যৱস্থাপনা টিপছ আৰু অত্যাৱশ্যকীয় NCERT অনুশীলন অন্তৰ্ভুক্ত।',
    category: 'Exam Strategy', categoryAs: 'পৰীক্ষা কৌশল',
    author: 'Dr. Priya Sharma', date: 'March 20, 2025', readTime: 8,
    featured: true, emoji: '📐', color: 'blue',
  },
  {
    slug: 'science-experiment-tips',
    title: 'Top 10 Science Experiments Every Class 6 Student Must Know',
    titleAs: 'প্ৰতিটো শ্ৰেণী ৬ৰ ছাত্ৰই জানিব লগা শীৰ্ষ ১০ বিজ্ঞান পৰীক্ষা',
    excerpt: 'Simple home experiments that make complex concepts easy to understand and remember.',
    excerptAs: 'সহজ ঘৰুৱা পৰীক্ষা যি জটিল ধাৰণাবোৰ বুজিবলৈ আৰু মনত ৰাখিবলৈ সহজ কৰে।',
    category: 'Subject Guide', categoryAs: 'বিষয় নিৰ্দেশিকা',
    author: 'Ramesh Kumar', date: 'March 15, 2025', readTime: 6,
    featured: false, emoji: '🔬', color: 'green',
  },
  {
    slug: 'study-schedule-class-7',
    title: 'The Perfect Daily Study Schedule for Class 7 Students',
    titleAs: 'শ্ৰেণী ৭ৰ ছাত্ৰ-ছাত্ৰীৰ বাবে নিখুঁত দৈনিক অধ্যয়ন সময়সূচী',
    excerpt: 'A practical 4-hour study plan that covers all subjects without burnout. Backed by education research.',
    excerptAs: 'বাৰ্নআউট অবিহনে সকলো বিষয় সামৰা এটা ব্যৱহাৰিক ৪-ঘণ্টাৰ অধ্যয়ন পৰিকল্পনা।',
    category: 'Study Tips', categoryAs: 'অধ্যয়ন টিপছ',
    author: 'Anita Singh', date: 'March 10, 2025', readTime: 5,
    featured: false, emoji: '📅', color: 'purple',
  },
  {
    slug: 'english-grammar-hacks',
    title: 'English Grammar Hacks That Actually Work for Class 5',
    titleAs: 'ইংৰাজী ব্যাকৰণ হেক যি শ্ৰেণী ৫ৰ বাবে আচলতে কাম কৰে',
    excerpt: 'Memory tricks, mnemonics, and practice patterns that make grammar rules stick forever.',
    excerptAs: 'স্মৃতি কৌশল আৰু অনুশীলনৰ আৰ্হি যি ব্যাকৰণৰ নিয়মবোৰ চিৰকাললৈ মনত ৰাখে।',
    category: 'Subject Guide', categoryAs: 'বিষয় নিৰ্দেশিকা',
    author: 'Meena Patel', date: 'March 5, 2025', readTime: 7,
    featured: false, emoji: '✍️', color: 'orange',
  },
  {
    slug: 'parent-guide-online-learning',
    title: 'Parents\' Complete Guide to Supporting Online Learning',
    titleAs: 'অনলাইন শিক্ষাত সহায় কৰাৰ অভিভাৱকৰ সম্পূৰ্ণ নিৰ্দেশিকা',
    excerpt: 'How to create the right environment, monitor progress, and keep your child motivated at home.',
    excerptAs: 'কেনেকৈ সঠিক পৰিৱেশ সৃষ্টি কৰিব, অগ্ৰগতি নিৰীক্ষণ কৰিব আৰু আপোনাৰ সন্তানক প্ৰেৰণা দিব।',
    category: 'Parent Corner', categoryAs: 'অভিভাৱক কোণ',
    author: 'Sunita Verma', date: 'Feb 28, 2025', readTime: 10,
    featured: false, emoji: '👨‍👩‍👧', color: 'pink',
  },
  {
    slug: 'from-60-to-95-success-story',
    title: 'From 60% to 95%: Arjun\'s Journey with Edemy',
    titleAs: '৬০% ৰ পৰা ৯৫% লৈ: Edemy-ৰ সৈতে অৰ্জুনৰ যাত্ৰা',
    excerpt: 'Real story of how a Class 7 student improved dramatically in just 3 months using Edemy\'s structured approach.',
    excerptAs: 'কেনেকৈ এজন শ্ৰেণী ৭ৰ ছাত্ৰই মাত্ৰ ৩ মাহত নাটকীয়ভাৱে উন্নতি কৰিলে তাৰ প্ৰকৃত কাহিনী।',
    category: 'Success Stories', categoryAs: 'সাফল্যৰ কাহিনী',
    author: 'Edemy Team', date: 'Feb 20, 2025', readTime: 4,
    featured: false, emoji: '🏆', color: 'yellow',
  },
];

const colorMap = {
  blue:   { light: 'bg-blue-50',   text: 'text-blue-600',   badge: 'bg-blue-100 text-blue-700' },
  green:  { light: 'bg-green-50',  text: 'text-green-600',  badge: 'bg-green-100 text-green-700' },
  purple: { light: 'bg-purple-50', text: 'text-purple-600', badge: 'bg-purple-100 text-purple-700' },
  orange: { light: 'bg-orange-50', text: 'text-orange-600', badge: 'bg-orange-100 text-orange-700' },
  pink:   { light: 'bg-pink-50',   text: 'text-pink-600',   badge: 'bg-pink-100 text-pink-700' },
  yellow: { light: 'bg-yellow-50', text: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-700' },
};

export default function BlogsPage() {
  const { lang } = useLang();
  const tx = t[lang];
  const [activeCategory, setActiveCategory] = useState(tx.categories[0]);
  const [search, setSearch] = useState('');

  const filtered = blogs.filter((b) => {
    const catMatch = activeCategory === tx.categories[0] ||
      (lang === 'en' ? b.category : b.categoryAs) === activeCategory;
    const searchMatch = search === '' ||
      (lang === 'en' ? b.title : b.titleAs).toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const featuredBlog = blogs.find((b) => b.featured);

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-5 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-orange-400 rounded-full" />
              {tx.badge}
            </div>
            <h1 className="text-5xl font-bold mb-5">{tx.title}</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">{tx.subtitle}</p>
            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <input
                type="text"
                placeholder={tx.search}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-4 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 outline-none focus:bg-white/20 transition-colors font-medium"
              />
              <svg className="w-5 h-5 text-white/50 absolute right-4 top-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {tx.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-lg font-semibold text-sm transition-all flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Featured post */}
        {featuredBlog && activeCategory === tx.categories[0] && !search && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-14"
          >
            <div className="relative bg-gradient-to-br from-blue-900 to-blue-700 rounded-3xl overflow-hidden text-white">
              <div className="absolute top-0 right-0 text-[180px] opacity-10 leading-none">
                {featuredBlog.emoji}
              </div>
              <div className="relative z-10 p-10 md:p-14 max-w-2xl">
                <span className="inline-block bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                  ⭐ {tx.featured}
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {lang === 'en' ? featuredBlog.title : featuredBlog.titleAs}
                </h2>
                <p className="text-blue-200 mb-8 leading-relaxed">
                  {lang === 'en' ? featuredBlog.excerpt : featuredBlog.excerptAs}
                </p>
                <div className="flex items-center gap-6">
                  <Link
                    href={`/blogs/${featuredBlog.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
                  >
                    {tx.readMore}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <span className="text-blue-200 text-sm">{featuredBlog.readTime} {tx.minRead}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.filter((b) => !b.featured || activeCategory !== tx.categories[0] || search).map((blog, i) => {
            const c = colorMap[blog.color];
            return (
              <motion.article
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                {/* Card top */}
                <div className={`${c.light} h-40 flex items-center justify-center text-7xl`}>
                  {blog.emoji}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${c.badge}`}>
                      {lang === 'en' ? blog.category : blog.categoryAs}
                    </span>
                    <span className="text-xs text-slate-400">{blog.readTime} {tx.minRead}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight mb-2 line-clamp-2">
                    {lang === 'en' ? blog.title : blog.titleAs}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-5">
                    {lang === 'en' ? blog.excerpt : blog.excerptAs}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{blog.author}</div>
                      <div className="text-xs text-slate-400">{blog.date}</div>
                    </div>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className={`text-sm font-bold ${c.text} hover:underline flex items-center gap-1`}
                    >
                      {tx.readMore} →
                    </Link>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-slate-400 font-semibold text-lg">
              {lang === 'en' ? 'No articles found. Try a different search.' : 'কোনো প্ৰবন্ধ পোৱা নগ ল। বেলেগ সন্ধান চেষ্টা কৰক।'}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
