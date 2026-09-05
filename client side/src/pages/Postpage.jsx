import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
import { BASE_URL } from "../config";

export default function PostPage() {
  const { postSlug } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  // Fetch current post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BASE_URL}/api/post/getposts?slug=${postSlug}`
        );

        const data = await res.json();

        if (!res.ok || !data.posts?.length) {
          setError(true);
          setLoading(false);
          return;
        }

        setPost(data.posts[0]);
        setLoading(false);
        setError(false);
      } catch (error) {
        console.log(error.message);
        setError(true);
        setLoading(false);
      }
    };

    fetchPost();
  }, [postSlug]);

  // Fetch recent posts
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/api/post/getposts?limit=3`
        );

        const data = await res.json();

        if (res.ok) {
          setRecentPosts(data.posts || []);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRecentPosts();
  }, []);

  // Loading
  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf9] dark:bg-[#0d1412]">
        <div className="flex flex-col items-center">
          <div className="h-9 w-9 animate-spin rounded-full border-2 border-teal-100 border-t-teal-600 dark:border-teal-950 dark:border-t-teal-400" />

          <p
            className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-gray-400 dark:text-gray-500"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Loading article
          </p>
        </div>
      </main>
    );
  }

  // Error
  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#f8faf9] px-4 dark:bg-[#0d1412]">
        <div
          className="w-full max-w-md rounded-[24px] border border-gray-200 bg-white p-8 text-center shadow-[0_15px_45px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-white/[0.035] dark:shadow-none"
          role="alert"
        >
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-xl dark:bg-red-950/20">
            !
          </div>

          <h2
            className="mt-5 text-3xl font-semibold text-gray-900 dark:text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            Something went wrong
          </h2>

          <p
            className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400"
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            We couldn't load this article. Please try again shortly.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-teal-600 px-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-500"
          >
            Back to Journal
          </Link>
        </div>
      </main>
    );
  }

  const readTime = post?.content
    ? Math.max(1, Math.ceil(post.content.length / 1000))
    : 1;

  return (
    <main
      className="relative min-h-screen overflow-hidden bg-[#f8faf9] text-gray-900 dark:bg-[#0d1412] dark:text-gray-100"
      style={{
        fontFamily: "'Manrope', sans-serif",
      }}
    >
      {/* Subtle Background */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] opacity-80 dark:opacity-20"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(20,184,166,0.10), transparent 55%)",
        }}
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-[-140px] top-[180px] h-[360px] w-[360px] rounded-full bg-teal-200/20 blur-3xl dark:bg-teal-900/10"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            ARTICLE HEADER
        ====================================================== */}
        <header className="mx-auto flex max-w-[900px] flex-col items-center pt-14 text-center sm:pt-20 lg:pt-24">

          {/* Category */}
          <Link
            to={`/search?category=${post?.category}`}
            className="group"
          >
            <span className="inline-flex items-center rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700 backdrop-blur-sm transition-all duration-200 group-hover:border-teal-400 group-hover:bg-teal-50 dark:border-teal-900/60 dark:bg-white/[0.035] dark:text-teal-300 dark:group-hover:bg-teal-950/30">
              {post?.category}
            </span>
          </Link>

          {/* Title */}
          <h1
            className="mt-7 max-w-[900px] text-[42px] font-semibold leading-[1.04] tracking-[-0.02em] text-gray-900 sm:text-[58px] md:text-[70px] lg:text-[78px] dark:text-white"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
            }}
          >
            {post?.title}
          </h1>

          {/* Decorative Line */}
          <div
            className="mt-7 flex items-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-10 bg-teal-200 dark:bg-teal-900" />
            <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
            <span className="h-px w-10 bg-teal-200 dark:bg-teal-900" />
          </div>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            <span>
              {post?.createdAt
                ? new Date(post.createdAt).toLocaleDateString(
                    undefined,
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )
                : ""}
            </span>

            <span
              className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700"
              aria-hidden="true"
            />

            <span>
              {readTime} min read
            </span>
          </div>
        </header>

        {/* =====================================================
            FEATURE IMAGE
        ====================================================== */}
        <div className="mx-auto mt-10 max-w-[1040px] sm:mt-14">
          <div className="group relative overflow-hidden rounded-[24px] border border-gray-200/80 bg-white p-1.5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-white/[0.025] dark:shadow-none">
            <img
              src={post?.image}
              alt={post?.title}
              className="h-[280px] w-full rounded-[18px] object-cover transition-transform duration-700 group-hover:scale-[1.015] sm:h-[430px] lg:h-[560px]"
            />
          </div>
        </div>

        {/* =====================================================
            ARTICLE BODY
        ====================================================== */}
        <article
          className="post-content mx-auto mt-12 w-full max-w-[760px] text-[17px] leading-[1.9] text-gray-700 sm:mt-16 sm:text-[18px] dark:text-gray-300"
          dangerouslySetInnerHTML={{
            __html: post?.content,
          }}
        />

        {/* =====================================================
            CTA
        ====================================================== */}
        <div className="mx-auto my-14 w-full max-w-[760px] sm:my-20">
          <CallToAction />
        </div>

        {/* =====================================================
            COMMENTS
        ====================================================== */}
        {post && (
          <section className="mx-auto w-full max-w-[760px]">
            <div className="mb-7 flex items-end justify-between border-b border-gray-200 pb-4 dark:border-white/10">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-600 dark:text-teal-400">
                  Community
                </p>

                <h2
                  className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                  }}
                >
                  Comments
                </h2>
              </div>
            </div>

            <CommentSection postId={post._id} />
          </section>
        )}

        {/* =====================================================
            RECENT ARTICLES
        ====================================================== */}
        <section className="mt-20 border-t border-gray-200 pt-14 pb-20 sm:mt-24 sm:pt-16 dark:border-white/10">
          <div className="mb-9 flex flex-col items-center text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
              Continue Reading
            </p>

            <h2
              className="mt-2 text-4xl font-semibold text-gray-900 sm:text-5xl dark:text-white"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Recent Articles
            </h2>

            <div
              className="mt-4 h-px w-12 bg-teal-400 dark:bg-teal-700"
              aria-hidden="true"
            />
          </div>

          <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentPosts &&
              recentPosts.map((recentPost) => (
                <PostCard
                  key={recentPost._id}
                  post={recentPost}
                />
              ))}
          </div>
        </section>
      </div>

      {/* =====================================================
          ARTICLE CONTENT STYLES
      ====================================================== */}
      <style>{`
        .post-content {
          word-break: break-word;
        }

        .post-content h1,
        .post-content h2,
        .post-content h3,
        .post-content h4 {
          font-family: 'Cormorant Garamond', serif;
          color: inherit;
          line-height: 1.2;
          font-weight: 600;
          margin-top: 2em;
          margin-bottom: 0.7em;
        }

        .post-content h1 {
          font-size: 2.1em;
        }

        .post-content h2 {
          font-size: 1.7em;
        }

        .post-content h3 {
          font-size: 1.4em;
        }

        .post-content h4 {
          font-size: 1.15em;
        }

        .post-content p {
          margin-bottom: 1.45em;
        }

        .post-content strong {
          font-weight: 700;
          color: inherit;
        }

        .post-content em {
          font-style: italic;
        }

        .post-content a {
          color: #0d9488;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 4px;
          transition: color 200ms ease;
        }

        .post-content a:hover {
          color: #0f766e;
        }

        html.dark .post-content a {
          color: #2dd4bf;
        }

        html.dark .post-content a:hover {
          color: #5eead4;
        }

        .post-content ul,
        .post-content ol {
          margin: 1.4em 0;
          padding-left: 1.5em;
        }

        .post-content ul {
          list-style: disc;
        }

        .post-content ol {
          list-style: decimal;
        }

        .post-content li {
          margin-bottom: 0.55em;
          padding-left: 0.2em;
        }

        .post-content blockquote {
          margin: 2em 0;
          padding: 1.1em 1.4em;
          border-left: 3px solid #14b8a6;
          border-radius: 0 12px 12px 0;
          background: #f0fdfa;
          font-style: italic;
          color: inherit;
        }

        html.dark .post-content blockquote {
          background: rgba(20, 184, 166, 0.07);
          border-left-color: #2dd4bf;
        }

        .post-content code {
          border-radius: 6px;
          background: #eef2f1;
          padding: 0.15em 0.4em;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.88em;
        }

        html.dark .post-content code {
          background: rgba(255, 255, 255, 0.08);
        }

        .post-content pre {
          margin: 1.8em 0;
          overflow-x: auto;
          border: 1px solid #dfe7e5;
          border-radius: 14px;
          background: #f1f5f4;
          padding: 1.1em 1.2em;
          font-size: 0.9em;
          line-height: 1.7;
        }

        html.dark .post-content pre {
          border-color: rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
        }

        .post-content pre code {
          background: transparent;
          padding: 0;
        }

        .post-content img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 2em auto;
          border-radius: 14px;
        }

        .post-content hr {
          border: 0;
          border-top: 1px solid #dfe7e5;
          margin: 2.8em 0;
        }

        html.dark .post-content hr {
          border-top-color: rgba(255, 255, 255, 0.1);
        }

        .post-content table {
          display: block;
          width: 100%;
          overflow-x: auto;
          border-collapse: collapse;
          margin: 2em 0;
        }

        .post-content th,
        .post-content td {
          border: 1px solid #dfe7e5;
          padding: 0.65em 0.85em;
          text-align: left;
        }

        html.dark .post-content th,
        html.dark .post-content td {
          border-color: rgba(255, 255, 255, 0.1);
        }

        @media (max-width: 640px) {
          .post-content {
            font-size: 16px;
            line-height: 1.85;
          }

          .post-content h1 {
            font-size: 1.8em;
          }

          .post-content h2 {
            font-size: 1.5em;
          }

          .post-content h3 {
            font-size: 1.3em;
          }
        }
      `}</style>
    </main>
  );
}