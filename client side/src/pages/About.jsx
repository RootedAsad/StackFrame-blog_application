import React from "react";

export default function About() {
  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[var(--dark-bg,#0b1413)]">
      {/* ========================================================= */}
      {/* DECORATIVE BACKGROUND                                     */}
      {/* ========================================================= */}

      {/* Light mode background */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f6fdfb 0%, #ffffff 40%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />

      {/* Top-right glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full opacity-40 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Left-side glow */}
      <div
        className="pointer-events-none absolute -left-24 top-40 h-72 w-72 rounded-full opacity-30 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.2) 0%, rgba(20,184,166,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* ========================================================= */}
      {/* MAIN CONTAINER                                             */}
      {/* ========================================================= */}

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        {/* ======================================================= */}
        {/* HERO                                                      */}
        {/* ======================================================= */}

        <section
          className="
            animate-[fadeUp_0.7s_ease-out]
            pb-12
            pt-8
            text-center
            sm:pb-16
            sm:pt-10
            md:pb-20
          "
        >
          {/* Eyebrow */}
          <span
            className="
              inline-block
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-teal-600
              dark:text-teal-400
              sm:text-sm
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            About STACKFRAME
          </span>

          {/* Main heading */}
          <h1
            className="
              mt-5
              text-4xl
              leading-[1.15]
              text-gray-900
              dark:text-gray-100
              sm:text-5xl
              md:text-6xl
            "
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            A personal space for writing,
            <br className="hidden sm:block" />
            learning, and building{" "}
            <span className="text-teal-500">in public.</span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-[1.8]
              text-gray-500
              dark:text-gray-400
              sm:mt-7
              sm:text-lg
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Welcome to STACKFRAME! This blog was created as a personal
            project to share thoughts, ideas, and knowledge about technology
            and web development.
          </p>
        </section>

        {/* ======================================================= */}
        {/* DIVIDER                                                   */}
        {/* ======================================================= */}

        <div
          className="
            h-px
            w-full
            bg-gradient-to-r
            from-transparent
            via-teal-200
            to-transparent
            dark:via-teal-800
          "
          aria-hidden="true"
        />

        {/* ======================================================= */}
        {/* CONTENT                                                    */}
        {/* ======================================================= */}

        <section
          className="
            grid
            grid-cols-1
            gap-10
            py-14
            sm:gap-12
            sm:py-20
            md:grid-cols-[1.4fr_1fr]
            md:gap-16
            md:py-20
          "
        >
          {/* ===================================================== */}
          {/* MAIN COLUMN                                             */}
          {/* ===================================================== */}

          <div
            className="
              flex
              flex-col
              gap-7
              text-base
              leading-[1.85]
              text-gray-600
              dark:text-gray-300
              sm:gap-8
              sm:text-lg
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {/* Paragraph 1 */}
            <p className="animate-[fadeUp_0.6s_ease-out]">
              STACKFRAME is a technology-focused journal created for sharing
              ideas, learning experiences, and practical knowledge about
              modern web development.
            </p>

            {/* Paragraph 2 */}
            <p className="animate-[fadeUp_0.6s_ease-out]">
              On this blog, you&apos;ll find articles and tutorials covering
              topics such as web development, software engineering,
              JavaScript, React.js, Next.js, Node.js, and other modern
              technologies.
            </p>

            {/* Paragraph 3 */}
            <p className="animate-[fadeUp_0.6s_ease-out]">
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people&apos;s comments and
              reply to them as well. We believe that a community of learners
              can help each other grow and improve.
            </p>
          </div>

          {/* ===================================================== */}
          {/* SUPPORTING CARD                                         */}
          {/* ===================================================== */}

          <aside className="md:pt-2">
            <div
              className="
                animate-[fadeUp_0.7s_ease-out]
                rounded-2xl
                border
                border-teal-100
                bg-[#f6fdfb]
                p-6
                shadow-sm
                dark:border-teal-900/40
                dark:bg-white/5
                sm:p-8
              "
            >
              {/* Card heading */}
              <h2
                className="
                  mb-4
                  text-xl
                  text-gray-900
                  dark:text-gray-100
                  sm:text-2xl
                "
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                What you&apos;ll find here
              </h2>

              {/* Card list */}
              <ul
                className="
                  flex
                  flex-col
                  gap-3
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                  sm:text-base
                "
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {/* Item 1 */}
                <li className="flex items-start gap-2.5">
                  <span
                    className="
                      mt-2
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-teal-500
                    "
                    aria-hidden="true"
                  />

                  <span>
                    Articles and tutorials on modern web development
                  </span>
                </li>

                {/* Item 2 */}
                <li className="flex items-start gap-2.5">
                  <span
                    className="
                      mt-2
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-teal-500
                    "
                    aria-hidden="true"
                  />

                  <span>
                    Notes on software engineering and new technologies
                  </span>
                </li>

                {/* Item 3 */}
                <li className="flex items-start gap-2.5">
                  <span
                    className="
                      mt-2
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-teal-500
                    "
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

      {/* ========================================================= */}
      {/* ANIMATIONS                                                  */}
      {/* ========================================================= */}

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