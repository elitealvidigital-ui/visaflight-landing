import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function FlightPath() {
  const layerRef = useRef(null);
  const pathRef = useRef(null);
  const planeRef = useRef(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const plane = planeRef.current;
      if (!path || !plane) return;

      const length = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.9,
          onUpdate: (self) => {
            const progressLength = length * self.progress;
            const point = path.getPointAtLength(progressLength);
            const next = path.getPointAtLength(Math.min(length, progressLength + 1));
            const angle =
              (Math.atan2(next.y - point.y, next.x - point.x) * 180) / Math.PI;

            gsap.set(plane, {
              xPercent: -50,
              yPercent: -50,
              left: `${point.x}%`,
              top: `${point.y}%`,
              rotation: angle + 88,
            });
          },
        },
      });
    },
    { scope: layerRef },
  );

  return (
    <div ref={layerRef} className="flight-layer" aria-hidden="true">
      <svg className="flight-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          ref={pathRef}
          className="flight-route"
          d="M 77 4 C 96 14 92 24 76 32 C 94 40 94 51 80 58 C 98 66 95 75 84 82 C 99 89 92 97 77 101"
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
