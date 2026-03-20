'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import CourseCard from '../components/student/CourseCard';
import SearchBar from '../components/student/SearchBar';
import Footer from '../components/student/Footer';
import Navbar from '../components/student/Navbar';

const FloatingEmoji = ({ emoji, className }) => (
  <span className={`absolute text-3xl pointer-events-none select-none ${className}`}>{emoji}</span>
);

const subjects = [
  { emoji: '🔢', subject: 'Mathematics', color: 'bg-gradient-to-br from-primary-500 to-primary-700', desc: 'Numbers, fractions & more' },
  { emoji: '🔬', subject: 'Science',     color: 'bg-gradient-to-br from-fun-teal to-primary-500',    desc: 'Experiments & discovery' },
  { emoji: '📖', subject: 'English',     color: 'bg-gradient-to-br from-accent-500 to-accent-600',   desc: 'Grammar, reading & writing' },
  { emoji: '🌍', subject: 'Social',      color: 'bg-gradient-to-br from-fun-pink to-primary-600',    desc: 'History, Geography & civics' },
  { emoji: '💻', subject: 'Computer',    color: 'bg-gradient-to-br from-fun-blue to-primary-500',    desc: 'Coding & digital skills' },
  { emoji: '🎨', subject: 'Art & Craft', color: 'bg-gradient-to-br from-fun-yellow to-accent-500',   desc: 'Be creative every day' },
];

const testimonials = [
  { name: 'Priya Sharma',  grade: 'Class 7, Delhi',  text: 'I scored 95 in Maths after taking the course here! The videos are so easy to understand.', avatar: 'P' },
  { name: 'Arjun Patel',   grade: 'Class 6, Mumbai', text: 'Science experiments on Edemy are super fun! I now do them at home with my parents.',       avatar: 'A' },
  { name: 'Sneha Gupta',   grade: 'Class 8, Jaipur', text: 'My English writing got so much better. The teacher explains in Hindi too which helps a lot.', avatar: 'S' },
];

