import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Tracks prefers-reduced-motion live                                  */
/* ------------------------------------------------------------------ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    setReduced(mq.matches);

    const handler = (e) => setReduced(e.matches);

    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
    } else {
      mq.addListener(handler);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handler);
      } else {
        mq.removeListener(handler);
      }
    };
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------ */
/* Builds a clean plain-text excerpt from HTML content                 */
/* ------------------------------------------------------------------ */
function buildExcerpt(rawContent, maxLength = 110) {
  if (!rawContent || typeof rawContent !== "string") {
    return "";
  }

  const plain = rawContent
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!plain) {
    return "";
  }

  return plain.length > maxLength
    ? `${plain.slice(0, maxLength).trim()}…`
    : plain;
}

const TILT_MAX_DEG = 4;
const LIFT_PX = 6;
const PERSPECTIVE_PX = 1000;

export default function PostCard({ post }) {
  const cardRef = useRef(null);
  const rafRef = useRef(null);

  const pendingRef = useRef({
    x: 0,
    y: 0,
    w: 1,
    h: 1,
  });

  const tiltEnabledRef = useRef(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  /* ---------------------------------------------------------------- */
  /* Enable tilt only for real mouse/pointer devices                 */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      tiltEnabledRef.current =
        mq.matches && !prefersReducedMotion;
    };

    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
    } else {
      mq.addListener(update);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", update);
      } else {
        mq.removeListener(update);
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion]);

  /* ---------------------------------------------------------------- */
  /* Apply subtle 3D tilt                                             */
  /* ---------------------------------------------------------------- */
  const applyTilt = () => {
    rafRef.current = null;

    const card = cardRef.current;

    if (!card) {
      return;
    }

    const { x, y, w, h } = pendingRef.current;

    const centerX = w / 2;
    const centerY = h / 2;

    const rotateY =
      ((x - centerX) / centerX) * TILT_MAX_DEG;

    const rotateX =
      -((y - centerY) / centerY) * TILT_MAX_DEG;

    card.style.transition =
      "transform 0.1s linear";

    card.style.transform = `
      perspective(${PERSPECTIVE_PX}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-${LIFT_PX}px)
      scale(1.01)
    `;
  };

  /* ---------------------------------------------------------------- */
  /* Pointer movement                                                  */
  /* ---------------------------------------------------------------- */
  const handlePointerMove = (e) => {
    if (
      e.pointerType === "touch" ||
      !tiltEnabledRef.current
    ) {
      return;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    const rect = card.getBoundingClientRect();

    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };

    if (rafRef.current == null) {
      rafRef.current =
        requestAnimationFrame(applyTilt);
    }
  };

  /* ---------------------------------------------------------------- */
  /* Reset card transform                                              */
  /* ---------------------------------------------------------------- */
  const resetTilt = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const card = cardRef.current;

    if (!card) {
      return;
    }

    card.style.transition =
      "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";

    card.style.transform = `
      perspective(${PERSPECTIVE_PX}px)
      rotateX(0deg)
      rotateY(0deg)
      translateY(0px)
      scale(1)
    `;
  };

  const handlePointerLeave = (e) => {
    if (
      e.pointerType === "touch" ||
      !tiltEnabledRef.current
    ) {
      return;
    }

    resetTilt();
  };

  /* ---------------------------------------------------------------- */
  /* Existing post data                                               */
  /* ---------------------------------------------------------------- */
  const excerpt = buildExcerpt(post?.content);

  const dateStr = post?.createdAt
    ? new Date(post.createdAt).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      )
    : "";

  const imageTransitionClass =
    prefersReducedMotion
      ? ""
      : "transition-transform duration-[600ms] ease-[cubic-bezier(.2,.8,.2,1)] group-hover:scale-[1.05]";

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        transform: `
          perspective(${PERSPECTIVE_PX}px)
          rotateX(0deg)
          rotateY(0deg)
          translateY(0px)
          scale(1)
        `,
      }}
      className="
        group
        relative
        flex
        h-full
        w-full
        flex-col
        overflow-hidden
        rounded-[24px]
        border
        border-gray-200/80
        bg-white
        shadow-[0_6px_22px_rgba(15,30,30,0.055)]
        transition-[box-shadow,border-color]
        duration-300
        ease-out
        hover:border-teal-300
        hover:shadow-[0_18px_42px_rgba(15,118,110,0.12)]
        dark:border-gray-800
        dark:bg-[#101918]
        dark:hover:border-teal-800
        dark:hover:shadow-[0_18px_42px_rgba(0,0,0,0.35)]
      "
    >
      {/* ============================================================
          IMAGE
      ============================================================= */}
      <div
        className="
          relative
          overflow-hidden
          rounded-t-[24px]
          bg-gray-100
          dark:bg-gray-900
        "
        style={{
          transform: "translateZ(20px)",
        }}
      >
        <Link
          to={`/post/${post.slug}`}
          aria-label={post.title}
          className="
            relative
            block
            aspect-[16/10]
            w-full
            overflow-hidden
          "
        >
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className={`
              h-full
              w-full
              object-cover
              ${imageTransitionClass}
            `}
          />

          {/* Subtle editorial image overlay */}
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-teal-900/0
              transition-colors
              duration-500
              group-hover:bg-teal-900/[0.06]
              dark:group-hover:bg-teal-900/[0.12]
            "
          />
        </Link>

        {/* ========================================================
            CATEGORY
        ========================================================= */}
        {post.category && (
          <span
            style={{
              transform: "translateZ(14px)",
              fontFamily: "'Manrope', sans-serif",
            }}
            className="
              absolute
              left-4
              top-4
              rounded-full
              border
              border-white/70
              bg-white/95
              px-3
              py-1.5
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-teal-700
              shadow-[0_4px_12px_rgba(15,30,30,0.08)]
              backdrop-blur-sm
              dark:border-gray-700
              dark:bg-[#101918]/95
              dark:text-teal-400
            "
          >
            {post.category}
          </span>
        )}
      </div>

      {/* ============================================================
          CONTENT
      ============================================================= */}
      <div
        className="
          flex
          flex-1
          flex-col
          p-5
          sm:p-6
        "
        style={{
          transform: "translateZ(12px)",
        }}
      >
        {/* Small editorial marker */}
        <div
          className="
            mb-3
            flex
            items-center
            gap-2
          "
          aria-hidden="true"
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-teal-500
            "
          />

          <span
            className="
              h-px
              w-10
              bg-teal-200
              transition-all
              duration-300
              group-hover:w-14
              dark:bg-teal-900
            "
          />
        </div>

        {/* Title */}
        <h3
          className="
            line-clamp-2
            text-[25px]
            leading-[1.05]
            tracking-[-0.01em]
            text-gray-900
            transition-colors
            duration-300
            group-hover:text-teal-700
            dark:text-white
            dark:group-hover:text-teal-400
            sm:text-[27px]
          "
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontWeight: 600,
          }}
        >
          {post.title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p
            className="
              mt-3
              line-clamp-2
              text-[13px]
              leading-[1.7]
              text-gray-500
              dark:text-gray-400
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            {excerpt}
          </p>
        )}

        {/* ========================================================
            FOOTER
        ========================================================= */}
        <div
          className="
            mt-auto
            flex
            items-end
            justify-between
            gap-4
            border-t
            border-gray-100
            pt-4
            dark:border-gray-800
          "
        >
          {/* Date */}
          {dateStr ? (
            <span
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.08em]
                text-gray-400
                dark:text-gray-500
              "
              style={{
                fontFamily: "'Manrope', sans-serif",
              }}
            >
              {dateStr}
            </span>
          ) : (
            <span />
          )}

          {/* Read article */}
          <Link
            to={`/post/${post.slug}`}
            aria-label={`Read more about ${post.title}`}
            className="
              group/link
              inline-flex
              shrink-0
              items-center
              gap-2
              text-[13px]
              font-bold
              text-teal-700
              transition-colors
              duration-200
              hover:text-teal-600
              dark:text-teal-400
              dark:hover:text-teal-300
            "
            style={{
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            <span className="relative">
              Read article

              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  rounded-full
                  bg-teal-500
                  transition-transform
                  duration-300
                  ease-out
                  group-hover/link:scale-x-100
                "
              />
            </span>

            <span
              aria-hidden="true"
              className="
                transition-transform
                duration-200
                ease-out
                group-hover/link:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}