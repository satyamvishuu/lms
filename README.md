# 🎓 Edemy LMS — Next.js Edition

A full-stack Learning Management System built with **Next.js 15 App Router**, designed for **Class 5–8 students** in India. Payments powered by **Razorpay**.

---

## 🚀 Tech Stack

| Layer      | Technology                                            |
|------------|-------------------------------------------------------|
| Framework  | **Next.js 15** (App Router, Server Components)        |
| Frontend   | React 18, Tailwind CSS, Framer Motion                 |
| Backend    | **Next.js API Route Handlers** (no separate server)   |
| Database   | MongoDB + Mongoose                                    |
| Auth       | **Clerk** (`@clerk/nextjs`)                           |
| Payments   | **Razorpay** (UPI / Cards / Net Banking)              |
| Media      | Cloudinary                                            |
| Video      | YouTube embed via `react-youtube`                     |

---

## 📂 Project Structure

```
edemy-nextjs/
├── app/
│   ├── layout.jsx              # Root layout (Clerk + fonts + Toast)
│   ├── page.jsx                # Home / Landing page
│   ├── globals.css
│   │
│   ├── courses/page.jsx        # All courses list
│   ├── course/[id]/page.jsx    # Course detail + Razorpay enroll
│   ├── my-enrollments/page.jsx # Student enrolled courses
│   ├── player/[courseId]/page.jsx  # Video player + progress
│   │
│   ├── educator/
│   │   ├── layout.jsx          # Educator shell (Navbar + Sidebar)
│   │   ├── page.jsx            # Dashboard
│   │   ├── add-course/page.jsx
│   │   ├── my-courses/page.jsx
│   │   └── students-enrolled/page.jsx
│   │
│   └── api/
│       ├── clerk-webhook/route.js
│       ├── course/
│       │   ├── all/route.js
│       │   └── [id]/route.js
│       ├── educator/
│       │   ├── update-role/route.js
│       │   ├── add-course/route.js
│       │   ├── courses/route.js
│       │   ├── dashboard/route.js
│       │   └── enrolled-students/route.js
│       └── user/
│           ├── data/route.js
│           ├── enrolled-courses/route.js
│           ├── purchase/route.js       ← Creates Razorpay order
│           ├── verify-payment/route.js ← Verifies HMAC signature
│           ├── update-progress/route.js
│           ├── get-progress/route.js
│           └── add-rating/route.js
│
├── components/
│   ├── student/  Navbar, Footer, CourseCard, SearchBar
│   └── educator/ Navbar, Sidebar
│
├── context/AppContext.jsx      # Global state (client component)
├── lib/  mongodb.js, cloudinary.js, auth.js
├── models/ User, Course, Purchase, CourseProgress
├── middleware.ts               # Clerk route protection
└── .env.local                  # All secrets
```

---

## ⚙️ Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Configure `.env.local`
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...

MONGODB_URI=mongodb+srv://...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...

NEXT_PUBLIC_CURRENCY=₹
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up Clerk Webhook
In your Clerk dashboard → Webhooks → add endpoint:
```
https://yourdomain.com/api/clerk-webhook
```
Events to listen: `user.created`, `user.updated`, `user.deleted`

### 4. Run dev server
```bash
npm run dev
# App runs at http://localhost:3000
```

---

## 💳 Razorpay Flow

1. Student clicks **"Enroll Now"** on a course page
2. Next.js API (`/api/user/purchase`) creates a Razorpay Order
3. Frontend opens **Razorpay Checkout modal** (loaded via CDN script)
4. After payment, frontend posts `payment_id + signature` to `/api/user/verify-payment`
5. Backend verifies HMAC SHA-256 signature → marks purchase `completed` → enrolls student

**Test cards:** https://razorpay.com/docs/payments/payments/test-card-details/

---

## 🔑 Key Next.js Advantages Over Express Version

| Feature             | Express (prev)              | Next.js (this)                        |
|---------------------|-----------------------------|---------------------------------------|
| API Routes          | Separate server process     | Co-located in `app/api/` — one deploy |
| Auth middleware     | Custom JWT check            | `clerkMiddleware` in `middleware.ts`  |
| Routing             | React Router DOM            | File-system routing (App Router)      |
| Images              | Plain `<img>` tags          | `next/image` (optimised + lazy load)  |
| Deployment          | Two Vercel projects         | **Single Vercel project**             |
| SEO                 | Client-side only            | Server Components + `metadata` export |

---

## 🚢 Deploy to Vercel

```bash
# Just push to GitHub and import in Vercel
# Add all .env.local keys as Environment Variables in Vercel dashboard
vercel --prod
```

---

## 📄 License
MIT
