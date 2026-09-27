import React from "react";

export default function Projects() {
  return (
    <main className="min-h-screen bg-[var(--bg,#eafaf7)] text-[var(--text,#0f1e1e)] dark:bg-[var(--dark-bg,#0a0f0f)] dark:text-[var(--dark-text,#e8f4f3)]">
      {/* =========================================================
          HERO
      ========================================================== */}

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

        {/* Hero container */}
        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1180px]
            px-5
            pb-8
            pt-7
            sm:px-8
            sm:pb-10
            sm:pt-9
            lg:px-10
            lg:pb-12
            lg:pt-11
          "
        >
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-px w-9 bg-teal-500"
                aria-hidden="true"
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-teal-700
                  dark:text-teal-400
                  sm:text-sm
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                max-w-3xl
                text-[clamp(42px,6vw,76px)]
                font-semibold
                leading-[0.95]
                tracking-[-0.025em]
                text-gray-900
                dark:text-gray-100
              "
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
              className="
                mt-4
                max-w-2xl
                text-base
                leading-[1.7]
                text-gray-600
                dark:text-gray-400
                sm:mt-5
                sm:text-lg
              "
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

      {/* =========================================================
          PROJECT CARD
      ========================================================== */}

      <section
        className="
          relative
          mx-auto
          w-full
          max-w-[1180px]
          px-5
          pb-10
          sm:px-8
          sm:pb-14
          lg:px-10
          lg:pb-16
        "
      >
        <div
          className="
            grid
            overflow-hidden
            rounded-[24px]
            border
            border-teal-100
            bg-white
            shadow-[0_18px_60px_rgba(15,118,110,0.08)]
            dark:border-white/10
            dark:bg-[#131c1c]
            dark:shadow-none
            md:grid-cols-[1.08fr_0.92fr]
          "
        >
          {/* =====================================================
              LEFT SIDE
          ====================================================== */}

          <div
            className="
              flex
              flex-col
              justify-center
              p-6
              sm:p-8
              lg:p-10
            "
          >
            {/* Project number */}
            <span
              className="
                mb-4
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-teal-600
                dark:text-teal-400
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              01 / Learning Project
            </span>

            {/* Heading */}
            <h2
              className="
                max-w-xl
                text-[clamp(32px,4vw,48px)]
                font-semibold
                leading-[1.02]
                text-gray-900
                dark:text-gray-100
              "
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Want to learn HTML, CSS and JavaScript by building fun and
              engaging projects?
            </h2>

            {/* Description */}
            <p
              className="
                mt-4
                max-w-xl
                text-sm
                leading-[1.75]
                text-gray-600
                dark:text-gray-400
                sm:mt-5
                sm:text-base
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Check our 100 JS projects website and start building your own
              projects.
            </p>

            {/* Button */}
            <div className="mt-6">
              <a
                href="https://www.youtube.com/watch?v=G3e-cpL7ofc"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  bg-teal-600
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  !text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-teal-700
                  hover:shadow-lg
                  hover:shadow-teal-900/10
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-teal-500
                  focus-visible:outline-offset-2
                  sm:w-fit
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <span className="!text-white">
                  100 JS Projects Website
                </span>

                <span
                  className="
                    !text-white
                    transition-transform
                    duration-200
                    group-hover:translate-x-1
                  "
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </div>

          {/* =====================================================
              RIGHT SIDE VISUAL
          ====================================================== */}

          <div
            className="
              relative
              flex
              min-h-[280px]
              items-center
              justify-center
              overflow-hidden
              bg-gradient-to-br
              from-teal-50
              via-white
              to-cyan-50
              p-6
              dark:from-[#132725]
              dark:via-[#131c1c]
              dark:to-[#102426]
              sm:min-h-[330px]
              sm:p-8
              lg:min-h-[360px]
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                h-72
                w-72
                rounded-full
                bg-teal-300/20
                blur-3xl
                dark:bg-teal-400/10
              "
              aria-hidden="true"
            />

            {/* Large circle */}
            <div
              className="
                absolute
                h-56
                w-56
                rounded-full
                border
                border-teal-200/80
                dark:border-teal-400/10
                sm:h-72
                sm:w-72
              "
              aria-hidden="true"
            />

            {/* Small circle */}
            <div
              className="
                absolute
                h-40
                w-40
                rounded-full
                border
                border-teal-300/60
                dark:border-teal-400/10
                sm:h-52
                sm:w-52
              "
              aria-hidden="true"
            />

            {/* JavaScript card */}
            <div
              className="
                relative
                z-10
                flex
                h-48
                w-48
                flex-col
                items-center
                justify-center
                rounded-[26px]
                border
                border-white
                bg-white/90
                shadow-[0_20px_50px_rgba(15,118,110,0.14)]
                backdrop-blur-sm
                transition-all
                duration-500
                hover:-translate-y-1
                hover:rotate-1
                dark:border-white/10
                dark:bg-[#172222]/95
                sm:h-56
                sm:w-56
              "
            >
              {/* JS Logo */}
              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-2xl
                  bg-[#f7df1e]
                  shadow-md
                  sm:h-24
                  sm:w-24
                "
              >
                <span
                  className="
                    text-4xl
                    font-black
                    tracking-tight
                    text-black
                    sm:text-5xl
                  "
                  style={{
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  JS
                </span>
              </div>

              {/* Card text */}
              <div className="mt-4 text-center">
                <p
                  className="
                    text-base
                    font-semibold
                    text-gray-900
                    dark:text-gray-100
                  "
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  JavaScript
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500
                    dark:text-gray-400
                  "
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  100 Projects
                </p>
              </div>
            </div>

            {/* Floating code decoration */}
            <div
              className="
                absolute
                left-8
                top-8
                hidden
                rounded-lg
                border
                border-teal-100
                bg-white/70
                px-3
                py-2
                text-xs
                font-medium
                text-teal-600
                shadow-sm
                backdrop-blur-sm
                dark:border-white/10
                dark:bg-white/5
                dark:text-teal-400
                sm:block
              "
            >
              &lt;/&gt;
            </div>

            <div
              className="
                absolute
                bottom-8
                right-8
                hidden
                rounded-lg
                border
                border-teal-100
                bg-white/70
                px-3
                py-2
                text-xs
                font-medium
                text-teal-600
                shadow-sm
                backdrop-blur-sm
                dark:border-white/10
                dark:bg-white/5
                dark:text-teal-400
                sm:block
              "
            >
              JS
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}