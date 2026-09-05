import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { BASE_URL } from "../config";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "uncategorized",
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${BASE_URL}/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      const data = await res.json();
      setPosts(data.posts);
      setLoading(false);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${BASE_URL}/api/post/getposts?${searchQuery}`);
    if (!res.ok) return;
    const data = await res.json();
    setPosts([...posts, ...data.posts]);
    if (data.posts.length === 9) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }
  };

  const hasResults = !loading && posts && posts.length > 0;
  const hasNoResults = !loading && posts.length === 0;

  return (
    <div className="relative w-full overflow-hidden bg-white dark:bg-[var(--dark-bg,#0b1413)]">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f6fdfb 0%, #ffffff 45%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-24 -right-16 w-80 h-80 rounded-full opacity-30 dark:opacity-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* HERO */}
      <section className="relative max-w-4xl mx-auto px-6 sm:px-10 pt-16 sm:pt-24 pb-10 sm:pb-14 text-center animate-[fadeUp_0.6s_ease-out]">
        <span
          className="inline-block text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-teal-600 dark:text-teal-400"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Search the Journal
        </span>
        <h1
          className="mt-4 text-4xl sm:text-5xl leading-[1.15] text-gray-900 dark:text-gray-100"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Explore the journal.
        </h1>
        <p
          className="mt-4 max-w-xl mx-auto text-base sm:text-lg leading-[1.7] text-gray-500 dark:text-gray-400"
          style={{ fontFamily: "'Manrope', sans-serif" }}
        >
          Search articles by keyword, refine by category, and sort by what's
          newest or oldest.
        </p>
      </section>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 pb-20 flex flex-col lg:flex-row gap-10 lg:gap-14">
        {/* Sidebar / Filters */}
        <aside className="lg:w-72 lg:shrink-0 animate-[fadeUp_0.65s_ease-out]">
          <form
            className="flex flex-col gap-6 lg:sticky lg:top-24 rounded-2xl border border-teal-100 dark:border-teal-900/40 bg-[#f6fdfb] dark:bg-white/5 p-6 sm:p-7 shadow-sm"
            onSubmit={handleSubmit}
          >
            {/* Search Term */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="searchTerm"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Search
              </label>
              <div className="relative">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  id="searchTerm"
                  type="text"
                  placeholder="Search articles..."
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 pl-9 pr-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 placeholder:text-gray-400 outline-none transition-colors duration-200 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400/40"
                  style={{ fontFamily: "'Manrope', sans-serif" }}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="sort"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Sort
              </label>
              <select
                id="sort"
                onChange={handleChange}
                value={sidebarData.sort}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 outline-none transition-colors duration-200 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400/40"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Category
              </label>
              <select
                id="category"
                onChange={handleChange}
                value={sidebarData.category}
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-200 outline-none transition-colors duration-200 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400/40"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                <option value="uncategorized">Uncategorized</option>
                <option value="reactjs">React.js</option>
                <option value="nextjs">Next.js</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-1 w-full rounded-lg bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold py-2.5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 focus-visible:outline-offset-2"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Apply Filters
            </button>
          </form>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-8">
            <h2
              className="text-2xl sm:text-3xl text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Results
            </h2>
          </div>

          {loading && (
            <div className="flex justify-center items-center w-full py-20">
              <span
                className="inline-block w-8 h-8 rounded-full border-2 border-teal-200 border-t-teal-500 motion-safe:animate-spin"
                role="status"
                aria-label="Loading results"
              />
            </div>
          )}

          {hasNoResults && (
            <div className="flex flex-col items-center justify-center text-center rounded-2xl border border-teal-100 dark:border-teal-900/40 bg-[#f6fdfb] dark:bg-white/5 py-16 px-6">
              <svg
                className="w-10 h-10 text-teal-400 mb-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <h3
                className="text-xl sm:text-2xl text-gray-800 dark:text-gray-100 mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                No posts found
              </h3>
              <p
                className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-sm"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Try adjusting your search term, category, or sort order.
              </p>
            </div>
          )}

          {hasResults && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-7 animate-[fadeUp_0.6s_ease-out]">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          )}

          {showMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleShowMore}
                className="text-teal-600 dark:text-teal-400 text-base font-semibold hover:underline underline-offset-4 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-500 focus-visible:outline-offset-2 rounded-sm px-2 py-1"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Show More
              </button>
            </div>
          )}
        </div>
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
          .animate-\\[fadeUp_0\\.6s_ease-out\\],
          .animate-\\[fadeUp_0\\.65s_ease-out\\] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}