import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import PostCard from "../components/PostCard";
import { BASE_URL } from "../config";

/* ------------------------------------------------------------------ */
/* Small utility hook: tracks prefers-reduced-motion live              */
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

/* ------------------------------------------------------------------ */
/* Small utility hook: reveal-once IntersectionObserver                */
/* ------------------------------------------------------------------ */
function useInViewOnce(options) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}

/* ------------------------------------------------------------------ */
/* Three.js wireframe globe                                            */
/* ------------------------------------------------------------------ */
function HeroGlobe({ reducedMotion }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    let width = mountEl.clientWidth || 1;
    let height = mountEl.clientHeight || 1;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 4.2;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.pointerEvents = "none";
    mountEl.appendChild(renderer.domElement);

    // Lightweight, clearly-visible wireframe globe
    const geometry = new THREE.IcosahedronGeometry(1.6, 2);
    const material = new THREE.MeshBasicMaterial({
      color: 0x0d9488, // teal-600 range, enough contrast on mint bg
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const globe = new THREE.Mesh(geometry, material);
    scene.add(globe);

    // Thin outer ring for a bit of depth, still light on performance
    const outerGeometry = new THREE.IcosahedronGeometry(1.95, 1);
    const outerMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee, // cyan-400
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const outerGlobe = new THREE.Mesh(outerGeometry, outerMaterial);
    scene.add(outerGlobe);

    let frameId = null;
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    if (!reducedMotion) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!reducedMotion) {
        globe.rotation.y += 0.002;
        outerGlobe.rotation.y -= 0.0012;

        // Subtle mouse parallax, smoothed toward target
        targetRotation.x = mouse.y * 0.15;
        targetRotation.y += (mouse.x * 0.2 - targetRotation.y) * 0.02;

        globe.rotation.x += (targetRotation.x - globe.rotation.x) * 0.05;
        outerGlobe.rotation.x = globe.rotation.x;
      }

      renderer.render(scene, camera);
    };

    if (reducedMotion) {
      // Render a single static frame, no loop, no listeners
      renderer.render(scene, camera);
    } else {
      animate();
    }

    // Responsive sizing
    const handleResize = () => {
      if (!mountEl) return;
      width = mountEl.clientWidth || 1;
      height = mountEl.clientHeight || 1;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(mountEl);
    } else {
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener("resize", handleResize);
      }

      geometry.dispose();
      material.dispose();
      outerGeometry.dispose();
      outerMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode === mountEl) {
        mountEl.removeChild(renderer.domElement);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [gridRef, gridInView] = useInViewOnce({ threshold: 0.15 });

  // Fetch recent posts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(BASE_URL + "/api/post/getposts?limit=9");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPosts();
  }, []);

  // Trigger hero entrance animation shortly after mount
  useEffect(() => {
    if (prefersReducedMotion) {
      setMounted(true);
      return;
    }
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, [prefersReducedMotion]);

  const entrance = (delayMs) =>
    prefersReducedMotion
      ? "opacity-100 translate-y-0"
      : `transition-all duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`;

  const entranceStyle = (delayMs) =>
    prefersReducedMotion ? undefined : { transitionDelay: `${delayMs}ms` };

  return (
    <div className="overflow-x-hidden">
      {/* ============================================================ */}
      {/* HERO SECTION                                                  */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden">
        {/* Decorative background layers (subtle, non-interactive) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          {/* soft radial glow */}
          <div
            className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-30"
            style={{
              background:
                "radial-gradient(circle, var(--teal-500) 0%, transparent 70%)",
            }}
          />
          <div
            className="absolute top-1/3 -right-32 w-[380px] h-[380px] rounded-full blur-3xl opacity-20"
            style={{
              background:
                "radial-gradient(circle, var(--cyan-500) 0%, transparent 70%)",
            }}
          />
          {/* faint dotted pattern */}
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "radial-gradient(var(--line) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-10">
            {/* LEFT: editorial content */}
            <div className="w-full lg:w-[54%] flex flex-col gap-5 sm:gap-6 text-center lg:text-left items-center lg:items-start">
              {/* Eyebrow */}
              <div
                className={`flex items-center gap-3 ${entrance(80)}`}
                style={entranceStyle(80)}
              >
                <span className="h-px w-8 bg-gradient-to-r from-[var(--teal-500)] to-[var(--cyan-500)]" />
                <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal-700)] dark:text-[var(--accent)]">
                  Thoughts on the web
                </span>
              </div>

              {/* Heading */}
              <h1
                className={`font-bold tracking-tight leading-[1.05] text-[var(--text)] ${entrance(
                  180
                )}`}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 5.5vw, 72px)",
                  ...entranceStyle(180),
                }}
              >
                Welcome to STACKFRAME
              </h1>

              {/* Description */}
              <p
                className={`text-sm sm:text-base leading-[1.7] text-[var(--text-muted)] max-w-[560px] ${entrance(
                  310
                )}`}
                style={entranceStyle(310)}
              >
                Here you'll find a variety of articles and tutorials on
                topics such as web development, software engineering, and
                programming languages.
              </p>

              {/* View all posts CTA */}
              <div
                className={entrance(440)}
                style={entranceStyle(440)}
              >
                <Link
                  to="/search"
                  className="group relative inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--teal-700)] dark:text-[var(--accent)]"
                >
                  <span className="relative">
                    View all posts
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--teal-500)] to-[var(--cyan-500)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* RIGHT: Three.js wireframe globe */}
            <div
              className={`w-full lg:w-[46%] flex justify-center lg:justify-end ${
                prefersReducedMotion
                  ? "opacity-100"
                  : `transition-opacity duration-[1200ms] ease-out ${
                      mounted ? "opacity-100" : "opacity-0"
                    }`
              }`}
            >
              <div className="relative w-full max-w-[300px] sm:max-w-[380px] lg:max-w-none lg:w-full aspect-square">
                <HeroGlobe reducedMotion={prefersReducedMotion} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA / RESOURCE SECTION                                        */}
      {/* ============================================================ */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div
            className="rounded-3xl border shadow-sm px-6 sm:px-10 py-10 sm:py-14"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--line)",
              background:
                "linear-gradient(135deg, rgba(20,184,166,0.06) 0%, var(--surface) 55%)",
            }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
              <div className="flex-1 text-center md:text-left">
                <h2
                  className="font-bold tracking-tight leading-tight text-[var(--text)]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(30px, 4vw, 48px)",
                  }}
                >
                  Want to learn more about web development?
                </h2>
                <p className="text-sm sm:text-base leading-[1.7] text-[var(--text-muted)] mt-3 max-w-[480px] mx-auto md:mx-0">
                  Check out these resources with JavaScript projects
                </p>

                <a
                  href="https://www.youtube.com/watch?v=G3e-cpL7ofc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-[var(--teal-700)] dark:text-[var(--accent)]"
                >
                  <span className="relative">
                    View Resources
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--teal-500)] to-[var(--cyan-500)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                  </span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
                  >
                    →
                  </span>
                </a>
              </div>

              <div
                className="shrink-0 rounded-2xl p-6 sm:p-8"
                style={{ backgroundColor: "rgba(20,184,166,0.08)" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
                  alt="JavaScript logo"
                  className="w-28 h-28 sm:w-36 sm:h-36 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* RECENT POSTS SECTION                                          */}
      {/* ============================================================ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {posts && posts.length > 0 && (
          <div ref={gridRef} className="flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-[var(--teal-700)] dark:text-[var(--accent)]">
                Recent Stories
              </span>
              <h2
                className="font-bold tracking-tight text-[var(--text)]"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                }}
              >
                Recent Posts
              </h2>
            </div>

            {/* Post cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {posts.map((post, index) => (
                <div
                  key={post._id}
                  className={`transition-all duration-700 [transition-timing-function:cubic-bezier(.2,.8,.2,1)] ${
                    gridInView || prefersReducedMotion
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-7"
                  }`}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { transitionDelay: `${index * 100}ms` }
                  }
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>

            {/* Link to all posts page */}
            <Link
              to="/search"
              className="group relative inline-flex items-center gap-1.5 mx-auto text-base font-semibold text-[var(--teal-700)] dark:text-[var(--accent)]"
            >
              <span className="relative">
                View all posts
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-[var(--teal-500)] to-[var(--cyan-500)] transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 ease-out group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}