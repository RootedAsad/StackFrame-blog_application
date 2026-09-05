import React from "react";

export default function Projects() {
  return (
    <main className="min-h-screen bg-[var(--bg,#eafaf7)] text-[var(--text,#0f1e1e)] dark:bg-[var(--dark-bg,#0a0f0f)] dark:text-[var(--dark-text,#e8f4f3)]">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative background */}
        <div
          className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full opacity-40 blur-3xl dark:opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(20,184,166,0.22) 0%, rgba(6,182,212,0) 70%)",
          }}
          aria-hidden="true"
        />

        <div
          className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full opacity-30 blur-3xl dark:opacity-10"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.18) 0%, rgba(20,184,166,0) 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative mx-auto w-full max-w-[1180px] px-6 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-10 lg:pb-20 lg:pt-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-px w-9 bg-teal-500"
                aria-hidden="true"
              />

              <span
                className="text-xs font-semibold uppercase tracking-[0.16em] text-teal-700 dark:text-teal-400"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h1
              className="max-w-3xl text-[clamp(42px,6vw,76px)] font-semibold leading-[0.95] tracking-[-0.025em] text-gray-900 dark:text-gray-100"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Projects worth
              <span className="block text-teal-600 dark:text-teal-400">
                building.
              </span>
            </h1>

            {/* Description */}
            <p
              className="mt-6 max-w-2xl text-base leading-[1.75] text-gray-600 dark:text-gray-400 sm:text-lg"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Build fun and engaging projects while learning HTML, CSS, and
              JavaScript.
            </p>
          </div>
        </div>
      </section>

      {/* Main project / resource section */}
      <section className="relative mx-auto w-full max-w-[1180px] px-6 pb-16 sm:px-8 sm:pb-20 lg:px-10 lg:pb-24">
        <div className="grid overflow-hidden rounded-[24px] border border-teal-100 bg-white shadow-[0_18px_60px_rgba(15,118,110,0.08)] dark:border-white/10 dark:bg-[#131c1c] dark:shadow-none md:grid-cols-[1.05fr_0.95fr]">
          {/* Content */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            {/* Project number */}
            <span
              className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-teal-600 dark:text-teal-400"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              01 / Learning Project
            </span>

            <h2
              className="max-w-xl text-[clamp(32px,4vw,48px)] font-semibold leading-[1.02] text-gray-900 dark:text-gray-100"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Want to learn HTML, CSS and JavaScript by building fun and
              engaging projects?
            </h2>

            <p
              className="mt-5 max-w-xl text-sm leading-[1.8] text-gray-600 dark:text-gray-400 sm:text-base"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Check our 100 js projects website and start building your own
              projects.
            </p>

            {/* Existing link preserved */}
            <div className="mt-7">
              <a
                href="https://www.youtube.com/watch?v=G3e-cpL7ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-teal-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-900/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 sm:w-auto"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <span>100 JS Projects Website</span>

                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Existing image preserved */}
          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 via-white to-cyan-50 p-8 dark:from-[#132725] dark:via-[#131c1c] dark:to-[#102426] sm:min-h-[360px] lg:min-h-[430px]">
            {/* Decorative circle */}
            <div
              className="absolute h-64 w-64 rounded-full border border-teal-200/70 dark:border-teal-400/10 sm:h-80 sm:w-80"
              aria-hidden="true"
            />

            <div
              className="absolute h-44 w-44 rounded-full border border-teal-300/50 dark:border-teal-400/10 sm:h-56 sm:w-56"
              aria-hidden="true"
            />

            <div
              className="relative z-10 flex h-52 w-52 items-center justify-center rounded-[28px] border border-white/80 bg-white/80 p-7 shadow-[0_20px_50px_rgba(15,118,110,0.12)] backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 hover:rotate-1 dark:border-white/10 dark:bg-white/5 sm:h-64 sm:w-64"
            >
              <img
                src="data:image/png;base64,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"
                alt="JavaScript project learning visual"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}