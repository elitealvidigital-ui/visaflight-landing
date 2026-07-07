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

      const updateProgress = (progress) => {
        gsap.set(maskPath, { strokeDashoffset: length * (1 - progress) });
        placePlane(progress);
      };

      const placePlane = (progress) => {
        const progressLength = length * progress;
        const point = path.getPointAtLength(progressLength);
        const next = path.getPointAtLength(Math.min(length, progressLength + 1.4));
        const angle =
          (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;

        gsap.set(plane, {
          left: `${point.x}%`,
          top: `${point.y}%`,
          rotation: angle + 88,
          autoAlpha: progress > 0.015 ? 1 : 0,
        });
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
              d="M 76 4 C 96 13 92 24 76 31 C 94 39 95 50 79 58 C 98 67 95 76 83 83 C 98 90 92 97 77 101"
            />
          </mask>
        </defs>
        <path
          className="flight-route flight-route--ghost"
          d="M 76 4 C 96 13 92 24 76 31 C 94 39 95 50 79 58 C 98 67 95 76 83 83 C 98 90 92 97 77 101"
        />
        <path
          ref={pathRef}
          className="flight-route flight-route--progress"
          mask="url(#flight-route-mask)"
          d="M 76 4 C 96 13 92 24 76 31 C 94 39 95 50 79 58 C 98 67 95 76 83 83 C 98 90 92 97 77 101"
        />
      </svg>
      <div ref={planeRef} className="flight-plane">
        <svg viewBox="0 0 58 58" role="img">
          <path
            d="M51 28.6 7.2 5.7c-2-1-4.1.8-3.5 3l5.9 17.8-5.9 17.8c-.6 2.2 1.5 4 3.5 3L51 31.4c1.3-.6 1.3-2.2 0-2.8Z"
            fill="white"
          />
          <path
            d="M9.6 26.5h22.8L4.1 8.1l5.5 18.4Zm0 0L4.1 44.9l28.3-18.4H9.6Z"
            fill="#dbe8ff"
          />
          <path d="M31.3 26.5 51 28.9 31.3 31.4 18 38.8l5.5-12.3L18 14.2l13.3 12.3Z" fill="#f7bf58" />
        </svg>
      </div>
    </div>
  );
}
