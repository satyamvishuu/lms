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
import ProfessionalNavbar from '@/components/ProfessionalNavbar';

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useUser();

  const {
    getToken, currency,
    calculateRating, calculateCourseDuration, calculateLectureCount, calculateDiscountedPrice,
    enrolledCourses, fetchEnrolledCourses,
  } = useAppContext();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [openChapter, setOpenChapter] = useState(null);

  const isEnrolled = enrolledCourses.some((c) => c._id === id);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/course/${id}`);
        if (data.success) setCourse(data.course);
        else toast.error(data.message);
      } catch (e) {
        toast.error(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!user) return toast.info('Please sign in first!');
    if (isEnrolled) return router.push(`/player/${id}`);

    try {
      setPaying(true);
      const token = await getToken();

      const { data } = await axios.post('/api/user/purchase', { courseId: id }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!data.success) return toast.error(data.message);

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.order.amount,
        currency: data.order.currency,
        name: 'Edemy Learning',
        description: course.courseTitle,
        order_id: data.order.id,
        handler: async (response) => {
          try {
            const verify = await axios.post('/api/user/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              purchaseId: data.purchaseId,
            }, { headers: { Authorization: `Bearer ${token}` } });

            if (verify.data.success) {
              toast.success('🎉 Enrolled successfully!');
              fetchEnrolledCourses();
              router.push(`/player/${id}`);
            } else {
              toast.error(verify.data.message);
            }
          } catch (e) {
            toast.error(e.message);
          }
        },
        prefill: {
          name: user.fullName,
          email: user.primaryEmailAddress?.emailAddress,
        },
        theme: { color: '#8b5cf6' },
      });

      rzp.open();

    } catch (e) {
      toast.error(e.message);
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <>
        <ProfessionalNavbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-5xl animate-bounce">📚</div>
        </div>
      </>
    );
  }

  if (!course) return null;

  const rating = calculateRating(course);
  const duration = calculateCourseDuration(course);
  const lectureCount = calculateLectureCount(course);
  const discountPrice = calculateDiscountedPrice(course);

  return (
    <div>
      <Navbar />

      <div className="bg-gradient-to-br from-primary-900 to-primary-700 text-white py-14 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 items-start">
          
          <div className="md:col-span-2">
            <h1 className="text-3xl font-black mb-4">{course.courseTitle}</h1>
            <div dangerouslySetInnerHTML={{ __html: course.courseDescription }} />
          </div>

          <div className="card">
            <span className="text-2xl font-bold">{currency}{discountPrice}</span>
            <button onClick={handleEnroll} className="btn-primary w-full mt-3">
              {paying ? 'Processing...' : isEnrolled ? 'Continue' : 'Enroll'}
            </button>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}