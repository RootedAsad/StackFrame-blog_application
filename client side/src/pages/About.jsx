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
        className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full opacity-30 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(20,184,166,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-5xl px-6 sm:px-10">
        {/* HERO */}
        <section className="animate-[fadeUp_0.7s_ease-out] pb-14 pt-20 text-center sm:pb-20 sm:pt-28">
          <span
            className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400 sm:text-sm"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            About STACKFRAME
          </span>

          <h1
            className="mt-5 text-4xl leading-[1.15] text-gray-900 dark:text-gray-100 sm:text-5xl md:text-6xl"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            A personal space for writing,
            <br className="hidden sm:block" /> learning, and building{" "}
            <span className="text-teal-500">in public.</span>
          </h1>

          <p
            className="mx-auto mt-7 max-w-2xl text-base leading-[1.8] text-gray-500 dark:text-gray-400 sm:text-lg"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Welcome to STACKFRAME! This blog was created as a personal
            project to share thoughts, ideas, and knowledge about technology
            and web development.
          </p>
        </section>

        {/* DIVIDER */}
        <div
          className="h-px w-full bg-gradient-to-r from-transparent via-teal-200 to-transparent dark:via-teal-800"
          aria-hidden="true"
        />

        {/* CONTENT */}
        <section className="grid grid-cols-1 gap-12 py-16 sm:py-24 md:grid-cols-[1.4fr_1fr] md:gap-16">
          {/* Main column */}
          <div
            className="flex flex-col gap-8 text-base leading-[1.85] text-gray-600 dark:text-gray-300 sm:text-lg"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            <p className="animate-[fadeUp_0.6s_ease-out]">
              STACKFRAME is a technology-focused journal created for sharing
              ideas, learning experiences, and practical knowledge about
              modern web development.
            </p>

            <p className="animate-[fadeUp_0.6s_ease-out]">
              On this blog, you&apos;ll find articles and tutorials covering
              topics such as web development, software engineering,
              JavaScript, React.js, Next.js, Node.js, and other modern
              technologies.
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
            <div className="animate-[fadeUp_0.7s_ease-out] rounded-2xl border border-teal-100 bg-[#f6fdfb] p-7 shadow-sm dark:border-teal-900/40 dark:bg-white/5 sm:p-8">
              <h2
                className="mb-4 text-xl text-gray-900 dark:text-gray-100 sm:text-2xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                What you&apos;ll find here
              </h2>

              <ul
                className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400 sm:text-base"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                    aria-hidden="true"
                  />
                  <span>
                    Articles and tutorials on modern web development
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                    aria-hidden="true"
                  />
                  <span>
                    Notes on software engineering and new technologies
                  </span>
                </li>

                <li className="flex items-start gap-2.5">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                    aria-hidden="true"
                  />
                  <span>
                    A comment space to discuss and grow together
                  </span>
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