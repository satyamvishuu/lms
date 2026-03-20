import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { AppContextProvider } from '../context/AppContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: 'Edemy – Fun Learning for Class 5-8 🎓',
  description: 'Making learning fun and exciting for Class 5–8 students in India.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          {/* Razorpay SDK */}
          <script src="https://checkout.razorpay.com/v1/checkout.js" async />
        </head>
        <body>
          <AppContextProvider>
            {children}
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              toastClassName="!rounded-2xl !font-semibold"
            />
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
