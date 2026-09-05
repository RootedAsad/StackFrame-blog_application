import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function CustomFooter() {
  const year = new Date().getFullYear();

  const socialButtonClass =
    "group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 dark:border-gray-700 dark:bg-white/5 motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2";

  const footerLinkClass =
    "inline-block rounded-sm text-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 motion-reduce:transform-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 dark:text-gray-400 dark:hover:text-teal-400";

  return (
    <footer
      className="relative w-full overflow-hidden border-t"
      style={{
        borderColor: "var(--border-color, #d7ede8)",
      }}
    >
      {/* Light mode background */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f1faf8 0%, #e8f7f4 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dark mode background */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "var(--dark-surface, #0f1b1a)",
        }}
        aria-hidden="true"
      />

      {/* Subtle decorative glow */}
      <div
        className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full opacity-25 dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.24) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Compact footer container */}
      <div className="relative mx-auto w-full max-w-[1280px] px-6 pb-7 pt-10 sm:px-8 sm:pb-8 sm:pt-12 lg:px-10">
        {/* Main content */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.25fr)] md:items-start md:gap-14 lg:gap-20">
          {/* Brand */}
          <div className="max-w-[420px]">
            <Link
              to="/"
              aria-label="ASAD Journal Home"
              className="inline-flex items-baseline gap-2 whitespace-nowrap"
            >
              <span className="rounded-md bg-teal-500 px-2.5 py-1 text-sm font-bold tracking-wide text-white">
                ASAD
              </span>

              <span
                className="text-2xl text-gray-800 dark:text-gray-100 sm:text-3xl"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Journal<span className="text-teal-500">.</span>
              </span>
            </Link>

            <p
              className="mt-3 max-w-[400px] text-sm leading-[1.65] text-gray-500 dark:text-gray-400 sm:text-[15px]"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              A thoughtful personal journal about the web, code, and the
              things worth building.
            </p>

            {/* Social icons */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className={socialButtonClass}
              >
                <BsFacebook className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className={socialButtonClass}
              >
                <BsInstagram className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className={socialButtonClass}
              >
                <BsTwitter className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialButtonClass}
              >
                <BsGithub className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Dribbble"
                className={socialButtonClass}
              >
                <BsDribbble className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Footer navigation */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-x-10 lg:gap-x-14">
            {/* About */}
            <nav aria-label="About links">
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-[0.04em] text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                About
              </h3>

              <ul
                className="flex flex-col gap-2"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li>
                  <a
                    href="https://www.100jsprojects.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    100 JS Projects
                  </a>
                </li>

                <li>
                  <Link to="/" className={footerLinkClass}>
                    Asad's Blog
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Follow Us */}
            <nav aria-label="Follow links">
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-[0.04em] text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Follow Us
              </h3>

              <ul
                className="flex flex-col gap-2"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    Github
                  </a>
                </li>

                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={footerLinkClass}
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal links">
              <h3
                className="mb-3 text-sm font-semibold uppercase tracking-[0.04em] text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Legal
              </h3>

              <ul
                className="flex flex-col gap-2"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li>
                  <a href="#" className={footerLinkClass}>
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a href="#" className={footerLinkClass}>
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom divider */}
        <div
          className="mt-9 border-t pt-4 sm:mt-10 sm:pt-5"
          style={{
            borderColor: "var(--border-color, #d7ede8)",
          }}
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p
              className="text-sm text-gray-500 dark:text-gray-400"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              &copy; {year} Asad Journal. All rights reserved.
            </p>

            <p
              className="text-sm text-gray-400 dark:text-gray-500"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              Built with care, one post at a time.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}