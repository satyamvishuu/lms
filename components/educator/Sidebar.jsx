'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/educator',                   label: 'Dashboard',         emoji: '📊' },
  { href: '/educator/add-course',        label: 'Add Course',        emoji: '➕' },
  { href: '/educator/my-courses',        label: 'My Courses',        emoji: '📚' },
  { href: '/educator/students-enrolled', label: 'Students Enrolled', emoji: '👨‍🎓' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 bg-white border-r border-primary-100 min-h-[calc(100vh-64px)] flex-shrink-0">
      <nav className="p-4 flex flex-col gap-1">
        {links.map(({ href, label, emoji }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm transition-all
                ${isActive
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-primary-600'
                }`}
            >
              <span className="text-lg">{emoji}</span>
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
