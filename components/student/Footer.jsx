import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white mt-20">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-black text-lg">E</span>
            </div>
            <span className="text-2xl font-bold">
              Edemy<span className="text-blue-500">.</span>
            </span>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
            Making learning fun and effective for students from Class 5–10. 
            Learn smarter with curated courses, study materials, and expert guidance.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-semibold text-lg mb-5 text-white">
            Quick Links
          </h4>

          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/courses" className="hover:text-white transition-colors">
                All Courses
              </Link>
            </li>
            <li>
              <Link href="/study-materials" className="hover:text-white transition-colors">
                Study Materials
              </Link>
            </li>
            <li>
              <Link href="/my-enrollments" className="hover:text-white transition-colors">
                My Learning
              </Link>
            </li>
            <li>
              <Link href="/educator" className="hover:text-white transition-colors">
                Teach on Edemy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-5 text-white">
            Connect With Us
          </h4>

          <div className="space-y-3 text-slate-400 text-sm">
            <p>📧 hello@edemy.com</p>
            <p>📞 +91 98765 43210</p>
            <p>📍 India</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-3 mt-6">
            {['🐦', '📘', '📸', '▶️'].map((icon, i) => (
              <button
                key={i}
                className="w-10 h-10 bg-slate-700 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all hover:scale-105"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 text-center py-6 text-slate-400 text-sm">
        © {new Date().getFullYear()} Edemy. Built for the next generation of learners 🚀
      </div>
    </footer>
  );
}