import EducatorNavbar from '../../components/educator/Navbar';
import Sidebar from '../../components/educator/Sidebar';

export const metadata = { title: 'Educator Dashboard – Edemy' };

export default function EducatorLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <EducatorNavbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
