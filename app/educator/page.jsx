'use client';

import { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';

function StatCard({ emoji, label, value, border }) {
  return (
    <div className={`card flex items-center gap-4 border-l-4 ${border}`}>
      <div className="text-4xl">{emoji}</div>
      <div>
        <p className="text-2xl font-black text-primary-900">{value}</p>
        <p className="text-sm font-semibold text-gray-400">{label}</p>
      </div>
    </div>
  );
}

export default function EducatorDashboardPage() {
  const { getToken, currency } = useAppContext();
  const [dash, setDash]        = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token  = await getToken();
        const { data } = await axios.get('/api/educator/dashboard', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (data.success) setDash(data.dashboardData);
        else toast.error(data.message);
      } catch (e) { toast.error(e.message); }
    };
    load();
  }, []);

  if (!dash) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-4xl animate-bounce">📊</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-black text-primary-900">Educator Dashboard 📊</h1>
        <p className="text-gray-400 font-semibold mt-1">Welcome back! Here's your overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard emoji="💰" label="Total Earnings"  value={`${currency}${dash.totalEarnings.toFixed(2)}`} border="border-primary-500" />
        <StatCard emoji="👥" label="Total Students"  value={dash.enrolledStudentsData.length}              border="border-accent-500" />
        <StatCard emoji="📚" label="Total Courses"   value={dash.totalCourses}                             border="border-fun-teal" />
      </div>

      <div className="card overflow-hidden p-0">
        <div className="p-5 border-b border-primary-100">
          <h2 className="font-black text-primary-800">Recent Enrollments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary-50">
              <tr>
                <th className="text-left px-5 py-3 font-black text-primary-700">#</th>
                <th className="text-left px-5 py-3 font-black text-primary-700">Student</th>
                <th className="text-left px-5 py-3 font-black text-primary-700">Course</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {dash.enrolledStudentsData.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-gray-400 font-semibold">
                    No enrollments yet 📭
                  </td>
                </tr>
              ) : dash.enrolledStudentsData.map(({ student, courseTitle }, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 text-gray-400 font-semibold">{idx + 1}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden">
                        <Image src={student.imageUrl} alt={student.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-gray-700">{student.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 font-semibold text-gray-500">{courseTitle}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
