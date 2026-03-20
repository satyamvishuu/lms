import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-primary-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 bg-gradient-to-br from-primary-400 to-accent-500 rounded-2xl flex items-center justify-center">
              <span className="text-white font-black text-lg">E</span>
            </div>
            <span className="text-2xl font-black">Edemy<span className="text-accent-400">.</span></span>
          </div>
          <p className="text-primary-200 text-sm leading-relaxed">
            Making learning fun and exciting for class 5–8 students. Explore, discover, and grow! 🚀
          </p>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-primary-200 text-sm font-semibold">
            <li><Link href="/"               className="hover:text-white transition-colors">🏠 Home</Link></li>
            <li><Link href="/courses"        className="hover:text-white transition-colors">📚 All Courses</Link></li>
            <li><Link href="/my-enrollments" className="hover:text-white transition-colors">🎒 My Learning</Link></li>
            <li><Link href="/educator"       className="hover:text-white transition-colors">🏫 Teach on Edemy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-lg mb-4">Connect With Us</h4>
          <div className="space-y-2 text-primary-200 text-sm font-semibold">
            <p>📧 hello@edemy.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 India</p>
          </div>
          <div className="flex gap-3 mt-4">
            {['🐦','📘','📸','▶️'].map((e, i) => (
              <button key={i} className="w-9 h-9 bg-primary-700 hover:bg-primary-600 rounded-xl flex items-center justify-center transition-colors">{e}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-primary-700 text-center py-5 text-primary-300 text-sm font-semibold">
        © {new Date().getFullYear()} Edemy. Made with ❤️ for curious minds.
      </div>
    </footer>
  );
}