export default function Home() {
  const { allCourses } = useAppContext();

  return (
    <div className="overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex items-center overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-200/40 rounded-full blur-3xl" />

        <FloatingEmoji emoji="📐" className="top-24 left-16 float-anim opacity-60" />
        <FloatingEmoji emoji="🔭" className="top-32 right-24 float-anim-slow opacity-60" />
        <FloatingEmoji emoji="🧪" className="bottom-32 left-24 float-anim-reverse opacity-60" />
        <FloatingEmoji emoji="🚀" className="bottom-20 right-16 float-anim opacity-60" />
        <FloatingEmoji emoji="⭐" className="top-1/2 left-8 float-anim-slow opacity-40" />
        <FloatingEmoji emoji="🎯" className="top-16 left-1/2 float-anim opacity-40" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 font-bold text-sm px-4 py-2 rounded-full w-fit border border-primary-200">
              🎓 For Class 5 to 8 Students
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-primary-900 leading-tight">
              Learning is <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-500">
                Super Fun
              </span>{' '}
              Here! 🎉
            </h1>
            <p className="text-lg text-gray-600 font-semibold leading-relaxed">
              Join thousands of students from Class 5–8 who are acing their exams and loving every
              minute of it. Fun videos, cool quizzes, and awesome teachers — all in one place!
            </p>
            <SearchBar />
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="btn-primary text-base py-3 px-8 inline-flex items-center gap-2">
                🚀 Start Learning Free
              </Link>
              <Link href="/courses" className="btn-outline text-base py-3 px-8 inline-flex items-center gap-2">
                📚 Browse All Courses
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4 border-t border-primary-100">
              {[
                { number: '10K+', label: 'Happy Students', emoji: '😊' },
                { number: '200+', label: 'Fun Courses',    emoji: '📚' },
                { number: '50+',  label: 'Expert Teachers',emoji: '👩‍🏫' },
              ].map(({ number, label, emoji }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="text-3xl font-black text-primary-600">{number}</span>
                  <span className="text-sm font-bold text-gray-500">{label}</span>
                  <span className="text-2xl">{emoji}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              <div className="bg-white rounded-[2rem] shadow-card-hover p-8 max-w-sm border border-primary-100">
                <div className="text-center mb-4">
                  <div className="text-8xl">🧑‍🎓</div>
                  <h3 className="text-xl font-black text-primary-700 mt-2">Hi there, Superstar!</h3>
                  <p className="text-gray-500 font-semibold text-sm mt-1">Ready to ace your exams?</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Maths',   pct: 85, color: 'bg-primary-500' },
                    { label: 'Science', pct: 72, color: 'bg-fun-teal' },
                    { label: 'English', pct: 90, color: 'bg-accent-500' },
                  ].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-sm font-bold text-gray-600 mb-1">
                        <span>{label}</span><span>{pct}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1.2, delay: 0.5 }}
                          className={`h-full ${color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <span className="badge bg-fun-yellow/30 text-amber-700 text-sm">
                    🏆 Top Performer this week!
                  </span>
                </div>
              </div>

              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-accent-500 text-white rounded-2xl px-4 py-2 shadow-lg font-black text-sm"
              >
                ✅ 95 in Maths!
              </motion.div>
              <motion.div
                animate={{ y: [8, -8, 8] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-6 bg-primary-600 text-white rounded-2xl px-4 py-2 shadow-lg font-black text-sm"
              >
                🎯 New lesson unlocked
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SUBJECTS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="badge bg-primary-100 text-primary-600 mb-3">📚 Subjects</span>
          <h2 className="text-4xl font-black text-primary-900">What do you want to learn today?</h2>
          <p className="text-gray-500 font-semibold mt-3">Pick your favourite subject and start your adventure!</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {subjects.map(({ emoji, subject, color, desc }) => (
            <Link href={`/courses?search=${subject}`} key={subject}>
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                className={`${color} rounded-3xl p-5 flex flex-col items-center gap-2 cursor-pointer shadow-md hover:shadow-lg transition-shadow`}
              >
                <span className="text-4xl">{emoji}</span>
                <h4 className="font-black text-white text-lg">{subject}</h4>
                <p className="text-white/80 text-xs font-semibold text-center">{desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED COURSES ── */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="badge bg-accent-100 text-accent-600 mb-3">🔥 Popular</span>
              <h2 className="text-4xl font-black text-primary-900">Top Courses for You</h2>
              <p className="text-gray-500 font-semibold mt-2">Hand-picked by teachers just for Class 5–8 students</p>
            </div>
            <Link href="/courses" className="btn-outline text-sm py-2 px-5 hidden md:inline-flex">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allCourses.slice(0, 4).map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/courses" className="btn-primary inline-flex items-center gap-2">🚀 Explore All Courses</Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="badge bg-fun-green/20 text-green-700 mb-3">✨ Simple</span>
          <h2 className="text-4xl font-black text-primary-900">How Edemy Works</h2>
          <p className="text-gray-500 font-semibold mt-3">Just 3 easy steps to start learning!</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step:'01', emoji:'🔍', title:'Find Your Course',  desc:'Browse hundreds of fun courses made just for Class 5–8 students.', color:'bg-primary-100 text-primary-600' },
            { step:'02', emoji:'💳', title:'Easy Payment',      desc:'Pay securely with Razorpay — UPI, cards, or net banking. Super easy!', color:'bg-accent-100 text-accent-600' },
            { step:'03', emoji:'🎓', title:'Start Learning!',   desc:'Watch videos, complete exercises, and track your progress like a champion.', color:'bg-fun-green/20 text-green-700' },
          ].map(({ step, emoji, title, desc, color }) => (
            <motion.div key={step} whileHover={{ y: -5 }} className="card flex flex-col items-center text-center gap-4">
              <div className={`w-16 h-16 rounded-3xl ${color} flex items-center justify-center text-3xl font-black shadow-sm`}>{emoji}</div>
              <span className="text-xs font-black text-gray-300 tracking-widest">STEP {step}</span>
              <h3 className="text-xl font-black text-primary-800">{title}</h3>
              <p className="text-gray-500 font-semibold text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="badge bg-white/20 text-white mb-3">⭐ Reviews</span>
            <h2 className="text-4xl font-black text-white">Students Love Edemy!</h2>
            <p className="text-primary-200 font-semibold mt-3">Real stories from real students just like you</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, grade, text, avatar }) => (
              <div key={name} className="card flex flex-col gap-3">
                <p className="text-gray-600 font-semibold text-sm italic">"{text}"</p>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-500 flex items-center justify-center text-white font-black">{avatar}</div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{name}</p>
                    <p className="text-xs text-gray-400 font-semibold">{grade}</p>
                  </div>
                  <div className="ml-auto text-amber-400 text-sm">★★★★★</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-primary-500 to-accent-500 rounded-[2rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 text-9xl flex items-center justify-around select-none pointer-events-none">🎓📚🚀✨</div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4">Ready to Become a Topper? 🏆</h2>
            <p className="text-white/90 font-semibold text-lg mb-8 max-w-xl mx-auto">
              Join 10,000+ students who are already learning, growing, and scoring higher than ever before!
            </p>
            <Link href="/courses" className="inline-flex items-center gap-2 bg-white text-primary-600 font-black px-8 py-4 rounded-2xl text-lg hover:bg-primary-50 transition-colors shadow-lg">
              🚀 Start for Free Today!
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
