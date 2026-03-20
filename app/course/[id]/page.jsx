import { Suspense } from 'react';
import CourseDetailPage from './coursedetailpage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading course...</div>}>
      <CourseDetailPage />
    </Suspense>
  );
}