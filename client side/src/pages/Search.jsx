import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { BASE_URL } from "../config";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  /* =========================================================
     READ SEARCH PARAMETERS FROM URL
  ========================================================== */

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl =
      urlParams.get("searchTerm") || "";

    const sortFromUrl =
      urlParams.get("sort") || "desc";

    const categoryFromUrl =
      urlParams.get("category") || "";

    setSidebarData({
      searchTerm: searchTermFromUrl,
      sort: sortFromUrl,
      category: categoryFromUrl,
    });
  }, [location.search]);

  /* =========================================================
     FETCH POSTS
  ========================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      setLoading(true);
      setError("");

      try {
        const urlParams = new URLSearchParams(
          location.search
        );

        /*
          Remove empty parameters.

          This keeps the API request clean and prevents:
          category=
          searchTerm=
          sort=
          from being unnecessarily sent.
        */

        for (const [key, value] of [...urlParams.entries()]) {
          if (!value.trim()) {
            urlParams.delete(key);
          }
        }

        const searchQuery = urlParams.toString();

        const response = await fetch(
          `${BASE_URL}/api/post/getposts${
            searchQuery ? `?${searchQuery}` : ""
          }`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Unable to load search results."
          );
        }

        const data = await response.json();

        setPosts(Array.isArray(data.posts) ? data.posts : []);

        if (
          Array.isArray(data.posts) &&
          data.posts.length === 9
        ) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error("Search error:", error);

        setPosts([]);
        setShowMore(false);
        setError(
          "Something went wrong while loading search results."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      controller.abort();
    };
  }, [location.search]);

  /* =========================================================
     HANDLE FILTER CHANGES
  ========================================================== */

  const handleChange = (e) => {
    const { id, value } = e.target;

    setSidebarData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  /* =========================================================
     SUBMIT SEARCH
  ========================================================== */

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchTerm =
      sidebarData.searchTerm.trim();

    const params = new URLSearchParams();

    /*
      Only add searchTerm when user actually entered one.
    */

    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    }

    /*
      Keep sort only when it is not the default.
    */

    if (sidebarData.sort === "asc") {
      params.set("sort", "asc");
    }

    /*
      Keep category only when user selected one.
    */

    if (sidebarData.category) {
      params.set(
        "category",
        sidebarData.category
      );
    }

    /*
      Always start a fresh search from page 1.
    */

    const query = params.toString();

    navigate(
      query
        ? `/search?${query}`
        : "/search"
    );
  };

  /* =========================================================
     SHOW MORE
  ========================================================== */

  const handleShowMore = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const numberOfPosts = posts.length;
      const startIndex = numberOfPosts;

      const urlParams = new URLSearchParams(
        location.search
      );

      urlParams.set(
        "startIndex",
        startIndex.toString()
      );

      const searchQuery = urlParams.toString();

      const response = await fetch(
        `${BASE_URL}/api/post/getposts?${searchQuery}`
      );

      if (!response.ok) {
        throw new Error(
          "Unable to load more posts."
        );
      }

      const data = await response.json();

      const newPosts = Array.isArray(data.posts)
        ? data.posts
        : [];

      setPosts((prevPosts) => [
        ...prevPosts,
        ...newPosts,
      ]);

      if (newPosts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error(
        "Show more error:",
        error
      );

      setError(
        "Unable to load more posts."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     RESULT STATES
  ========================================================== */

  const hasResults =
    !loading &&
    posts &&
    posts.length > 0;

  const hasNoResults =
    !loading &&
    !error &&
    posts.length === 0;

  return (
    <div className="relative min-h-0 w-full overflow-hidden bg-white dark:bg-[var(--dark-bg,#0b1413)]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="pointer-events-none absolute inset-0 dark:hidden"
        style={{
          background:
            "linear-gradient(180deg, #f6fdfb 0%, #ffffff 45%, #ffffff 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full opacity-30 blur-3xl dark:opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(45,212,191,0.25) 0%, rgba(45,212,191,0) 70%)",
        }}
        aria-hidden="true"
      />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section
        className="
          relative
          mx-auto
          max-w-4xl
          px-6
          pb-10
          pt-12
          text-center
          sm:px-10
          sm:pb-12
          sm:pt-16
        "
      >
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
          Search the Journal
        </span>

        <h1
          className="
            mt-4
            text-4xl
            leading-[1.15]
            text-gray-900
            dark:text-gray-100
            sm:text-5xl
          "
          style={{
            fontFamily:
              "'Cormorant Garamond', serif",
          }}
        >
          Explore the journal.
        </h1>

        <p
          className="
            mx-auto
            mt-4
            max-w-xl
            text-base
            leading-[1.7]
            text-gray-500
            dark:text-gray-400
            sm:text-lg
          "
          style={{
            fontFamily:
              "'Manrope', sans-serif",
          }}
        >
          Search articles by keyword, refine by
          category, and sort by what's newest or
          oldest.
        </p>
      </section>

      {/* =====================================================
          SEARCH + RESULTS
      ====================================================== */}

      <div
        className="
          relative
          mx-auto
          flex
          max-w-6xl
          flex-col
          gap-8
          px-4
          pb-10
          sm:px-6
          lg:flex-row
          lg:gap-10
          lg:px-8
        "
      >

        {/* ===================================================
            SIDEBAR / FILTERS
        ==================================================== */}

        <aside
          className="
            lg:w-72
            lg:shrink-0
          "
        >
          <form
            onSubmit={handleSubmit}
            className="
              flex
              flex-col
              gap-5
              rounded-2xl
              border
              border-teal-100
              bg-[#f6fdfb]
              p-5
              shadow-sm
              dark:border-teal-900/40
              dark:bg-white/5
              sm:p-6
              lg:sticky
              lg:top-24
            "
          >

            {/* Search */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="searchTerm"
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                Search
              </label>

              <div className="relative">
                <svg
                  className="
                    pointer-events-none
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-teal-500
                  "
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                  />

                  <line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                  />
                </svg>

                <input
                  id="searchTerm"
                  type="search"
                  placeholder="Search articles..."
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                  autoComplete="off"
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    bg-white
                    py-2.5
                    pl-9
                    pr-3
                    text-sm
                    text-gray-700
                    outline-none
                    transition-colors
                    duration-200
                    placeholder:text-gray-400
                    focus:border-teal-400
                    focus-visible:ring-2
                    focus-visible:ring-teal-400/40
                    dark:border-gray-700
                    dark:bg-white/5
                    dark:text-gray-200
                  "
                  style={{
                    fontFamily:
                      "'Manrope', sans-serif",
                  }}
                />
              </div>
            </div>

            {/* Sort */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="sort"
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                Sort
              </label>

              <select
                id="sort"
                value={sidebarData.sort}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-gray-700
                  outline-none
                  transition-colors
                  duration-200
                  focus:border-teal-400
                  focus-visible:ring-2
                  focus-visible:ring-teal-400/40
                  dark:border-gray-700
                  dark:bg-white/5
                  dark:text-gray-200
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                <option value="desc">
                  Latest
                </option>

                <option value="asc">
                  Oldest
                </option>
              </select>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-2">
              <label
                htmlFor="category"
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                  dark:text-gray-200
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                Category
              </label>

              <select
                id="category"
                value={sidebarData.category}
                onChange={handleChange}
                className="
                  w-full
                  rounded-lg
                  border
                  border-gray-200
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-gray-700
                  outline-none
                  transition-colors
                  duration-200
                  focus:border-teal-400
                  focus-visible:ring-2
                  focus-visible:ring-teal-400/40
                  dark:border-gray-700
                  dark:bg-white/5
                  dark:text-gray-200
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                <option value="">
                  All Categories
                </option>

                <option value="uncategorized">
                  Uncategorized
                </option>

                <option value="reactjs">
                  React.js
                </option>

                <option value="nextjs">
                  Next.js
                </option>

                <option value="javascript">
                  JavaScript
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="
                mt-1
                w-full
                rounded-lg
                bg-teal-500
                py-2.5
                text-sm
                font-semibold
                text-white
                transition-colors
                duration-200
                hover:bg-teal-600
                focus-visible:outline
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-teal-600
              "
              style={{
                fontFamily:
                  "'Manrope', sans-serif",
              }}
            >
              Apply Filters
            </button>
          </form>
        </aside>

        {/* ===================================================
            RESULTS
        ==================================================== */}

        <div className="min-w-0 flex-1">

          <div
            className="
              mb-6
              flex
              items-baseline
              justify-between
              border-b
              border-gray-200
              pb-4
              dark:border-gray-800
            "
          >
            <h2
              className="
                text-2xl
                text-gray-900
                dark:text-gray-100
                sm:text-3xl
              "
              style={{
                fontFamily:
                  "'Cormorant Garamond', serif",
              }}
            >
              Results
            </h2>

            {!loading && posts.length > 0 && (
              <span
                className="
                  text-xs
                  text-gray-400
                  sm:text-sm
                "
              >
                {posts.length}{" "}
                {posts.length === 1
                  ? "post"
                  : "posts"}
              </span>
            )}
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[220px] w-full items-center justify-center">
              <span
                className="
                  inline-block
                  h-8
                  w-8
                  rounded-full
                  border-2
                  border-teal-200
                  border-t-teal-500
                  motion-safe:animate-spin
                "
                role="status"
                aria-label="Loading results"
              />
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div
              className="
                rounded-2xl
                border
                border-red-100
                bg-red-50
                px-6
                py-12
                text-center
                dark:border-red-900/40
                dark:bg-red-950/20
              "
            >
              <h3
                className="
                  mb-2
                  text-xl
                  text-red-700
                  dark:text-red-300
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                Search failed
              </h3>

              <p
                className="
                  text-sm
                  text-red-600
                  dark:text-red-400
                "
              >
                {error}
              </p>
            </div>
          )}

          {/* No Results */}
          {hasNoResults && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-teal-100
                bg-[#f6fdfb]
                px-6
                py-16
                text-center
                dark:border-teal-900/40
                dark:bg-white/5
              "
            >
              <svg
                className="
                  mb-4
                  h-10
                  w-10
                  text-teal-400
                "
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                />

                <line
                  x1="21"
                  y1="21"
                  x2="16.65"
                  y2="16.65"
                />
              </svg>

              <h3
                className="
                  mb-2
                  text-xl
                  text-gray-800
                  dark:text-gray-100
                  sm:text-2xl
                "
                style={{
                  fontFamily:
                    "'Cormorant Garamond', serif",
                }}
              >
                No posts found
              </h3>

              <p
                className="
                  max-w-sm
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                  sm:text-base
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                Try adjusting your search term,
                category, or sort order.
              </p>
            </div>
          )}

          {/* Results */}
          {hasResults && (
            <div
              className="
                grid
                grid-cols-1
                gap-6
                sm:grid-cols-2
                sm:gap-7
                xl:grid-cols-3
              "
            >
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}
            </div>
          )}

          {/* Show More */}
          {showMore && !loading && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={handleShowMore}
                className="
                  rounded-sm
                  px-3
                  py-1.5
                  text-base
                  font-semibold
                  text-teal-600
                  transition-colors
                  duration-200
                  hover:underline
                  hover:underline-offset-4
                  focus-visible:outline
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-teal-500
                  dark:text-teal-400
                "
                style={{
                  fontFamily:
                    "'Manrope', sans-serif",
                }}
              >
                Show More
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          ANIMATION
      ====================================================== */}

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
          * {
            animation: none !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}