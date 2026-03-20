'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '../../../context/AppContext';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function StudentsEnrolledPage() {
  const { getToken }       = useAppContext();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get('/api/educator/enrolled-students', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setStudents(data.enrolledStudents);
        else toast.error(data.message);
      } catch (e) { toast.error(e.message); }
    };
    load();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-primary-900">Students Enrolled 👨‍🎓</h1>
        <p className="text-gray-400 font-semibold mt-1">All students who enrolled in your courses.</p>
      </div>

      <div className="card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="text-left px-5 py-4 font-black text-primary-700">#</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Student</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Email</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Course</th>
                <th className="text-left px-5 py-4 font-black text-primary-700">Enrolled On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-16 text-center text-gray-400 font-semibold">
                    <div className="text-4xl mb-2">📭</div>
                    No students enrolled yet.
                  </td>
                </tr>
              ) : students.map(({ student, courseTitle, purchaseDate }, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4 text-gray-400 font-semibold">{idx + 1}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                        {student?.imageUrl && (
                          <Image src={student.imageUrl} alt={student.name} fill className="object-cover" />
                        )}
                      </div>
                      <span className="font-bold text-gray-700">{student?.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-500 font-semibold">{student?.email}</td>
                  <td className="px-5 py-4 font-semibold text-gray-600">{courseTitle}</td>
                  <td className="px-5 py-4 text-gray-400 font-semibold">
                    {purchaseDate ? new Date(purchaseDate).toLocaleDateString('en-IN') : '—'}
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
