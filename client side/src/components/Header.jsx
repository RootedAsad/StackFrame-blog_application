import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { BASE_URL } from "../config";
import stackframeLogo from "../assests/stackframe-logo.png";

export default function Header() {
  const location = useLocation();
  const path = location.pathname;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  /* =========================================================
     SYNC SEARCH WITH URL
  ========================================================== */

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    setSearchTerm(searchTermFromUrl || "");
  }, [location.search]);

  /* =========================================================
     CLOSE MENUS ON ROUTE CHANGE
  ========================================================== */

  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [path]);

  /* =========================================================
     SCROLL EFFECT
  ========================================================== */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 28);
        ticking = false;
      });

      ticking = true;
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================================
     CLOSE USER MENU WHEN CLICKING OUTSIDE
  ========================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================================
     SEARCH
  ========================================================== */

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    /*
      Always create a fresh search URL.

      This prevents old:
      - category
      - sort
      - startIndex

      values from another page/search from being reused.
    */

    if (trimmedSearchTerm) {
      navigate(
        `/search?searchTerm=${encodeURIComponent(trimmedSearchTerm)}`
      );
    } else {
      navigate("/search");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");

    if (path === "/search") {
      navigate("/search");
    }
  };

  /* =========================================================
     SIGN OUT
  ========================================================== */

  const handleSignout = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
        return;
      }

      dispatch(signOutSuccess());

      setUserMenuOpen(false);

      navigate("/sign-in");
    } catch (error) {
      console.log(error.message);
    }
  };

  /* =========================================================
     NAVIGATION
  ========================================================== */

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Projects",
      href: "/projects",
    },
  ];

  return (
    <header
      className={`
        sticky
        top-0
        z-50
        w-full
        transition-all
        duration-300
        ease-out
        ${
          isScrolled
            ? "py-1 sm:py-1.5"
            : "py-3 sm:py-4"
        }
      `}
    >
      <div
        className="
          container-editorial
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <nav
          aria-label="Main Navigation"
          className={`
            relative
            flex
            items-center
            gap-3
            rounded-full
            border
            transition-all
            duration-300
            sm:gap-4
            ${
              isScrolled
                ? `
                  border-[var(--line)]
                  bg-[rgba(255,255,255,0.92)]
                  px-4
                  py-1.5
                  shadow-md
                  backdrop-blur-xl
                  sm:px-5
                  dark:bg-[rgba(19,28,28,0.92)]
                  scale-[0.97]
                `
                : `
                  border-[var(--line)]
                  bg-[rgba(255,255,255,0.72)]
                  px-4
                  py-2.5
                  shadow-sm
                  backdrop-blur-md
                  sm:px-5
                  dark:bg-[rgba(19,28,28,0.72)]
                  scale-100
                `
            }
          `}
          style={{
            WebkitBackdropFilter: isScrolled
              ? "blur(18px)"
              : "blur(12px)",
          }}
        >
          {/* =====================================================
              LOGO
          ====================================================== */}

          <Link
            to="/"
            className="
              group
              flex
              shrink-0
              select-none
              items-center
              rounded-full
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--teal-500)]
              focus-visible:ring-offset-2
            "
            aria-label="STACKFRAME Home"
          >
            <img
              src={stackframeLogo}
              alt="STACKFRAME"
              className={`
                w-auto
                object-contain
                transition-all
                duration-200
                ease-out
                group-hover:-translate-y-0.5
                group-hover:scale-[1.02]
                ${
                  isScrolled
                    ? "h-8 sm:h-9"
                    : "h-9 sm:h-10"
                }
              `}
            />
          </Link>

          {/* =====================================================
              CENTER
          ====================================================== */}

          <div
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              gap-6
              sm:flex
              lg:gap-10
            "
          >
            {/* ===================================================
                DESKTOP SEARCH
            ==================================================== */}

            <form
              onSubmit={handleSearchSubmit}
              role="search"
              className="
                relative
                flex
                w-full
                max-w-[260px]
                shrink-0
                items-center
                lg:max-w-[300px]
              "
            >
              <AiOutlineSearch
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  left-4
                  h-4
                  w-4
                  text-[var(--teal-700)]
                  dark:text-[var(--accent)]
                "
              />

              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search articles"
                autoComplete="off"
                className="
                  w-full
                  rounded-full
                  border-2
                  border-[rgba(20,184,166,0.25)]
                  bg-[rgba(255,255,255,0.78)]
                  py-2.5
                  pl-11
                  pr-10
                  text-sm
                  text-[var(--text)]
                  shadow-sm
                  outline-none
                  transition-all
                  duration-200
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--teal-500)]
                  focus:ring-2
                  focus:ring-[rgba(20,184,166,0.12)]
                  dark:bg-[rgba(19,28,28,0.78)]
                "
              />

              {/* Clear Search */}
              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  aria-label="Clear search"
                  className="
                    absolute
                    right-3.5
                    inline-flex
                    items-center
                    justify-center
                    text-[var(--teal-700)]
                    transition-colors
                    duration-150
                    hover:text-[var(--text)]
                    dark:text-[var(--accent)]
                  "
                >
                  <AiOutlineClose className="h-4 w-4" />
                </button>
              )}
            </form>

            {/* ===================================================
                DESKTOP NAVIGATION
            ==================================================== */}

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-1
                md:flex
                lg:gap-1.5
              "
            >
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? path === "/"
                    : path === link.href ||
                      path.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`
                      group
                      relative
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-medium
                      tracking-normal
                      transition-all
                      duration-200
                      ease-out
                      hover:-translate-y-0.5
                      ${
                        isActive
                          ? `
                            bg-[rgba(20,184,166,0.12)]
                            font-semibold
                            text-[var(--teal-900)]
                            dark:text-[var(--accent)]
                          `
                          : `
                            text-[var(--text-muted)]
                            hover:bg-[rgba(20,184,166,0.12)]
                            hover:text-[var(--teal-700)]
                            dark:hover:bg-[rgba(20,184,166,0.16)]
                            dark:hover:text-[var(--accent)]
                          `
                      }
                    `}
                  >
                    <span className="relative inline-block h-5 overflow-hidden align-middle">
                      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                        <span className="block leading-5">
                          {link.name}
                        </span>

                        <span className="block leading-5 text-[var(--teal-500)] dark:text-[var(--accent)]">
                          {link.name}
                        </span>
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              RIGHT ACTIONS
          ====================================================== */}

          <div
            className="
              ml-auto
              flex
              shrink-0
              items-center
              gap-2.5
              lg:gap-3
            "
          >
            {/* Mobile Search */}
            <button
              type="button"
              onClick={() => navigate("/search")}
              aria-label="Search articles"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                p-2
                text-[var(--text-muted)]
                transition-all
                duration-150
                hover:bg-[var(--line-subtle)]
                hover:text-[var(--text)]
                active:scale-95
                sm:hidden
              "
            >
              <AiOutlineSearch className="h-4 w-4" />
            </button>

            {/* ===================================================
                THEME TOGGLE
            ==================================================== */}

            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
              className="
                inline-flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[var(--line)]
                bg-[var(--surface)]
                text-[var(--text)]
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:scale-110
                hover:border-[var(--teal-500)]
                hover:shadow-md
                hover:text-[var(--teal-700)]
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--teal-500)]
                dark:hover:text-[var(--accent)]
              "
            >
              {theme === "light" ? (
                <FaSun className="h-4 w-4 text-amber-500" />
              ) : (
                <FaMoon className="h-4 w-4 text-[var(--accent)]" />
              )}
            </button>

            {/* ===================================================
                USER
            ==================================================== */}

            {currentUser ? (
              <div
                className="relative"
                ref={userDropdownRef}
              >
                <button
                  type="button"
                  onClick={() =>
                    setUserMenuOpen((prev) => !prev)
                  }
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="Open user menu"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-full
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--teal-500)]
                  "
                >
                  <img
                    src={currentUser.profilePicture}
                    alt={
                      currentUser.username ||
                      "User avatar"
                    }
                    className="
                      h-8
                      w-8
                      rounded-full
                      border
                      border-[var(--line)]
                      object-cover
                      transition-all
                      duration-150
                      hover:border-[var(--teal-500)]
                      hover:shadow-sm
                    "
                  />
                </button>

                {/* User Menu */}
                {userMenuOpen && (
                  <div
                    className="
                      absolute
                      right-0
                      z-50
                      mt-2
                      w-52
                      rounded-2xl
                      border
                      border-[var(--line)]
                      bg-[var(--surface)]
                      p-2
                      shadow-lg
                      backdrop-blur-xl
                      animate-in
                      fade-in
                      slide-in-from-top-2
                      duration-150
                    "
                    style={{
                      WebkitBackdropFilter:
                        "blur(18px)",
                    }}
                  >
                    <div
                      className="
                        mb-1
                        border-b
                        border-[var(--line)]
                        px-3
                        py-2
                      "
                    >
                      <p className="truncate text-xs font-semibold text-[var(--text)]">
                        @{currentUser.username}
                      </p>

                      <p className="truncate text-[11px] text-[var(--text-muted)]">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard?tab=profile"
                      onClick={() =>
                        setUserMenuOpen(false)
                      }
                      className="
                        flex
                        w-full
                        items-center
                        rounded-xl
                        px-3
                        py-2
                        text-xs
                        text-[var(--text)]
                        transition-colors
                        hover:bg-[var(--line-subtle)]
                        hover:text-[var(--teal-700)]
                        dark:hover:text-[var(--accent)]
                      "
                    >
                      Profile & Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignout}
                      className="
                        flex
                        w-full
                        items-center
                        rounded-xl
                        px-3
                        py-2
                        text-xs
                        text-rose-600
                        transition-colors
                        hover:bg-rose-50
                        dark:text-rose-400
                        dark:hover:bg-rose-950/20
                      "
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center sm:flex">
                <Link
                  to="/sign-in"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-gradient-to-r
                    from-[var(--teal-700)]
                    to-[var(--teal-900)]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    !text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:scale-105
                    hover:shadow-md
                    active:scale-[0.98]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--teal-500)]
                    lg:px-6
                    dark:from-[var(--accent)]
                    dark:to-[var(--accent-cyan)]
                    dark:text-[#0a0f0f]
                  "
                >
                  <FiUser
                    className="h-4 w-4"
                    aria-hidden="true"
                  />

                  <span>Sign In</span>
                </Link>
              </div>
            )}

            {/* ===================================================
                MOBILE MENU BUTTON
            ==================================================== */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((prev) => !prev)
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                p-2
                text-[var(--text)]
                transition-all
                duration-150
                hover:bg-[var(--line-subtle)]
                active:scale-95
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--teal-500)]
                md:hidden
              "
            >
              {mobileMenuOpen ? (
                <AiOutlineClose className="h-5 w-5" />
              ) : (
                <HiMenuAlt3 className="h-5 w-5" />
              )}
            </button>
          </div>
        </nav>

        {/* =========================================================
            MOBILE NAVIGATION
        ========================================================== */}

        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="
              mt-2
              rounded-3xl
              border
              border-[var(--line)]
              bg-[var(--surface)]
              p-4
              shadow-lg
              backdrop-blur-xl
              animate-in
              fade-in
              slide-in-from-top-2
              duration-200
              md:hidden
            "
            style={{
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            <div className="flex flex-col gap-1">
              {/* Main Links */}
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? path === "/"
                    : path === link.href ||
                      path.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className={`
                      rounded-2xl
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      transition-all
                      ${
                        isActive
                          ? `
                            bg-[var(--line-subtle)]
                            font-semibold
                            text-[var(--teal-700)]
                            dark:text-[var(--accent)]
                          `
                          : `
                            text-[var(--text-muted)]
                            hover:bg-[var(--line-subtle)]
                            hover:text-[var(--text)]
                          `
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/search");
                }}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-2xl
                  px-4
                  py-2.5
                  text-left
                  text-sm
                  font-medium
                  text-[var(--text-muted)]
                  transition-all
                  hover:bg-[var(--line-subtle)]
                  hover:text-[var(--text)]
                "
              >
                <AiOutlineSearch className="h-4 w-4" />
                Search
              </button>

              {/* Mobile Auth */}
              {!currentUser && (
                <div
                  className="
                    mt-2
                    flex
                    flex-col
                    gap-2
                    border-t
                    border-[var(--line)]
                    pt-2
                  "
                >
                  <Link
                    to="/sign-in"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      w-full
                      rounded-xl
                      border
                      border-[var(--line)]
                      py-2
                      text-center
                      text-sm
                      font-medium
                      text-[var(--text)]
                      transition-colors
                      hover:border-[var(--teal-500)]
                    "
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/sign-up"
                    onClick={() =>
                      setMobileMenuOpen(false)
                    }
                    className="
                      w-full
                      rounded-xl
                      bg-gradient-to-r
                      from-[var(--teal-700)]
                      to-[var(--teal-900)]
                      py-2
                      text-center
                      text-sm
                      font-semibold
                      !text-white
                      dark:from-[var(--accent)]
                      dark:to-[var(--accent-cyan)]
                      dark:text-[#0a0f0f]
                    "
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}