import React from "react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

import stackframeLogo from "../assests/stackframe-logo.png";

export default function CustomFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full overflow-hidden border-t"
      style={{
        borderColor: "var(--border-color, #d7ede8)",
      }}
    >
      {/* Light mode surface */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f1faf8 0%, #e8f7f4 100%)",
        }}
        aria-hidden="true"
      />

      {/* Dark mode surface */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: "var(--dark-surface, #0f1b1a)",
        }}
        aria-hidden="true"
      />

      {/* Subtle decorative glow */}
      <div
        className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full opacity-30 dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-14 sm:px-10 sm:py-20">
        {/* Top Section */}
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          {/* Brand + description */}
          <div className="max-w-[400px]">
            <Link
              to="/"
              className="inline-flex items-center rounded-full transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
              aria-label="STACKFRAME Home"
            >
              <img
                src={stackframeLogo}
                alt="STACKFRAME"
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p
              className="mt-5 text-sm leading-[1.7] text-gray-500 dark:text-gray-400 sm:text-base"
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              A thoughtful personal journal about the web, code, and the
              things worth building.
            </p>

            {/* Social icons */}
            <div className="mt-7 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-white/5"
              >
                <BsFacebook className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-white/5"
              >
                <BsInstagram className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-white/5"
              >
                <BsTwitter className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-white/5"
              >
                <BsGithub className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>

              <a
                href="#"
                aria-label="Dribbble"
                className="group flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 hover:border-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-white/5"
              >
                <BsDribbble className="text-gray-500 transition-colors duration-200 group-hover:text-teal-500 dark:text-gray-400" />
              </a>
            </div>
          </div>

          {/* Link groups */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 sm:gap-16">
            {/* About */}
            <nav aria-label="About links">
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                About
              </h3>

              <ul
                className="flex flex-col gap-3 text-sm"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                {/* Portfolio replaces 100 JS Projects */}
                <li>
                  <a
                    href="https://asad-portfolio-tau.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    Portfolio
                  </a>
                </li>

                <li>
                  <Link
                    to="/"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    STACKFRAME
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Follow */}
            <nav aria-label="Follow links">
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Follow Us
              </h3>

              <ul
                className="flex flex-col gap-3 text-sm"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    Github
                  </a>
                </li>

                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    Discord
                  </a>
                </li>
              </ul>
            </nav>

            {/* Legal */}
            <nav aria-label="Legal links">
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-800 dark:text-gray-200"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                Legal
              </h3>

              <ul
                className="flex flex-col gap-3 text-sm"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <li>
                  <a
                    href="#"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    Privacy Policy
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    className="relative inline-block rounded-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:text-gray-400 dark:hover:text-teal-400"
                  >
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-3 border-t pt-6 text-center sm:flex-row sm:text-left"
          style={{
            borderColor: "var(--border-color, #d7ede8)",
          }}
        >
          <p
            className="text-sm text-gray-500 dark:text-gray-400"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            &copy; {year} STACKFRAME. All rights reserved.
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
    </footer>
  );
}