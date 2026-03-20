import Link from 'next/link';
import Image from 'next/image';
import { useAppContext } from '../../context/AppContext';

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <span key={s} className={s <= Math.round(rating) ? 'star-filled' : 'star-empty'}>★</span>
      ))}
    </div>
  );
}

export default function CourseCard({ course }) {
  const { calculateRating, calculateCourseDuration, calculateLectureCount, calculateDiscountedPrice, currency } = useAppContext();

  const rating        = calculateRating(course);
  const duration      = calculateCourseDuration(course);
  const lectureCount  = calculateLectureCount(course);
  const discountPrice = calculateDiscountedPrice(course);

  return (
    <Link href={`/course/${course._id}`} className="block group">
      <div className="card h-full flex flex-col overflow-hidden p-0 hover:-translate-y-1 transition-transform duration-200">
        <div className="relative overflow-hidden rounded-t-3xl h-44">
          {course.courseThumbnail && (
            <Image
              src={course.courseThumbnail}
              alt={course.courseTitle}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          )}
          {course.discount > 0 && (
            <span className="absolute top-3 right-3 badge bg-accent-500 text-white text-xs">
              🔥 {course.discount}% OFF
            </span>
          )}
        </div>
        <div className="p-4 flex flex-col flex-1 gap-2">
          <h3 className="font-bold text-gray-800 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {course.courseTitle}
          </h3>
          <p className="text-sm text-gray-500 font-medium">👨‍🏫 {course.educator?.name || 'Educator'}</p>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-amber-500">{rating}</span>
            <StarRating rating={rating} />
            <span className="text-gray-400">({course.courseRatings?.length || 0})</span>
          </div>
          <div className="flex gap-3 text-xs text-gray-500 font-semibold">
            <span>📖 {lectureCount} lessons</span>
            <span>⏱ {duration} min</span>
          </div>
          <div className="mt-auto pt-3 border-t border-primary-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-primary-600">{currency}{discountPrice}</span>
              {course.discount > 0 && (
                <span className="text-sm text-gray-400 line-through">{currency}{course.coursePrice}</span>
              )}
            </div>
            <span className="badge bg-primary-100 text-primary-600 text-xs">Enroll →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
