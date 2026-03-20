'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ defaultValue = '' }) {
  const [query, setQuery] = useState(defaultValue);
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) router.push(`/courses?search=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center bg-white rounded-2xl shadow-card border border-primary-200 overflow-hidden max-w-xl w-full">
      <span className="pl-4 text-xl">🔍</span>
      <input
        type="text"
        placeholder="Search for Maths, Science, English..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-3 text-gray-700 font-semibold outline-none bg-transparent placeholder:text-gray-400"
      />
      <button type="submit" className="m-1.5 btn-primary text-sm py-2 px-5">Search</button>
    </form>
  );
}
