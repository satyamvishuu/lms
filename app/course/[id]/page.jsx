'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import Navbar from '../../../components/student/Navbar';
import Footer from '../../../components/student/Footer';

export default function CourseDetailPage() {
  const { id }     = useParams();
  const router     = useRouter();
  const { user }   = useUser();
  const {
    getToken, currency,
    calculateRating, calculateCourseDuration, calculateLectureCount, calculateDiscountedPrice,
    enrolledCourses, fetchEnrolledCourses,
  } = useAppContext();

  const [course,      setCourse]      = useState(null);
  const [loading,     setLoading]     = useState(true);
  const [paying,      setPaying]      = useState(false);
  const [openChapter, setOpenChapter] = useState(null);

  const isEnrolled = enrolledCourses.some((c) => c._id === id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/course/${id}`);
        if (data.success) setCourse(data.course);
        else toast.error(data.message);
      } catch (e) { toast.error(e.message); }
      finally { setLoading(false); }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) { toast.info('Please sign in first!'); return; }
    if (isEnrolled) { router.push(`/player/${id}`); return; }

    try {
      setPaying(true);
      const token = await getToken();
      const { data } = await axios.post('/api/user/purchase', { courseId: id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) { toast.error(data.message); return; }

      const options = {
        key:         data.keyId,
        amount:      data.order.amount,
        currency:    data.order.currency,
        name:        'Edemy Learning',
        description: course.courseTitle,
        order_id:    data.order.id,
        handler: async (response) => {
          try {
            const verify = await axios.post('/api/user/verify-payment', {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature:  response.razorpay_signature,
              purchaseId:          data.purchaseId,
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (verify.data.success) {
              toast.success('🎉 Enrolled successfully!');
              fetchEnrolledCourses();
              router.push(`/player/${id}`);
            } else toast.error(verify.data.message);
          } catch (e) { toast.error(e.message); }
        },
        prefill: { name: user.fullName, email: user.primaryEmailAddress?.emailAddress },
        theme:   { color: '#8b5cf6' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) { toast.error(e.message); }
    finally { setPaying(false); }
  };

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-5xl animate-bounce">📚</div>
      </div>
    </>
  );
  if (!course) return null;

  const rating        = calculateRating(course);
  const duration      = calculateCourseDuration(course);
  const lectureCount  = calculateLectureCount(course);
  const discountPrice = calculateDiscountedPrice(course);

  return (
    <div>
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="badge bg-white/20 text-white mb-4">📚 Course Details</div>
            <h1 className="text-3xl font-black mb-4">{course.courseTitle}</h1>
            <div
              className="text-primary-200 font-semibold text-sm mb-4 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: course.courseDescription }}
            />
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-primary-200">
              <span>⭐ {rating} rating</span>
              <span>👥 {course.enrolledStudents?.length || 0} students</span>
              <span>📖 {lectureCount} lessons</span>
              <span>⏱ {duration} min total</span>
              <span>👩‍🏫 {course.educator?.name}</span>
            </div>
          </div>

          {/* Purchase card */}
          <div className="card border-0 shadow-card-hover">
            {course.courseThumbnail && (
              <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
                <Image src={course.courseThumbnail} alt={course.courseTitle} fill className="object-cover" />
              </div>
            )}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl font-black text-primary-600">{currency}{discountPrice}</span>
              {course.discount > 0 && (
                <>
                  <span className="text-gray-400 line-through text-lg">{currency}{course.coursePrice}</span>
                  <span className="badge bg-accent-100 text-accent-600 text-xs">{course.discount}% OFF</span>
                </>
              )}
            </div>
            <button
              onClick={handleEnroll}
              disabled={paying}
              className="btn-primary w-full text-center justify-center text-base"
            >
              {paying ? '⏳ Processing...' : isEnrolled ? '▶️ Continue Learning' : '🚀 Enroll Now'}
            </button>
            <ul className="mt-4 space-y-2 text-sm text-gray-500 font-semibold">
              <li>✅ Lifetime access</li>
              <li>✅ Certificate of completion</li>
              <li>✅ Designed for Class 5–8</li>
              <li>✅ HD video quality</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Course content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-black text-primary-900 mb-6">📋 Course Content</h2>
        <div className="space-y-3">
          {course.courseContent?.map((chapter, idx) => (
            <div key={chapter.chapterId} className="border border-primary-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenChapter(openChapter === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 transition-colors font-bold text-primary-800"
              >
                <span>📘 {chapter.chapterTitle}</span>
                <span className="text-primary-400 text-lg">{openChapter === idx ? '▲' : '▼'}</span>
              </button>
              {openChapter === idx && (
                <ul className="divide-y divide-primary-50">
                  {chapter.chapterContent.map((lecture) => (
                    <li key={lecture.lectureId} className="flex items-center gap-3 p-4 text-sm text-gray-600 font-semibold">
                      <span>{lecture.isPreviewFree ? '▶️' : '🔒'}</span>
                      <span className="flex-1">{lecture.lectureTitle}</span>
                      <span className="text-gray-400">{lecture.lectureDuration} min</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
