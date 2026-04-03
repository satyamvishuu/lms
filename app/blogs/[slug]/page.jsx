'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useLang } from '@/context/LangContext';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '@/components/student/Footer';

// In a real app this would come from a DB/CMS
const blogData = {
  'how-to-score-95-in-maths': {
    title:    'How to Score 95+ in Class 8 Mathematics',
    titleAs:  'শ্ৰেণী ৮ গণিতত ৯৫+ নম্বৰ কেনেকৈ পাব',
    author:   'Dr. Priya Sharma',
    date:     'March 20, 2025',
    readTime: 8,
    emoji:    '📐',
    color:    'blue',
    content: `
## Introduction
Scoring 95+ in Class 8 Maths is absolutely achievable if you follow a structured approach. This guide breaks down exactly what to do.

## 1. Master NCERT First
Every question in your board exam comes from NCERT. Do every example, every exercise, and every "Try These" section. Don't skip a single one.

## 2. Chapter Priority List
- **Highest weight:** Quadrilaterals, Data Handling, Mensuration, Algebraic Expressions
- **Medium weight:** Rational Numbers, Practical Geometry, Linear Equations
- **Lower weight:** Squares & Square Roots, Cubes & Cube Roots

## 3. The 3-Pass Method
- **Pass 1:** Read the chapter and understand concepts
- **Pass 2:** Solve NCERT exercises without looking at solutions
- **Pass 3:** Solve 10 extra questions from reference books

## 4. Time Management in Exam
- Attempt all questions you're sure about first
- Don't spend more than 4 minutes on any single question
- Always show your working — steps carry marks

## 5. Revision Strategy
Start revising 3 weeks before the exam. Revise one chapter per day. Use formula sheets for quick review the night before.
    `,
    contentAs: `
## পৰিচয়
শ্ৰেণী ৮ গণিতত ৯৫+ নম্বৰ পোৱা সম্পূৰ্ণ সম্ভৱ যদি আপুনি এটা গাঁথনিগত পদ্ধতি অনুসৰণ কৰে।

## ১. প্ৰথমে NCERT আয়ত্ত কৰক
আপোনাৰ বোৰ্ড পৰীক্ষাৰ প্ৰতিটো প্ৰশ্ন NCERT ৰ পৰা আহে। প্ৰতিটো উদাহৰণ, প্ৰতিটো অনুশীলন কৰক।

## ২. অধ্যায়ৰ অগ্ৰাধিকাৰ তালিকা
- **সৰ্বোচ্চ গুৰুত্ব:** চতুৰ্ভুজ, তথ্য হেণ্ডলিং, পৰিমিতি, বীজগাণিতিক ৰাশি
- **মধ্যম গুৰুত্ব:** যুক্তিসংগত সংখ্যা, ব্যৱহাৰিক জ্যামিতি, ৰৈখিক সমীকৰণ

## ৩. ৩-পাছ পদ্ধতি
- **পাছ ১:** অধ্যায় পঢ়ক আৰু ধাৰণাবোৰ বুজক
- **পাছ ২:** সমাধান নচাই NCERT অনুশীলন সমাধান কৰক
- **পাছ ৩:** ৰেফাৰেন্স কিতাপৰ পৰা ১০টা অতিৰিক্ত প্ৰশ্ন সমাধান কৰক

## ৪. পৰীক্ষাত সময় ব্যৱস্থাপনা
- প্ৰথমে নিশ্চিত প্ৰশ্নবোৰ কৰক
- কোনো প্ৰশ্নত ৪ মিনিটতকৈ বেছি সময় নিদিব
- সদায় আপোনাৰ কাম দেখুৱাওক — পদক্ষেপবোৰে নম্বৰ বহন কৰে
    `,
  },
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const { lang }  = useLang();
  const post = blogData[slug];

  if (!post) return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />
      <div className="max-w-3xl mx-auto px-6 py-32 text-center">
        <div className="text-6xl mb-4">📄</div>
        <h1 className="text-2xl font-bold text-slate-700">
          {lang === 'en' ? 'Article not found.' : 'প্ৰবন্ধ পোৱা নগ ল।'}
        </h1>
        <Link href="/blogs" className="mt-6 inline-block text-blue-600 font-semibold hover:underline">
          ← {lang === 'en' ? 'Back to Blog' : 'ব্লগলৈ উভতি যাওক'}
        </Link>
      </div>
      <Footer />
    </div>
  );

  const rawContent = lang === 'en' ? post.content : post.contentAs;
  // Simple markdown-style rendering
  const renderContent = (text) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-bold text-slate-900 mt-10 mb-4">{line.slice(3)}</h2>;
      if (line.startsWith('- **')) {
        const match = line.match(/\*\*(.+?)\*\*:?\s*(.*)/);
        return match ? (
          <li key={i} className="mb-2">
            <strong className="text-slate-900">{match[1]}:</strong>{' '}
            <span className="text-slate-700">{match[2]}</span>
          </li>
        ) : <li key={i} className="text-slate-700 mb-2">{line.slice(2)}</li>;
      }
      if (line.startsWith('- ')) return <li key={i} className="text-slate-700 mb-2">{line.slice(2)}</li>;
      if (line.trim() === '') return <div key={i} className="h-2" />;
      return <p key={i} className="text-slate-700 leading-relaxed mb-3">{line}</p>;
    });

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blogs" className="inline-flex items-center gap-2 text-blue-300 hover:text-white text-sm font-medium mb-8 transition-colors">
            ← {lang === 'en' ? 'Back to Blog' : 'ব্লগলৈ উভতি যাওক'}
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-6xl mb-6">{post.emoji}</div>
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              {lang === 'en' ? post.title : post.titleAs}
            </h1>
            <div className="flex items-center gap-4 text-blue-200 text-sm">
              <span className="font-semibold text-white">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} {lang === 'en' ? 'min read' : 'মিনিট পঢ়া'}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <article className="max-w-3xl mx-auto px-6 py-16">
        <div className="prose prose-slate max-w-none">
          <ul className="list-none p-0">{renderContent(rawContent)}</ul>
        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <Link href="/blogs" className="inline-flex items-center gap-2 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
            ← {lang === 'en' ? 'All Articles' : 'সকলো প্ৰবন্ধ'}
          </Link>
        </div>
      </article>

      <Footer />
    </div>
  );
}
