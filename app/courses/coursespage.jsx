'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import SearchBar from '../../components/student/SearchBar';
import Footer from '../../components/student/Footer';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import { motion } from 'framer-motion';

export default function CoursesPage() {
  const { allCourses } = useAppContext();
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';

  const [filtered, setFiltered] = useState([]);
  const [classFilter, setClassFilter] = useState('All');

  const classOptions = ['All', 'Class 5', 'Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];

  useEffect(() => {
    let result = allCourses;

    // Search filter
    if (query) {
      result = result.filter(
        (c) =>
          c.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
          c.courseDescription?.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Class filter (assuming course.class exists)
    if (classFilter !== 'All') {
      result = result.filter((c) => c.class === classFilter);
    }

    setFiltered(result);
  }, [allCourses, query, classFilter]);

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* Hero Section (same style as Study Materials) */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold text-sm px-5 py-2 rounded-full mb-6">
              📚 Courses
            </div>

            <h1 className="text-5xl font-bold mb-5">
              {query ? `Results for "${query}"` : 'Explore Courses'}
            </h1>

            <p className="text-xl text-green-200 max-w-2xl mx-auto mb-6">
              Learn with structured courses designed for Class 5 to 10 students.
            </p>

            <div className="flex justify-center">
              <SearchBar defaultValue={query} />
            </div>
          </motion.div>
        </div>
      </section>


      {/* Courses Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-gray-400">No courses found</h3>
              <p className="text-gray-400 font-semibold mt-2">
                Try a different search or filter
              </p>
            </div>
          ) : (
            <>
              <p className="text-slate-500 font-medium mb-8">
                {filtered.length} courses found
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filtered.map((course, i) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <CourseCard course={course} />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}