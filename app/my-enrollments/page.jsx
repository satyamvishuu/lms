'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Navbar from '../../components/student/Navbar';
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

  // Load enrolled courses
  useEffect(() => {
    fetchEnrolledCourses();
  }, []);

  // Load progress for each course
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
            console.log("Progress error:", err.message);
          }
        }

        setProgressMap(map);
      } catch (e) {
        toast.error(e.message);
      }
    };

    if (enrolledCourses.length > 0) {
      loadProgress();
    }
  }, [enrolledCourses]);

  return (
    <div>
      <Navbar />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-14 px-6 text-center">
        <span className="badge bg-primary-100 text-primary-600 mb-3">
          🎒 My Learning
        </span>
        <h1 className="text-4xl font-black text-primary-900 mb-2">
          My Enrolled Courses
        </h1>
        <p className="text-gray-500 font-semibold">
          Keep going — you're doing amazing! 🌟
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-7xl mb-4">📭</div>
            <h3 className="text-xl font-black text-gray-400 mb-2">
              No courses yet!
            </h3>
            <p className="text-gray-400 font-semibold mb-6">
              Start your learning journey today
            </p>
            <Link href="/courses" className="btn-primary">
              🚀 Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {enrolledCourses.map((course) => {
              // 🔹 Calculate progress
              const progress = progressMap[course._id];
              const completed =
                progress?.lectureCompleted?.length || 0;
              const total = calculateLectureCount(course) || 1;

              const percent = Math.round((completed / total) * 100);

              return (
                <div
                  key={course._id}
                  className="card flex flex-col sm:flex-row gap-5 p-5"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-40 h-28 rounded-2xl overflow-hidden flex-shrink-0">
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
                    <h3 className="font-black text-primary-800 text-lg">
                      {course.courseTitle}
                    </h3>

                    <p className="text-gray-400 text-sm font-semibold">
                      👨‍🏫 {course.educator?.name || 'Educator'} &nbsp;•&nbsp;
                      📖 {total} lessons
                    </p>

                    {/* Progress */}
                    <div className="mt-1">
                      <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{percent}%</span>
                      </div>

                      <Line
                        percent={percent}
                        strokeWidth={3}
                        strokeColor="#8b5cf6"
                        trailColor="#ddd6fe"
                      />
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col items-end justify-center flex-shrink-0">
                    <Link
                      href={`/player/${course._id}`}
                      className="btn-primary text-sm py-2 px-5"
                    >
                      ▶️ Continue
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}