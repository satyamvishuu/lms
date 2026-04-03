'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '../../components/student/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function MyEnrollmentsPage() {
  const {
    enrolledCourses,
    fetchEnrolledCourses,
    calculateLectureCount,
    getToken,
  } = useAppContext();

  const [progressMap, setProgressMap] = useState({});

  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const token = await getToken();
        const map = {};

        for (let course of enrolledCourses) {
          try {
            const { data } = await axios.post(
              '/api/user/get-progress',
              { courseId: course._id },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (data.success) {
              map[course._id] = data.progressData;
            }
          } catch (err) {
            console.log(err.message);
          }
        }

        setProgressMap(map);
      } catch (e) {
        toast.error(e.message);
      }
    };

    if (enrolledCourses.length > 0) loadProgress();
  }, [enrolledCourses]);

  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      {/* HERO (same style as other pages) */}
      <section className="bg-gradient-to-br from-green-900 via-green-800 to-teal-700 text-white py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-5 py-2 rounded-full text-sm font-semibold mb-6">
            🎒 My Learning
          </div>

          <h1 className="text-5xl font-bold mb-4">
            Your Enrolled Courses
          </h1>

          <p className="text-green-200 text-lg">
            Keep going — you're doing amazing! 🌟
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-7xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-slate-400 mb-2">
                No courses yet!
              </h3>
              <p className="text-slate-400 mb-6">
                Start your learning journey today
              </p>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition"
              >
                🚀 Browse Courses
              </Link>
            </div>
          ) : (
            <>
              <p className="text-slate-500 font-medium mb-8">
                {enrolledCourses.length} courses enrolled
              </p>

              <div className="space-y-6">
                {enrolledCourses.map((course) => {
                  const progress = progressMap[course._id];
                  const completed = progress?.lectureCompleted?.length || 0;
                  const total = calculateLectureCount(course) || 1;
                  const percent = Math.round((completed / total) * 100);

                  return (
                    <div
                      key={course._id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg transition flex flex-col sm:flex-row gap-5"
                    >
                      {/* Image */}
                      <div className="relative w-full sm:w-44 h-28 rounded-xl overflow-hidden flex-shrink-0">
                        {course.courseThumbnail && (
                          <Image
                            src={course.courseThumbnail}
                            alt={course.courseTitle}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex flex-col flex-1 gap-2">
                        <h3 className="font-bold text-slate-900 text-lg">
                          {course.courseTitle}
                        </h3>

                        <p className="text-sm text-slate-500">
                          👨‍🏫 {course.educator?.name || 'Educator'} • 📖 {total} lessons
                        </p>

                        {/* Progress */}
                        <div className="mt-2">
                          <div className="flex justify-between text-xs text-slate-500 font-medium mb-1">
                            <span>Progress</span>
                            <span>{percent}%</span>
                          </div>

                          <Line
                            percent={percent}
                            strokeWidth={3}
                            strokeColor="#16a34a"
                            trailColor="#e2e8f0"
                          />
                        </div>
                      </div>

                      {/* Button */}
                      <div className="flex items-center justify-end">
                        <Link
                          href={`/player/${course._id}`}
                          className="bg-green-600 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-green-700 transition text-sm"
                        >
                          ▶️ Continue
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}