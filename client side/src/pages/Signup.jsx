import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { BASE_URL } from "../config";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields.");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch(BASE_URL + "/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#0b1413]">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(135deg, #f3fcfa 0%, #ffffff 48%, #f8fffd 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0) 70%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-48 -right-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl dark:opacity-5"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.18) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* LEFT + RIGHT */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1320px] items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* ================= LEFT ================= */}
          <section className="w-full">
            <div className="max-w-[600px]">
              <p
                className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Join Asad Journal
              </p>

              <h1
                className="mt-5 text-[46px] leading-[1.04] text-gray-900 dark:text-white sm:text-[56px] lg:text-[66px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                Create your{" "}
                <span className="inline-flex flex-wrap items-center">
                  <span>account</span>
                  <span className="text-teal-500">.</span>
                </span>
              </h1>

              <p
                className="mt-6 max-w-[470px] text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Join a thoughtful space for ideas, technology, design, and
                everything worth reading.
              </p>

              {/* Editorial decoration */}
              <div className="mt-14 hidden md:block" aria-hidden="true">
                <div className="flex items-center gap-4">
                  <span className="h-px w-20 bg-teal-200 dark:bg-teal-800" />
                  <span className="h-2 w-2 rounded-full bg-teal-400" />
                  <span className="h-px w-10 bg-teal-100 dark:bg-teal-900" />
                </div>

                <div className="mt-8 h-32 w-[340px]">
                  <svg
                    viewBox="0 0 340 130"
                    className="h-full w-full text-teal-200 dark:text-teal-900/60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <circle cx="55" cy="90" r="34" />
                    <circle cx="155" cy="35" r="24" />
                    <circle cx="285" cy="82" r="16" />
                    <line x1="82" y1="75" x2="136" y2="48" />
                    <line x1="178" y1="48" x2="271" y2="77" />
                    <circle cx="155" cy="35" r="38" opacity="0.25" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT ================= */}
          <section className="w-full max-w-[520px] md:ml-auto">
            <div className="rounded-[24px] border border-teal-100 bg-white p-7 shadow-[0_12px_40px_rgba(15,118,110,0.09)] dark:border-teal-900/50 dark:bg-white/[0.04] sm:p-9 lg:p-10">
              <h2
                className="text-2xl sm:text-3xl text-gray-900 dark:text-gray-100"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Create your account
              </h2>
              <p
                className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Start your journey with ASAD Journal.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-6">
                {/* USERNAME */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="username"
                    className="text-[16px] font-semibold text-gray-800 dark:text-gray-200"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Your Username
                  </label>

                  <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    autoComplete="username"
                    onChange={handleChange}
                    className="h-[58px] w-full rounded-full border border-gray-200 bg-[#edf3ff] px-5 text-[16px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20 dark:border-gray-700 dark:bg-[#15211f] dark:text-gray-100 dark:focus:border-teal-500 dark:focus:bg-[#182522]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                {/* EMAIL */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="text-[16px] font-semibold text-gray-800 dark:text-gray-200"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Your Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    onChange={handleChange}
                    className="h-[58px] w-full rounded-full border border-gray-200 bg-[#edf3ff] px-5 text-[16px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20 dark:border-gray-700 dark:bg-[#15211f] dark:text-gray-100 dark:focus:border-teal-500 dark:focus:bg-[#182522]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                {/* PASSWORD */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="password"
                    className="text-[16px] font-semibold text-gray-800 dark:text-gray-200"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    Your Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={handleChange}
                    className="h-[58px] w-full rounded-full border border-gray-200 bg-[#edf3ff] px-5 text-[16px] tracking-[0.15em] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20 dark:border-gray-700 dark:bg-[#15211f] dark:text-gray-100 dark:focus:border-teal-500 dark:focus:bg-[#182522]"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  />
                </div>

                {/* CREATE ACCOUNT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex h-[58px] w-full items-center justify-center gap-3 rounded-full bg-teal-500 px-5 text-[16px] font-semibold text-white shadow-[0_5px_14px_rgba(20,184,166,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_9px_22px_rgba(20,184,166,0.24)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 motion-reduce:transform-none"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="inline-block h-4 w-4 rounded-full border-2 border-white/40 border-t-white motion-safe:animate-spin"
                        role="status"
                        aria-label="Loading"
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                {/* DIVIDER */}
                <div className="flex items-center gap-4" aria-hidden="true">
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                  <span
                    className="text-xs font-semibold tracking-[0.2em] text-gray-400 dark:text-gray-500"
                    style={{ fontFamily: "'Manrope', sans-serif" }}
                  >
                    OR
                  </span>
                  <span className="h-px flex-1 bg-gray-200 dark:bg-gray-700" />
                </div>

                {/* GOOGLE */}
                <div className="oauth-button-container">
                  <OAuth />
                </div>
              </form>

              {/* SIGN IN */}
              <div
                className="mt-7 flex flex-wrap items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <span>Already have an account?</span>

                <Link
                  to="/sign-in"
                  className="font-semibold text-teal-600 underline-offset-4 transition-colors hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2"
                >
                  Sign In
                </Link>
              </div>

              {/* ERROR */}
              {errorMessage && (
                <div
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
                  role="alert"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Google hover + reduced motion */}
      <style>{`
        .oauth-button-container {
          width: 100%;
        }

        .oauth-button-container > button {
          width: 100% !important;
          min-height: 58px;
          border-radius: 9999px;
          transition:
            transform 220ms ease,
            box-shadow 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease;
        }

        .oauth-button-container > button:hover {
          transform: translateY(-2px);
          border-color: #cbd5e1;
          background-color: #f8fafc;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.10);
        }

        .oauth-button-container > button:active {
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .oauth-button-container > button {
            transition: none !important;
          }

          .oauth-button-container > button:hover {
            transform: none !important;
          }

          .motion-safe\\:animate-spin {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}