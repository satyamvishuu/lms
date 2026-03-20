'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import YouTube from 'react-youtube';
import { Line } from 'rc-progress';

export default function PlayerPage() {
  const { courseId } = useParams();
  const { getToken, calculateLectureCount } = useAppContext();

  const [course,          setCourse]          = useState(null);
  const [currentLecture,  setCurrentLecture]  = useState(null);
  const [progressData,    setProgressData]    = useState(null);
  const [openChapter,     setOpenChapter]     = useState(0);
  const [rating,          setRating]          = useState(0);

  const loadCourse = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`/api/course/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setCourse(data.course);
        const first = data.course.courseContent?.[0]?.chapterContent?.[0];
        if (first) setCurrentLecture(first);
      }
    } catch (e) { toast.error(e.message); }
  };

  const loadProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post('/api/user/get-progress', { courseId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setProgressData(data.progressData);
    } catch (e) { console.error(e); }
  };

  useEffect(() => { loadCourse(); loadProgress(); }, [courseId]);

  const markComplete = async (lectureId) => {
    try {
      const token = await getToken();
      await axios.post('/api/user/update-progress', { courseId, lectureId }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('✅ Lesson marked complete!');
      loadProgress();
    } catch (e) { toast.error(e.message); }
  };

  const submitRating = async () => {
    if (!rating) return toast.info('Please select a rating first');
    try {
      const token = await getToken();
      const { data } = await axios.post('/api/user/add-rating', { courseId, rating }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      data.success ? toast.success('⭐ Rating submitted!') : toast.error(data.message);
    } catch (e) { toast.error(e.message); }
  };

  const isCompleted  = (lectureId) => progressData?.lectureCompleted?.includes(lectureId) ?? false;
  const completedCnt = progressData?.lectureCompleted?.length ?? 0;
  const totalLectures= course ? calculateLectureCount(course) : 1;
  const progressPct  = Math.round((completedCnt / totalLectures) * 100);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const m = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/);
    return m ? m[1] : null;
  };

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-5xl animate-bounce">▶️</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ── Sidebar ── */}
      <aside className="w-full md:w-80 bg-white border-r border-primary-100 flex flex-col md:min-h-screen">
        {/* Header */}
        <div className="p-5 border-b border-primary-100">
          <h2 className="font-black text-primary-800 text-sm line-clamp-2 mb-2">{course.courseTitle}</h2>
          <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
            <span>Your Progress</span><span>{progressPct}%</span>
          </div>
          <Line percent={progressPct} strokeWidth={4} strokeColor="#8b5cf6" trailColor="#ddd6fe" />
          <p className="text-xs text-gray-400 font-semibold mt-1">
            {completedCnt}/{totalLectures} lessons done 🎯
          </p>
        </div>

        {/* Chapters */}
        <div className="flex-1 overflow-y-auto">
          {course.courseContent?.map((chapter, cIdx) => (
            <div key={chapter.chapterId}>
              <button
                onClick={() => setOpenChapter(openChapter === cIdx ? null : cIdx)}
                className="w-full flex items-center justify-between p-4 bg-primary-50 hover:bg-primary-100 transition-colors text-sm font-bold text-primary-700 sticky top-0"
              >
                <span className="truncate">📘 {chapter.chapterTitle}</span>
                <span className="ml-2 flex-shrink-0">{openChapter === cIdx ? '▲' : '▼'}</span>
              </button>

              {openChapter === cIdx && chapter.chapterContent.map((lecture) => (
                <button
                  key={lecture.lectureId}
                  onClick={() => setCurrentLecture(lecture)}
                  className={`w-full text-left flex items-center gap-3 px-5 py-3 text-sm font-semibold transition-colors
                    ${currentLecture?.lectureId === lecture.lectureId
                      ? 'bg-primary-100 text-primary-700'
                      : 'hover:bg-gray-50 text-gray-600'
                    }`}
                >
                  <span className="flex-shrink-0">{isCompleted(lecture.lectureId) ? '✅' : '▶️'}</span>
                  <span className="flex-1 truncate">{lecture.lectureTitle}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{lecture.lectureDuration}m</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col">
        {/* Video */}
        <div className="bg-black">
          {currentLecture && getYoutubeId(currentLecture.lectureUrl) ? (
            <YouTube
              videoId={getYoutubeId(currentLecture.lectureUrl)}
              opts={{ width: '100%', playerVars: { autoplay: 1 } }}
              className="w-full aspect-video"
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center text-white text-4xl">
              🎬 Select a lesson to watch
            </div>
          )}
        </div>

        {/* Lecture info */}
        {currentLecture && (
          <div className="p-6 flex flex-col gap-4 max-w-3xl">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-black text-primary-900">{currentLecture.lectureTitle}</h2>
              <button
                onClick={() => markComplete(currentLecture.lectureId)}
                disabled={isCompleted(currentLecture.lectureId)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-colors
                  ${isCompleted(currentLecture.lectureId)
                    ? 'bg-green-100 text-green-600 cursor-default'
                    : 'btn-primary'
                  }`}
              >
                {isCompleted(currentLecture.lectureId) ? '✅ Completed' : 'Mark Complete'}
              </button>
            </div>

            {/* Rating */}
            <div className="card mt-2">
              <h4 className="font-black text-gray-700 mb-3">Rate this course ⭐</h4>
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className={`text-2xl transition-transform hover:scale-125 ${s <= rating ? 'text-amber-400' : 'text-gray-200'}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <button onClick={submitRating} className="btn-outline text-sm py-2 px-5">Submit Rating</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
