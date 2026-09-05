import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/* Small local hook: tracks prefers-reduced-motion live                */
/* (kept self-contained here — index.css / other files are untouched) */
/* ------------------------------------------------------------------ */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    const handler = (e) => setReduced(e.matches);
    mq.addEventListener
      ? mq.addEventListener("change", handler)
      : mq.addListener(handler);

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handler)
        : mq.removeListener(handler);
    };
  }, []);

  return reduced;
}

const TILT_MAX_DEG = 2.5;
const LIFT_PX = 5;
const PERSPECTIVE_PX = 1000;

export default function CallToAction() {
  const cardRef = useRef(null);
  const rafRef = useRef(null);
  const pendingRef = useRef({ x: 0, y: 0, w: 1, h: 1 });
  const tiltEnabledRef = useRef(false);

  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");

    const update = () => {
      tiltEnabledRef.current = mq.matches && !prefersReducedMotion;
    };

    update();

    mq.addEventListener
      ? mq.addEventListener("change", update)
      : mq.addListener(update);

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", update)
        : mq.removeListener(update);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion]);

  const applyTilt = () => {
    rafRef.current = null;
    const card = cardRef.current;
    if (!card) return;

    const { x, y, w, h } = pendingRef.current;
    const centerX = w / 2;
    const centerY = h / 2;

    const rotateY = ((x - centerX) / centerX) * TILT_MAX_DEG;
    const rotateX = -((y - centerY) / centerY) * TILT_MAX_DEG;

    card.style.transition = "transform 0.1s linear";
    card.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${LIFT_PX}px)`;
  };

  const handlePointerMove = (e) => {
    if (e.pointerType === "touch" || !tiltEnabledRef.current) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      w: rect.width,
      h: rect.height,
    };

    if (rafRef.current == null) {
      rafRef.current = requestAnimationFrame(applyTilt);
    }
  };

  const resetTilt = (e) => {
    if (e && e.pointerType === "touch") return;
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    const card = cardRef.current;
    if (!card) return;

    card.style.transition = "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";
    card.style.transform = `perspective(${PERSPECTIVE_PX}px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <section className="my-10" aria-labelledby="cta-heading">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: `perspective(${PERSPECTIVE_PX}px) rotateX(0deg) rotateY(0deg) translateY(0px)`,
          background:
            "linear-gradient(135deg, #e8f7f4 0%, #f1faf8 48%, #e9fbff 100%)",
        }}
        className="group relative overflow-hidden rounded-[32px] border border-[var(--line)] px-6 py-10 shadow-[0_2px_8px_-1px_rgba(15,30,30,0.06)] transition-shadow duration-[350ms] ease-[cubic-bezier(.2,.8,.2,1)] hover:shadow-[0_18px_40px_-8px_rgba(19,78,74,0.16),0_0_28px_-8px_rgba(20,184,166,0.3)] dark:border-[var(--line)] dark:bg-[var(--surface-raised)] dark:shadow-[0_2px_8px_-1px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_18px_40px_-8px_rgba(0,0,0,0.55),0_0_28px_-8px_rgba(45,212,191,0.25)] sm:px-10 sm:py-12 dark:[background:none]"
      >
        {/* Decorative background layer — stays behind content, low opacity */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--teal-400) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute -bottom-20 -right-10 h-72 w-72 rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, var(--cyan-400) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "radial-gradient(var(--line) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
        </div>

        <div
          className="relative flex flex-col items-center gap-8 text-center md:flex-row md:items-center md:gap-10 md:text-left"
          style={{ transform: "translateZ(18px)" }}
        >
          {/* LEFT: editorial content */}
          <div className="flex flex-1 flex-col items-center gap-3 md:items-start">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[var(--teal-700)] dark:text-[var(--accent)]">
              Resources
            </span>

            <h2
              id="cta-heading"
              className="font-bold leading-tight tracking-tight text-[var(--text)]"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(30px, 4vw, 48px)",
              }}
            >
              Want to learn more about JavaScript?
            </h2>

            <p className="max-w-[480px] text-sm leading-[1.7] text-[var(--text-muted)] sm:text-base">
              Checkout these resources with 100 JavaScript Projects
            </p>

            <a
              href="https://www.100jsprojects.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link relative mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 dark:text-[var(--accent)]"
            >
              <span className="relative">
                100 JavaScript Projects
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[1.5px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--teal-500)] to-[var(--cyan-500)] transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                />
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover/link:translate-x-[3px]"
              >
                →
              </span>
            </a>
          </div>

          {/* RIGHT: JavaScript visual */}
          <div
            className="flex flex-1 justify-center md:justify-end"
            style={{ transform: "translateZ(28px)" }}
          >
            <div
              className={`rounded-2xl bg-[var(--surface)] p-6 shadow-[0_8px_24px_-4px_rgba(19,78,74,0.12)] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] ${
                prefersReducedMotion
                  ? ""
                  : "group-hover:-translate-y-1.5 group-hover:rotate-1"
              }`}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                alt="JavaScript logo"
                className="h-28 w-28 object-contain sm:h-36 sm:w-36"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}