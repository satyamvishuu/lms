'use client';

import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import uniqid from 'uniqid';

export default function AddCoursePage() {
  const { getToken }  = useAppContext();
  const editorRef     = useRef(null);
  const quillRef      = useRef(null);

  const [thumbnail,   setThumbnail]   = useState(null);
  const [thumbPv,     setThumbPv]     = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [courseData,  setCourseData]  = useState({
    courseTitle: '',
    coursePrice: '',
    discount: 0,
    courseContent: [],
  });

  useEffect(() => {
    // Dynamically import Quill (client-only)
    if (typeof window !== 'undefined' && editorRef.current && !quillRef.current) {
      import('quill').then(({ default: Quill }) => {
        import('quill/dist/quill.snow.css').catch(() => {});
        quillRef.current = new Quill(editorRef.current, {
          theme: 'snow',
          placeholder: 'Describe your course here...',
        });
      });
    }
  }, []);

  const handleThumb = (e) => {
    const file = e.target.files[0];
    if (file) { setThumbnail(file); setThumbPv(URL.createObjectURL(file)); }
  };

  const addChapter = () =>
    setCourseData((p) => ({
      ...p,
      courseContent: [...p.courseContent, {
        chapterId: uniqid(), chapterTitle: '',
        chapterOrder: p.courseContent.length + 1, chapterContent: [],
      }],
    }));

  const updateChapterTitle = (chapterId, value) =>
    setCourseData((p) => ({
      ...p,
      courseContent: p.courseContent.map((ch) =>
        ch.chapterId === chapterId ? { ...ch, chapterTitle: value } : ch
      ),
    }));

  const removeChapter = (chapterId) =>
    setCourseData((p) => ({
      ...p,
      courseContent: p.courseContent.filter((ch) => ch.chapterId !== chapterId),
    }));

  const addLecture = (chapterId) =>
    setCourseData((p) => ({
      ...p,
      courseContent: p.courseContent.map((ch) =>
        ch.chapterId === chapterId
          ? { ...ch, chapterContent: [...ch.chapterContent, {
              lectureId: uniqid(), lectureTitle: '', lectureUrl: '',
              lectureDuration: 0, isPreviewFree: false,
              lectureOrder: ch.chapterContent.length + 1,
            }]}
          : ch
      ),
    }));

  const updateLecture = (chapterId, lectureId, field, value) =>
    setCourseData((p) => ({
      ...p,
      courseContent: p.courseContent.map((ch) =>
        ch.chapterId === chapterId
          ? { ...ch, chapterContent: ch.chapterContent.map((l) =>
              l.lectureId === lectureId ? { ...l, [field]: value } : l
            )}
          : ch
      ),
    }));

  const removeLecture = (chapterId, lectureId) =>
    setCourseData((p) => ({
      ...p,
      courseContent: p.courseContent.map((ch) =>
        ch.chapterId === chapterId
          ? { ...ch, chapterContent: ch.chapterContent.filter((l) => l.lectureId !== lectureId) }
          : ch
      ),
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!thumbnail)          return toast.error('Please upload a course thumbnail');
    if (!courseData.courseTitle) return toast.error('Course title is required');

    try {
      setLoading(true);
      const description = quillRef.current?.root.innerHTML || '';
      const fd = new FormData();
      fd.append('image', thumbnail);
      fd.append('courseData', JSON.stringify({ ...courseData, courseDescription: description }));

      const token = await getToken();
      const { data } = await axios.post('/api/educator/add-course', fd, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        toast.success('🎉 Course added successfully!');
        setCourseData({ courseTitle: '', coursePrice: '', discount: 0, courseContent: [] });
        setThumbnail(null); setThumbPv(null);
        quillRef.current?.setContents([]);
      } else toast.error(data.message);
    } catch (e) { toast.error(e.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-900">Add New Course ➕</h1>
        <p className="text-gray-400 font-semibold mt-1">Fill in the details to publish a new course.</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        {/* Basic info */}
        <div className="card flex flex-col gap-5">
          <h2 className="font-black text-primary-800 text-lg">📋 Basic Information</h2>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Course Title *</label>
            <input
              type="text"
              placeholder="e.g. Fun Maths for Class 6"
              value={courseData.courseTitle}
              onChange={(e) => setCourseData({ ...courseData, courseTitle: e.target.value })}
              className="w-full border-2 border-primary-200 rounded-2xl px-4 py-3 font-semibold text-gray-700 outline-none focus:border-primary-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Course Description *</label>
            <link rel="stylesheet" href="https://cdn.quilljs.com/2.0.2/quill.snow.css" />
            <div ref={editorRef} className="bg-white" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Price (₹) *</label>
              <input
                type="number" placeholder="299"
                value={courseData.coursePrice}
                onChange={(e) => setCourseData({ ...courseData, coursePrice: Number(e.target.value) })}
                className="w-full border-2 border-primary-200 rounded-2xl px-4 py-3 font-semibold text-gray-700 outline-none focus:border-primary-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-600 mb-1">Discount (%)</label>
              <input
                type="number" placeholder="0" min={0} max={100}
                value={courseData.discount}
                onChange={(e) => setCourseData({ ...courseData, discount: Number(e.target.value) })}
                className="w-full border-2 border-primary-200 rounded-2xl px-4 py-3 font-semibold text-gray-700 outline-none focus:border-primary-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Course Thumbnail *</label>
            <div className="flex items-center gap-4">
              {thumbPv && <img src={thumbPv} className="w-32 h-20 object-cover rounded-xl" alt="Preview" />}
              <label className="btn-outline text-sm py-2 px-5 cursor-pointer">
                📷 Choose Image
                <input type="file" accept="image/*" onChange={handleThumb} className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Course content */}
        <div className="card flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="font-black text-primary-800 text-lg">📚 Course Content</h2>
            <button type="button" onClick={addChapter} className="btn-outline text-sm py-2 px-4">+ Add Chapter</button>
          </div>

          {courseData.courseContent.length === 0 && (
            <p className="text-gray-400 font-semibold text-sm text-center py-4">
              No chapters yet. Click "Add Chapter" to start! 📖
            </p>
          )}

          {courseData.courseContent.map((chapter, cIdx) => (
            <div key={chapter.chapterId} className="border-2 border-primary-100 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 p-4 bg-primary-50">
                <span className="font-black text-primary-600 text-sm">Ch {cIdx + 1}</span>
                <input
                  type="text" placeholder="Chapter Title"
                  value={chapter.chapterTitle}
                  onChange={(e) => updateChapterTitle(chapter.chapterId, e.target.value)}
                  className="flex-1 bg-white border border-primary-200 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:border-primary-500"
                />
                <button type="button" onClick={() => addLecture(chapter.chapterId)} className="text-xs font-bold text-primary-600 hover:text-primary-800 px-2">+ Lecture</button>
                <button type="button" onClick={() => removeChapter(chapter.chapterId)} className="text-xs font-bold text-red-400 hover:text-red-600 px-2">✕</button>
              </div>

              <div className="divide-y divide-primary-50">
                {chapter.chapterContent.map((lecture, lIdx) => (
                  <div key={lecture.lectureId} className="p-4 flex flex-col sm:flex-row gap-3">
                    <span className="text-xs font-black text-gray-400 pt-1">{lIdx + 1}.</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input type="text" placeholder="Lecture Title"
                        value={lecture.lectureTitle}
                        onChange={(e) => updateLecture(chapter.chapterId, lecture.lectureId, 'lectureTitle', e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:border-primary-400"
                      />
                      <input type="text" placeholder="YouTube URL"
                        value={lecture.lectureUrl}
                        onChange={(e) => updateLecture(chapter.chapterId, lecture.lectureId, 'lectureUrl', e.target.value)}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:border-primary-400"
                      />
                      <input type="number" placeholder="Duration (min)"
                        value={lecture.lectureDuration || ''}
                        onChange={(e) => updateLecture(chapter.chapterId, lecture.lectureId, 'lectureDuration', Number(e.target.value))}
                        className="border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:border-primary-400"
                      />
                      <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lecture.isPreviewFree}
                          onChange={(e) => updateLecture(chapter.chapterId, lecture.lectureId, 'isPreviewFree', e.target.checked)}
                          className="accent-primary-500 w-4 h-4"
                        />
                        Free Preview
                      </label>
                    </div>
                    <button type="button" onClick={() => removeLecture(chapter.chapterId, lecture.lectureId)} className="text-red-400 hover:text-red-600 font-bold text-sm">✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button type="submit" disabled={loading} className="btn-primary text-base py-4">
          {loading ? '⏳ Publishing...' : '🚀 Publish Course'}
        </button>
      </form>
    </div>
  );
}
