'use client';

import ProfessionalNavbar from '@/components/ProfessionalNavbar';
import Footer from '@/components/student/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <ProfessionalNavbar />

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Title */}
        <h1 className="text-4xl font-bold text-slate-900 mb-6">
          About Edemy
        </h1>

        {/* Intro */}
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Edemy is on a mission to make quality education accessible to every
          student across India. We focus on delivering high-quality learning
          experiences for students from Class 5 to 8, regardless of their
          background, location, or financial situation.
        </p>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Our Mission
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Our mission is to provide expert-level education to every student in
            India by bridging the gap between urban and rural learning through
            technology. We aim to make learning simple, effective, and affordable.
          </p>
        </section>

        {/* Vision */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Our Vision
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We envision a future where every child in India has equal access to
            high-quality education and opportunities, starting from the early
            stages of their academic journey.
          </p>
        </section>

        {/* Why */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Why We Built Edemy
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Millions of students in smaller cities and rural areas lack access
            to quality coaching and guidance. Edemy was built to solve this
            problem by bringing world-class education directly to students’
            homes at an affordable price.
          </p>
        </section>

        {/* Values */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Our Core Values
          </h2>
          <ul className="list-disc pl-6 text-slate-600 space-y-2">
            <li><strong>Student First:</strong> Every decision is made keeping students in mind.</li>
            <li><strong>Quality Education:</strong> No compromise on content and teaching standards.</li>
            <li><strong>Accessibility:</strong> Affordable and available for all students.</li>
            <li><strong>Outcome Driven:</strong> Focused on real results and improvement.</li>
          </ul>
        </section>

        {/* Closing */}
        <section>
          <h2 className="text-2xl font-semibold text-slate-900 mb-3">
            Join Us
          </h2>
          <p className="text-slate-600 leading-relaxed">
            We are building the future of education in India. Join Edemy and be
            a part of a learning experience designed to help students grow,
            succeed, and achieve their dreams.
          </p>
        </section>

      </div>

      <Footer />
    </div>
  );
}