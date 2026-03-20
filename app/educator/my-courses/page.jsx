'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function MyCoursesPage() {
  const { getToken, currency, calculateRating } = useAppContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('/api/educator/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setCourses(data.courses);
        else toast.error(data.message);
      } catch (e) { toast.error(e.message); }
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-900">My Courses 📚</h1>
        <p className="text-gray-400 font-semibold mt-1">All courses you've published on Edemy.</p>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="text-left px-5 py-4 font-black text-primary-700">Course</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Earnings</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Students</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Rating</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-gray-400 font-semibold">
                    <div className="text-4xl mb-2">📭</div>
                    No courses yet. Add your first course!
                  </td>
                </tr>
              ) : courses.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-14 h-10 rounded-xl overflow-hidden flex-shrink-0">
                        {course.courseThumbnail && (
                          <Image src={course.courseThumbnail} alt={course.courseTitle} fill className="object-cover" />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1">{course.courseTitle}</p>
                        <p className="text-xs text-gray-400 font-semibold mt-0.5">
                          {currency}{course.coursePrice}
                          {course.discount > 0 && (
                            <span className="ml-1 badge bg-accent-100 text-accent-600 text-xs">-{course.discount}%</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-black text-primary-600">
                    {currency}{(
                      (course.coursePrice - (course.discount * course.coursePrice) / 100) *
                      (course.enrolledStudents?.length || 0)
                    ).toFixed(0)}
                  </td>
                  <td className="px-5 py-4 font-bold text-gray-600">👥 {course.enrolledStudents?.length || 0}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 font-black">{calculateRating(course)}</span>
                      <span className="text-amber-400">★</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`badge text-xs ${course.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {course.isPublished ? '✅ Published' : '⏸ Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
