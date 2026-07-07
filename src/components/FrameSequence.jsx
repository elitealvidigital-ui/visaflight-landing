import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const manifestCache = { value: null };

async function loadManifest() {
  if (manifestCache.value) return manifestCache.value;
  const response = await fetch("/animations/manifest.json");
  if (!response.ok) throw new Error("Could not load animation manifest");
  manifestCache.value = await response.json();
  return manifestCache.value;
}

function preload(frames, index) {
  frames.slice(index, index + 5).forEach((src) => {
    const img = new Image();
    img.src = src;
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
}) {
  const rootRef = useRef(null);
  const [visible, setVisible] = useState(eager);
  const [frames, setFrames] = useState([]);
  const [frameIndex, setFrameIndex] = useState(0);

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
        setFrames(manifest[sequence] || []);
      })
      .catch(() => {
        if (alive) setFrames([]);
      });

    return () => {
      alive = false;
    };
  }, [sequence, visible]);

  useEffect(() => {
    if (!frames.length) return;
    preload(frames, Math.max(0, frameIndex - 1));
  }, [frames, frameIndex]);

  useEffect(() => {
    if (!frames.length || mode !== "loop") return;

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
  }, [frames, fps, mode]);

  useGSAP(
    () => {
      if (!frames.length || mode !== "scroll" || !rootRef.current) return;

      const proxy = { frame: 0 };
      gsap.to(proxy, {
        frame: frames.length - 1,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
        onUpdate: () => {
          const next = Math.round(proxy.frame);
          setFrameIndex((current) => (current === next ? current : next));
        },
      });
    },
    { dependencies: [frames.length, mode], scope: rootRef },
  );

  const src = frames[frameIndex] || frames[0];

  return (
    <div ref={rootRef} className={`frame-sequence ${className}`}>
      {src ? (
        <img className={imgClassName} src={src} alt={alt} draggable="false" />
      ) : (
        <div className="frame-sequence__fallback" />
      )}
    </div>
  );
}
