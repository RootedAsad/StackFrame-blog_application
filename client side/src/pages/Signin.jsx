import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { BASE_URL } from "../config";

export default function Signin() {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch(BASE_URL + "/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white dark:bg-[#0b1413]">
      {/* Soft background */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "radial-gradient(circle at 82% 18%, rgba(45, 212, 191, 0.12), transparent 28%), linear-gradient(135deg, #f3fcfa 0%, #ffffff 48%, #f8fffd 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-48 -left-40 h-[500px] w-[500px] rounded-full opacity-20 blur-3xl dark:opacity-5"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main two-part layout */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1320px] items-center px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid w-full grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-16 lg:gap-24">

          {/* LEFT SIDE */}
          <section className="w-full">
            <div className="max-w-[610px]">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-12 bg-teal-400" />
                <span
                  className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-400"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  Welcome Back
                </span>
              </div>

              <h1
                className="text-[46px] leading-[1.04] text-gray-900 dark:text-white sm:text-[56px] lg:text-[66px]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                }}
              >
                Sign in to{" "}
                <span className="inline-flex flex-wrap items-center">
                  <span
                    className="mr-2 inline-flex items-center rounded-[17px] bg-teal-500 px-3 py-1 text-[40px] leading-none text-white shadow-[0_5px_15px_rgba(20,184,166,0.15)] sm:text-[49px] lg:text-[57px]"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    ASAD
                  </span>

                  <span>
                    Journal<span className="text-teal-500">.</span>
                  </span>
                </span>
              </h1>

              {/* Editorial accent */}
              <div
                className="mt-9 flex items-center gap-4"
                aria-hidden="true"
              >
                <span className="h-2 w-2 rounded-full bg-teal-500" />
                <span className="h-px w-24 bg-teal-200 dark:bg-teal-800" />
                <span className="h-px w-8 bg-teal-100 dark:bg-teal-900" />
              </div>

              {/* Decorative editorial graphic */}
              <div
                className="mt-10 hidden h-36 w-[370px] md:block"
                aria-hidden="true"
              >
                <svg
                  viewBox="0 0 370 140"
                  className="h-full w-full text-teal-200 dark:text-teal-900/60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <circle cx="55" cy="95" r="38" />
                  <circle cx="160" cy="40" r="26" />
                  <circle cx="305" cy="88" r="18" />

                  <line
                    x1="87"
                    y1="80"
                    x2="136"
                    y2="53"
                  />

                  <line
                    x1="184"
                    y1="52"
                    x2="287"
                    y2="82"
                  />

                  <circle
                    cx="160"
                    cy="40"
                    r="39"
                    opacity="0.25"
                  />

                  <circle
                    cx="305"
                    cy="88"
                    r="29"
                    opacity="0.2"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE */}
          <section className="w-full max-w-[520px] md:ml-auto">
            <div
              className="rounded-[26px] border border-teal-100 bg-white p-7 shadow-[0_16px_45px_rgba(15,118,110,0.09)] dark:border-teal-900/50 dark:bg-white/[0.04] sm:p-9 lg:p-10"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6"
              >
                {/* Email */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="email"
                    className="text-[16px] font-semibold text-gray-800 dark:text-gray-200"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Your Email
                  </label>

                  <input
                    type="email"
                    id="email"
                    placeholder="name@company.com"
                    autoComplete="email"
                    onChange={handleChange}
                    className="h-[58px] w-full rounded-full border border-gray-200 bg-[#edf3ff] px-5 text-[16px] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20 dark:border-gray-700 dark:bg-[#15211f] dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-teal-500 dark:focus:bg-[#182522]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2.5">
                  <label
                    htmlFor="password"
                    className="text-[16px] font-semibold text-gray-800 dark:text-gray-200"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  >
                    Your Password
                  </label>

                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    autoComplete="current-password"
                    onChange={handleChange}
                    className="h-[58px] w-full rounded-full border border-gray-200 bg-[#edf3ff] px-5 text-[16px] tracking-[0.15em] text-gray-900 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-teal-400 focus:bg-white focus:ring-2 focus:ring-teal-400/20 dark:border-gray-700 dark:bg-[#15211f] dark:text-gray-100 dark:placeholder:text-gray-500 dark:hover:border-gray-600 dark:focus:border-teal-500 dark:focus:bg-[#182522]"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                    }}
                  />
                </div>

                {/* Sign In */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 h-[58px] w-full rounded-full bg-teal-500 px-5 text-[16px] font-semibold text-white shadow-[0_6px_16px_rgba(20,184,166,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-600 hover:shadow-[0_10px_24px_rgba(20,184,166,0.24)] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2 motion-reduce:transform-none"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>

                {/* Google */}
                <div className="oauth-button-container">
                  <OAuth />
                </div>
              </form>

              {/* Sign Up */}
              <div
                className="mt-7 flex flex-wrap items-center gap-2 text-[15px] text-gray-500 dark:text-gray-400"
                style={{
                  fontFamily: "'Manrope', sans-serif",
                }}
              >
                <span>Don&apos;t have an account?</span>

                <Link
                  to="/sign-up"
                  className="font-semibold text-teal-600 underline-offset-4 transition-colors hover:text-teal-700 hover:underline dark:text-teal-400 dark:hover:text-teal-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2"
                >
                  Sign Up
                </Link>
              </div>

              {/* Error */}
              {errorMessage && (
                <div
                  className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/70 dark:bg-red-950/30 dark:text-red-300"
                  role="alert"
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                  }}
                >
                  {errorMessage}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Google button hover + reduced motion */}
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
        }
      `}</style>
    </main>
  );
}