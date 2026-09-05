import React from "react";

export default function About() {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[var(--dark-bg,#0b1413)]">
      {/* Decorative background layer */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f6fdfb 0%, #ffffff 40%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-32 -right-20 w-96 h-96 rounded-full opacity-40 dark:opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-40 -left-24 w-72 h-72 rounded-full opacity-30 dark:opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(20,184,166,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-5xl mx-auto px-6 sm:px-10">
        {/* HERO */}
        <section className="pt-20 pb-14 sm:pt-28 sm:pb-20 text-center animate-[fadeUp_0.7s_ease-out]">
          <span
            className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-teal-600 dark:text-teal-400"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            About Asad Journal
          </span>

          <h1
            className="mt-5 text-4xl sm:text-5xl md:text-6xl leading-[1.15] text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            A personal space for writing,
            <br className="hidden sm:block" /> learning, and building{" "}
            <span className="text-teal-500">in public.</span>
          </h1>

          <p
            className="mt-7 max-w-2xl mx-auto text-base sm:text-lg leading-[1.8] text-gray-500 dark:text-gray-400"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            Welcome to Asad&apos;s Blog! This blog was created by Asad as a
            personal project to share his thoughts and ideas with the world.
          </p>
        </section>

        {/* DIVIDER */}
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-teal-200 dark:via-teal-800 to-transparent"
          aria-hidden="true"
        />

        {/* CONTENT */}
        <section className="py-16 sm:py-24 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 md:gap-16">
          {/* Main column */}
          <div
            className="flex flex-col gap-8 text-base sm:text-lg leading-[1.85] text-gray-600 dark:text-gray-300"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            <p className="animate-[fadeUp_0.6s_ease-out]">
              Asad is a passionate developer who loves to write about
              technology, coding, and everything in between.
            </p>

            <p className="animate-[fadeUp_0.6s_ease-out]">
              On this blog, you&apos;ll find weekly articles and tutorials on
              topics such as web development, software engineering, and
              programming languages. Asad is always learning and exploring
              new technologies, so be sure to check back often for new
              content!
            </p>

            <p className="animate-[fadeUp_0.6s_ease-out]">
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people&apos;s comments and
              reply to them as well. We believe that a community of learners
              can help each other grow and improve.
            </p>
          </div>

          {/* Supporting card */}
          <aside className="md:pt-2">
            <div
              className="rounded-2xl border border-teal-100 dark:border-teal-900/40 bg-[#f6fdfb] dark:bg-white/5 p-7 sm:p-8 shadow-sm animate-[fadeUp_0.7s_ease-out]"
            >
              <h2
                className="text-xl sm:text-2xl text-gray-900 dark:text-gray-100 mb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                What you&apos;ll find here
              </h2>
              <ul
                className="flex flex-col gap-3 text-sm sm:text-base text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Weekly articles and tutorials on web development</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Notes on software engineering and new technologies</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 rounded-full bg-teal-500 shrink-0"
                    aria-hidden="true"
                  />
                  <span>A comment space to discuss and grow together</span>
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[fadeUp_0\\.7s_ease-out\\],
          .animate-\\[fadeUp_0\\.6s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}