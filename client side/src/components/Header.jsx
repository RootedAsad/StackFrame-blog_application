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

export default function Header() {
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  const userDropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  // Sync searchTerm from query parameter
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl !== null) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setSearchExpanded(false);
  }, [path]);

  // Optimized scroll morph listener
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
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close user dropdown on outside click
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

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus input when search expands
  useEffect(() => {
    if (searchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchExpanded]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(location.search);
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm) {
      urlParams.set("searchTerm", trimmedSearchTerm);
    } else {
      urlParams.delete("searchTerm");
    }

    navigate(`/search?${urlParams.toString()}`);
    setSearchExpanded(false);
  };

  const handleSignout = async () => {
    try {
      const res = await fetch(BASE_URL + "/api/user/signout", {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
        setUserMenuOpen(false);
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Keep only real application routes in the primary navigation.
  // Search is handled by the dedicated search field.
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        isScrolled ? "py-1 sm:py-1.5" : "py-3 sm:py-4"
      }`}
    >
      <div className="container-editorial w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          aria-label="Main Navigation"
          className={`relative flex items-center gap-3 sm:gap-4 rounded-full border transition-all duration-300 ${
            isScrolled
              ? "bg-[rgba(255,255,255,0.92)] dark:bg-[rgba(19,28,28,0.92)] shadow-md border-[var(--line)] py-1.5 px-4 sm:px-5 backdrop-blur-xl scale-[0.97]"
              : "bg-[rgba(255,255,255,0.72)] dark:bg-[rgba(19,28,28,0.72)] shadow-sm border-[var(--line)] py-2.5 px-4 sm:px-5 backdrop-blur-md scale-100"
          }`}
          style={{
            WebkitBackdropFilter: isScrolled ? "blur(18px)" : "blur(12px)",
          }}
        >
          {/* BRANDING: [ ASAD ] Journal. */}
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-500)] focus-visible:ring-offset-2 rounded-full"
            aria-label="ASAD Journal Home"
          >
            <span
              className={`inline-flex items-center justify-center font-bold tracking-wider uppercase rounded-full text-white bg-gradient-to-br from-[var(--teal-700)] to-[var(--teal-900)] dark:from-[var(--accent)] dark:to-[var(--teal-700)] dark:text-[#0a0f0f] shadow-sm transition-all duration-200 ease-out group-hover:scale-[1.02] group-hover:-translate-y-0.5 ${
                isScrolled ? "text-[10px] px-2 py-1" : "text-[11px] px-2.5 py-1.5"
              }`}
            >
              ASAD
            </span>

            <span
              className={`font-semibold tracking-tight transition-all duration-200 ${
                isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              }`}
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text)",
              }}
            >
              Journal
              <span className="text-[var(--teal-500)] dark:text-[var(--accent)] font-bold ml-0.5">
                .
              </span>
            </span>
          </Link>

          {/* CENTER GROUP: search + nav links, centered between logo and right actions */}
          <div className="hidden sm:flex flex-1 items-center justify-center gap-6 lg:gap-10 min-w-0">
            {/* DESKTOP SEARCH */}
            <form
              onSubmit={handleSubmit}
              className="relative shrink-0 flex items-center w-full max-w-[260px] lg:max-w-[300px]"
              role="search"
            >
              <AiOutlineSearch
                aria-hidden="true"
                className="pointer-events-none absolute left-4 w-4 h-4 text-[var(--teal-700)] dark:text-[var(--accent)]"
              />

              <input
                ref={searchInputRef}
                type="search"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Search articles"
                className="w-full text-sm py-2.5 pl-11 pr-10 rounded-full border-2 border-[rgba(20,184,166,0.25)] bg-[rgba(255,255,255,0.78)] dark:bg-[rgba(19,28,28,0.78)] text-[var(--text)] placeholder:text-[var(--text-muted)] shadow-sm outline-none focus:border-[var(--teal-500)] focus:ring-2 focus:ring-[rgba(20,184,166,0.12)] transition-all duration-200"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-3.5 inline-flex items-center justify-center text-[var(--teal-700)] dark:text-[var(--accent)] hover:text-[var(--text)] transition-colors duration-150"
                >
                  <AiOutlineClose className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* DESKTOP NAV LINKS */}
            <div className="hidden md:flex items-center gap-1 lg:gap-1.5 shrink-0">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? path === "/"
                    : path === link.href || path.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`group relative px-4 py-2 rounded-full text-sm tracking-normal font-medium transition-all duration-200 ease-out hover:-translate-y-0.5 ${
                      isActive
                        ? "text-[var(--teal-900)] dark:text-[var(--accent)] font-semibold bg-[rgba(20,184,166,0.12)]"
                        : "text-[var(--text-muted)] hover:text-[var(--teal-700)] dark:hover:text-[var(--accent)] hover:bg-[rgba(20,184,166,0.12)] dark:hover:bg-[rgba(20,184,166,0.16)]"
                    }`}
                  >
                    {/* Text flip effect: current label slides up, colored duplicate slides in */}
                    <span className="relative inline-block h-5 overflow-hidden align-middle">
                      <span className="flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
                        <span className="block leading-5">{link.name}</span>
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

          {/* RIGHT ACTIONS */}
          <div className="ml-auto flex shrink-0 items-center gap-2.5 lg:gap-3">
            {/* Mobile search */}
            <button
              type="button"
              onClick={() => navigate("/search")}
              aria-label="Search page"
              className="sm:hidden inline-flex items-center justify-center p-2 text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--line-subtle)] rounded-full transition-all duration-150 active:scale-95"
            >
              <AiOutlineSearch className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label={`Switch to ${
                theme === "light" ? "dark" : "light"
              } mode`}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--line)] text-[var(--text)] hover:text-[var(--teal-700)] dark:hover:text-[var(--accent)] hover:border-[var(--teal-500)] bg-[var(--surface)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-110 hover:shadow-md active:scale-95 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-500)]"
            >
              {theme === "light" ? (
                <FaSun className="w-4 h-4 text-amber-500" />
              ) : (
                <FaMoon className="w-4 h-4 text-[var(--accent)]" />
              )}
            </button>

            {/* User Dropdown or Sign In */}
            {currentUser ? (
              <div className="relative" ref={userDropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((prev) => !prev)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  aria-label="Open user menu"
                  className="flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-500)]"
                >
                  <img
                    src={currentUser.profilePicture}
                    alt={currentUser.username || "User avatar"}
                    className="w-8 h-8 rounded-full object-cover border border-[var(--line)] hover:border-[var(--teal-500)] hover:shadow-sm transition-all duration-150"
                  />
                </button>

                {/* User Popover Menu */}
                {userMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-52 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-lg z-50 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150"
                    style={{
                      WebkitBackdropFilter: "blur(18px)",
                    }}
                  >
                    <div className="px-3 py-2 border-b border-[var(--line)] mb-1">
                      <p className="text-xs font-semibold text-[var(--text)] truncate">
                        @{currentUser.username}
                      </p>
                      <p className="text-[11px] text-[var(--text-muted)] truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <Link
                      to="/dashboard?tab=profile"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex w-full items-center px-3 py-2 text-xs rounded-xl text-[var(--text)] hover:bg-[var(--line-subtle)] hover:text-[var(--teal-700)] dark:hover:text-[var(--accent)] transition-colors"
                    >
                      Profile & Dashboard
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignout}
                      className="flex w-full items-center px-3 py-2 text-xs rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center">
                <Link
                  to="/sign-in"
                  className="inline-flex items-center justify-center gap-2 px-5 lg:px-6 py-2.5 rounded-full text-sm font-semibold text-white !text-white bg-gradient-to-r from-[var(--teal-700)] to-[var(--teal-900)] dark:from-[var(--accent)] dark:to-[var(--accent-cyan)] dark:text-[#0a0f0f] shadow-sm hover:-translate-y-0.5 hover:scale-105 hover:shadow-md active:scale-[0.98] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-500)]"
                >
                  <FiUser className="w-4 h-4" aria-hidden="true" />
                  <span>Sign In</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label="Toggle navigation menu"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-[var(--text)] hover:bg-[var(--line-subtle)] transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--teal-500)]"
            >
              {mobileMenuOpen ? (
                <AiOutlineClose className="w-5 h-5" />
              ) : (
                <HiMenuAlt3 className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        {/* MOBILE NAVIGATION */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="md:hidden mt-2 p-4 rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-lg backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200"
            style={{
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? path === "/"
                    : path === link.href || path.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-[var(--line-subtle)] text-[var(--teal-700)] dark:text-[var(--accent)] font-semibold"
                        : "text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--line-subtle)]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {/* Mobile Search */}
              <Link
                to="/search"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--line-subtle)] transition-all"
              >
                <AiOutlineSearch className="w-4 h-4" />
                Search
              </Link>

              {!currentUser && (
                <div className="pt-2 mt-2 border-t border-[var(--line)] flex flex-col gap-2">
                  <Link
                    to="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-medium rounded-xl border border-[var(--line)] text-[var(--text)] hover:border-[var(--teal-500)] transition-colors"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2 text-sm font-semibold rounded-xl text-white !text-white bg-gradient-to-r from-[var(--teal-700)] to-[var(--teal-900)] dark:from-[var(--accent)] dark:to-[var(--accent-cyan)] dark:text-[#0a0f0f]"
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