import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const manifestCache = { value: null };
const preloadedFrames = new Set();
const assetBase = import.meta.env.BASE_URL;
const assetUrl = (src) => `${assetBase}${src.replace(/^\/+/, "")}`;

async function loadManifest() {
  if (manifestCache.value) return manifestCache.value;
  const response = await fetch(assetUrl("animations/manifest.json"));
  if (!response.ok) throw new Error("Could not load animation manifest");
  manifestCache.value = await response.json();
  return manifestCache.value;
}

function preload(frames, index, radius = 7) {
  const start = Math.max(0, index - 2);
  const end = Math.min(frames.length, index + radius);
  frames.slice(start, end).forEach((src) => {
    if (preloadedFrames.has(src)) return;
    preloadedFrames.add(src);
    const img = new Image();
    img.src = assetUrl(src);
  });
}

export default function FrameSequence({
  sequence,
  mode = "loop",
  className = "",
  imgClassName = "",
  alt = "",
  eager = false,
  fps = 24,
  posterFrame = 0,
  scrollTrigger = null,
  mobilePoster = true,
}) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(eager);
  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);
  const [isMobilePoster, setIsMobilePoster] = useState(false);

  useEffect(() => {
    if (mode !== "scroll" || !mobilePoster || typeof window === "undefined") return;

    const query = window.matchMedia("(max-width: 620px)");
    const update = () => setIsMobilePoster(query.matches);
    update();
    if (query.addEventListener) {
      query.addEventListener("change", update);
      return () => query.removeEventListener("change", update);
    }
    query.addListener(update);
    return () => query.removeListener(update);
  }, [mobilePoster, mode]);

  useEffect(() => {
    if (eager || !rootRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "700px" },
    );

    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [eager]);

  useEffect(() => {
    if (!visible) return;
    let alive = true;

    loadManifest()
      .then((manifest) => {
        if (!alive) return;
        const nextFrames = manifest[sequence] || [];
        setFrames(nextFrames);
        setFrameIndex(Math.min(posterFrame, Math.max(0, nextFrames.length - 1)));
        window.setTimeout(() => ScrollTrigger.refresh(), 80);
      })
      .catch(() => {
        if (alive) setFrames([]);
      });

    return () => {
      alive = false;
    };
  }, [posterFrame, sequence, visible]);

  useEffect(() => {
    if (!frames.length) return;
    preload(frames, Math.max(0, frameIndex - 1));
  }, [frames, frameIndex]);

  useEffect(() => {
    if (!frames.length || mode !== "loop" || isMobilePoster) return;

    let raf = 0;
    let last = performance.now();
    const interval = 1000 / fps;

    const tick = (time) => {
      if (time - last >= interval) {
        last = time;
        setFrameIndex((current) => (current + 1) % frames.length);
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [frames, fps, isMobilePoster, mode]);

  useGSAP(
    () => {
      if (!frames.length || mode !== "scroll" || !rootRef.current || isMobilePoster) return;

      const proxy = { frame: 0 };
      let queuedFrame = 0;
      let raf = 0;
      const render = () => {
        setFrameIndex((current) => (current === queuedFrame ? current : queuedFrame));
        raf = 0;
      };
      const config =
        typeof scrollTrigger === "function"
          ? scrollTrigger(rootRef.current)
          : scrollTrigger || {
              trigger: rootRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            };

      gsap.to(proxy, {
        frame: frames.length - 1,
        ease: "none",
        scrollTrigger: {
          scrub: 1,
          invalidateOnRefresh: true,
          ...config,
        },
        onUpdate: () => {
          queuedFrame = Math.round(proxy.frame);
          if (!raf) raf = requestAnimationFrame(render);
        },
      });

      return () => {
        if (raf) cancelAnimationFrame(raf);
      };
    },
    {
      dependencies: [frames.length, isMobilePoster, mode],
      revertOnUpdate: true,
      scope: rootRef,
    },
  );

  const src = frames[frameIndex] || frames[0];

  return (
    <div ref={rootRef} className={`frame-sequence ${className}`}>
      {src ? (
        <img
          className={imgClassName}
          src={assetUrl(src)}
          alt={alt}
          draggable="false"
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : (
        <div className="frame-sequence__fallback" />
      )}
    </div>
  );
}
