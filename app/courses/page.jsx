import { Suspense } from 'react';
import CoursesPage from './coursespage';

export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading courses...</div>}>
      <CoursesPage />
    </Suspense>
  );
}