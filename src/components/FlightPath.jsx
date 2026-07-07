import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FlightPath() {
  const layerRef = useRef(null);
  const pathRef = useRef(null);
  const maskPathRef = useRef(null);
  const planeRef = useRef(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const maskPath = maskPathRef.current;
      const plane = planeRef.current;
      if (!path || !maskPath || !plane) return;

      const length = path.getTotalLength();
      gsap.set(maskPath, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });
      gsap.set(plane, { autoAlpha: 0, xPercent: -50, yPercent: -50 });

      const placePlane = (progress) => {
        const progressLength = length * progress;
        const point = path.getPointAtLength(progressLength);
        const usePrevious = progressLength > length - 1.4;
        const origin = usePrevious
          ? path.getPointAtLength(Math.max(0, progressLength - 1.4))
          : point;
        const next = usePrevious
          ? point
          : path.getPointAtLength(Math.min(length, progressLength + 1.4));
        const angle =
          (Math.atan2(next.y - origin.y, next.x - origin.x) * 180) / Math.PI;

        gsap.set(plane, {
          x: (point.x / 100) * window.innerWidth,
          y: (point.y / 100) * window.innerHeight,
          rotation: angle,
          autoAlpha: progress > 0.015 ? 1 : 0,
        });
      };

      const updateProgress = (progress) => {
        gsap.set(maskPath, { strokeDashoffset: length * (1 - progress) });
        placePlane(progress);
      };

      updateProgress(0);

      const flightProgress = { value: 0 };
      gsap.to(flightProgress, {
        value: 1,
        ease: "none",
        onUpdate: () => updateProgress(flightProgress.value),
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 1.2,
          refreshPriority: -1000,
          invalidateOnRefresh: true,
          onRefresh: (self) => updateProgress(self.progress),
        },
      });

      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 400);
      return () => window.clearTimeout(refreshTimer);
    },
    { scope: layerRef },
  );

  return (
    <div ref={layerRef} className="flight-layer" aria-hidden="true">
      <svg className="flight-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="flight-route-mask" maskUnits="userSpaceOnUse">
            <path
              ref={maskPathRef}
              className="flight-route-mask"
              d="M 66 5 C 74 13 73 23 65 31 C 74 40 74 49 66 58 C 75 67 74 75 68 82 C 76 88 74 94 64 90"
            />
          </mask>
        </defs>
        <path
          ref={pathRef}
          className="flight-route flight-route--progress"
          mask="url(#flight-route-mask)"
          d="M 66 5 C 74 13 73 23 65 31 C 74 40 74 49 66 58 C 75 67 74 75 68 82 C 76 88 74 94 64 90"
        />
      </svg>
      <div ref={planeRef} className="flight-plane">
        <svg viewBox="0 0 220 140" role="img">
          <defs>
            <linearGradient id="jet-body" x1="20" x2="210" y1="70" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#d7e4f5" />
              <stop offset="0.48" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c9d7ea" />
            </linearGradient>
            <linearGradient id="jet-blue" x1="12" x2="138" y1="28" y2="112" gradientUnits="userSpaceOnUse">
              <stop offset="0" stopColor="#10265c" />
              <stop offset="1" stopColor="#061633" />
            </linearGradient>
          </defs>
          <path className="jet-shadow" d="M27 82c37 22 111 25 169 6 8-3 10-11 2-15-54 14-122 13-181-5-7 4-4 10 10 14Z" />
          <path className="jet-wing jet-wing--top" d="M93 62 24 18c-7-5-16-1-15 7l2 12 88 43 22-8Z" />
          <path className="jet-wing jet-wing--bottom" d="M93 78 24 122c-7 5-16 1-15-7l2-12 88-43 22 8Z" />
          <path className="jet-tail jet-tail--top" d="M45 63 17 43c-7-5-15 0-13 8l4 17 42 7Z" />
          <path className="jet-tail jet-tail--bottom" d="M45 77 17 97c-7 5-15 0-13-8l4-17 42-7Z" />
          <path className="jet-body" d="M22 70C45 45 121 38 184 47c21 3 34 13 34 23s-13 20-34 23C121 102 45 95 22 70Z" />
          <path className="jet-spine" d="M43 70c36-11 91-13 148-4" />
          <path className="jet-belly" d="M43 70c36 11 91 13 148 4" />
          <path className="jet-cockpit" d="M183 57c14 2 24 7 28 13-7 2-18 2-31 0-3-5-2-9 3-13Z" />
          <path className="jet-tail-fin" d="M38 55 18 20c-2-4 2-8 6-6l44 28-12 21Z" />
          <path className="jet-gold jet-gold--top" d="M96 62 16 28" />
          <path className="jet-gold jet-gold--bottom" d="M96 78 16 112" />
          <circle className="jet-engine jet-engine--top" cx="91" cy="53" r="12" />
          <circle className="jet-engine jet-engine--bottom" cx="91" cy="87" r="12" />
          <path className="jet-engine-core" d="M84 53h14M84 87h14" />
          <g className="jet-windows">
            <circle cx="129" cy="62" r="2.2" />
            <circle cx="139" cy="61" r="2.2" />
            <circle cx="149" cy="61" r="2.2" />
            <circle cx="159" cy="61" r="2.2" />
            <circle cx="169" cy="62" r="2.2" />
          </g>
        </svg>
      </div>
    </div>
  );
}
