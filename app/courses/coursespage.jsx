'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import SearchBar from '../../components/student/SearchBar';
import Footer from '../../components/student/Footer';
import Navbar from '../../components/student/Navbar';

export default function CoursesPage() {
  const { allCourses } = useAppContext();
  const searchParams = useSearchParams();
  const query = searchParams.get('search') || '';
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    if (query) {
      setFiltered(
        allCourses.filter(
          (c) =>
            c.courseTitle.toLowerCase().includes(query.toLowerCase()) ||
            c.courseDescription?.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFiltered(allCourses);
    }
  }, [allCourses, query]);

  return (
    <div>
      <Navbar />

      <div className="bg-gradient-to-br from-primary-50 to-white py-14 px-6 text-center">
        <span className="badge bg-primary-100 text-primary-600 mb-3">📚 All Courses</span>
        <h1 className="text-4xl font-black text-primary-900 mb-4">
          {query ? `Results for "${query}"` : 'Explore All Courses'}
        </h1>
        <p className="text-gray-500 font-semibold mb-6">
          Amazing courses designed for Class 5–8 students 🎓
        </p>
        <div className="flex justify-center">
          <SearchBar defaultValue={query} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-black text-gray-400">No courses found</h3>
            <p className="text-gray-400 font-semibold mt-2">Try a different search term</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 font-semibold mb-6">
              Showing <span className="text-primary-600 font-black">{filtered.length}</span> courses
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}