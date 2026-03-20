'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();

export function AppContextProvider({ children }) {
  const currency     = process.env.NEXT_PUBLIC_CURRENCY || '₹';
  const { getToken } = useAuth();
  const { user }     = useUser();

  const [allCourses,      setAllCourses]      = useState([]);
  const [isEducator,      setIsEducator]      = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [userData,        setUserData]        = useState(null);

  // Returns auth headers - attach to every protected API call
  const authHeaders = async () => {
    try {
      const token = await getToken();
      return token ? { Authorization: `Bearer ${token}` } : {};
    } catch {
      return {};
    }
  };

  const fetchAllCourses = async () => {
    try {
      const { data } = await axios.get('/api/course/all');
      if (data.success) setAllCourses(data.courses);
      else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const fetchUserData = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get('/api/user/data', { headers: await authHeaders() });
      if (data.success) {
        setUserData(data.user);
        if (data.user.role === 'educator') setIsEducator(true);
      }
    } catch (e) { toast.error(e.message); }
  };

  const fetchEnrolledCourses = async () => {
    if (!user) return;
    try {
      const { data } = await axios.get('/api/user/enrolled-courses', { headers: await authHeaders() });
      if (data.success) setEnrolledCourses(data.enrolledCourses);
      else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const calculateRating = (course) => {
    if (!course.courseRatings?.length) return 0;
    const sum = course.courseRatings.reduce((a, r) => a + r.rating, 0);
    return (sum / course.courseRatings.length).toFixed(1);
  };

  const calculateCourseDuration = (course) => {
    let total = 0;
    course.courseContent?.forEach((ch) =>
      ch.chapterContent?.forEach((l) => (total += l.lectureDuration))
    );
    return total;
  };

  const calculateLectureCount = (course) => {
    let count = 0;
    course.courseContent?.forEach((ch) => (count += ch.chapterContent?.length || 0));
    return count;
  };

  const calculateDiscountedPrice = (course) => {
    if (!course.discount) return course.coursePrice;
    return (course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2);
  };

  useEffect(() => { fetchAllCourses(); }, []);
  useEffect(() => {
    if (user) { fetchUserData(); fetchEnrolledCourses(); }
  }, [user]);

  return (
    <AppContext.Provider value={{
      currency, allCourses, setAllCourses,
      isEducator, setIsEducator,
      enrolledCourses, fetchEnrolledCourses,
      userData, setUserData, fetchUserData,
      getToken, authHeaders,
      calculateRating, calculateCourseDuration,
      calculateLectureCount, calculateDiscountedPrice,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);