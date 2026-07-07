import { ArrowRight, Building2, Landmark } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const countries = [
  {
    name: "Canada",
    code: "CA",
    colors: ["#e4313f", "#ffffff", "#e4313f"],
    landmark: "CN Tower",
    visas: ["Student", "Work", "PR", "Visitor"],
  },
  {
    name: "United Kingdom",
    code: "UK",
    colors: ["#21468b", "#ffffff", "#c8102e"],
    landmark: "Big Ben",
    visas: ["Student", "Work", "PR", "Visitor"],
  },
  {
    name: "United States",
    code: "US",
    colors: ["#b22234", "#ffffff", "#3c3b6e"],
    landmark: "Liberty",
    visas: ["Student", "Work", "Business", "Visitor"],
  },
  {
    name: "Australia",
    code: "AU",
    colors: ["#032b7a", "#ffffff", "#d72b2b"],
    landmark: "Opera House",
    visas: ["Student", "Work", "PR", "Visitor"],
  },
  {
    name: "Schengen",
    code: "EU",
    colors: ["#164eaf", "#f7bf58", "#164eaf"],
    landmark: "Eiffel Tower",
    visas: ["Tourist", "Business", "Visitor"],
  },
];

function Flag({ colors, code }) {
  return (
    <span className="flag" style={{ "--c1": colors[0], "--c2": colors[1], "--c3": colors[2] }}>
      <span>{code}</span>
    </span>
  );
}

function LandmarkSketch({ label }) {
  return (
    <div className="landmark-sketch" aria-hidden="true">
      <svg viewBox="0 0 180 120">
        <path d="M14 102h152M28 96c22-24 44-22 63 0 18-24 41-25 62 0" />
        <path d="M88 98V25m-14 73 14-73 14 73m-23-52h18m-25 27h32" />
        <path d="M40 101V77m0 0 12-18 12 18v24m74 0V50m-12 0h24m-18 51V64" />
      </svg>
      <span>{label}</span>
    </div>
  );
}

export default function DestinationSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const cards = q(".destination-card");
      const paths = q(".landmark-sketch path");
      const chips = q(".visa-chips span");
      const mm = gsap.matchMedia();

      paths.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      gsap.set(cards, { y: 58, autoAlpha: 0, scale: 0.94 });
      gsap.set(chips, { x: -12, autoAlpha: 0 });
      gsap.set(q(".destination-grid .section-copy > *"), { y: 28, autoAlpha: 0 });

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=170%",
            scrub: 1.15,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(q(".destination-grid .section-copy > *"), {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.28,
        })
          .to(cards, {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.08,
            duration: 0.42,
          }, "-=0.04")
          .to(paths, {
            strokeDashoffset: 0,
            stagger: 0.045,
            duration: 0.42,
            ease: "power2.out",
          }, "-=0.22")
          .to(chips, {
            x: 0,
            autoAlpha: 1,
            stagger: 0.018,
            duration: 0.25,
          }, "-=0.22");

        cards.forEach((card, index) => {
          tl.to(card, {
            y: -16,
            scale: 1.035,
            borderColor: "rgba(247, 191, 88, 0.78)",
            boxShadow: "0 30px 86px rgba(247, 191, 88, 0.34)",
            duration: 0.12,
            ease: "power2.out",
          }, 0.78 + index * 0.105).to(card, {
            y: 0,
            scale: 1,
            borderColor: "rgba(42, 79, 143, 0.13)",
            boxShadow: "0 18px 46px rgba(28, 50, 96, 0.12)",
            duration: 0.16,
            ease: "power2.out",
          }, ">");
        });
      });

      mm.add("(max-width: 900px)", () => {
        gsap.to(q(".destination-grid .section-copy > *"), {
          y: 0,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
          },
        });

        gsap.to(cards, {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 58%",
          },
        });

        gsap.to(paths, {
          strokeDashoffset: 0,
          stagger: 0.02,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        });

        gsap.to(chips, {
          x: 0,
          autoAlpha: 1,
          stagger: 0.012,
          duration: 0.45,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="destinations" ref={sectionRef} className="destinations-section journey-section">
      <div className="section-inner destination-grid">
        <div className="section-copy section-copy--light">
          <p className="eyebrow">Choose Your Destination</p>
          <h2>
            Where Do You
            <span>Want to Go?</span>
          </h2>
          <p>
            We offer visa assistance for all major countries and visa types,
            from first consultation to final decision.
          </p>
          <a className="button button--outline-blue" href="#final-cta">
            View All Countries <ArrowRight size={18} />
          </a>
        </div>

        <div className="country-cards">
          {countries.map((country) => (
            <article className="destination-card" key={country.name}>
              <Flag colors={country.colors} code={country.code} />
              <LandmarkSketch label={country.landmark} />
              <h3>{country.name}</h3>
              <div className="visa-chips">
                {country.visas.map((visa) => (
                  <span key={visa}>{visa}</span>
                ))}
              </div>
              <button aria-label={`Explore ${country.name}`}>
                <ArrowRight size={16} />
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="destination-watermark">
        <Building2 size={84} />
        <Landmark size={72} />
      </div>
    </section>
  );
}
