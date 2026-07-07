import {
  ArrowRight,
  Award,
  Globe2,
  Menu,
  MessageCircle,
  Plane,
  ShieldCheck,
  Star,
} from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FrameSequence from "./FrameSequence.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const metrics = [
  [Award, "12+", "Years of Experience"],
  [Star, "25K+", "Visas Approved"],
  [Globe2, "50+", "Countries Served"],
  [ShieldCheck, "98%", "Success Rate"],
];

export default function Hero() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const introTargets = [
        ...q(".site-nav"),
        ...q(".hero-copy .eyebrow"),
        ...q(".hero-copy h1"),
        ...q(".hero-subtitle"),
        ...q(".hero-actions"),
        ...q(".metric"),
      ];

      gsap.set(introTargets, { opacity: 0, y: 34, visibility: "inherit" });
      gsap.set(q(".hero-map"), { scale: 1.04, opacity: 0.72 });

      const revealFallback = window.setTimeout(() => {
        gsap.set(introTargets, { opacity: 1, y: 0, visibility: "inherit" });
      }, 1800);

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(q(".site-nav"), { opacity: 1, y: 0, duration: 0.75 })
        .to(q(".hero-map"), { opacity: 0.86, scale: 1, duration: 1.3 }, "<")
        .to(q(".hero-copy .eyebrow"), { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(q(".hero-copy h1"), { opacity: 1, y: 0, duration: 0.85 }, "-=0.25")
        .to(q(".hero-subtitle"), { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
        .to(q(".hero-actions"), { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
        .to(q(".metric"), { opacity: 1, y: 0, stagger: 0.07, duration: 0.6 }, "-=0.42");

      gsap.to(q(".hero-map"), {
        y: 95,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      gsap.to(q(".hero-copy"), {
        y: -62,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(q(".hero-metrics"), {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom top",
          scrub: 1,
        },
      });

      return () => window.clearTimeout(revealFallback);
    },
    { scope: sectionRef },
  );

  return (
    <section id="hero" ref={sectionRef} className="hero-section journey-section">
      <FrameSequence
        sequence="A1"
        mode="loop"
        eager
        className="hero-map"
        alt="Animated blue dotted world map"
      />
      <div className="hero-map-vector" aria-hidden="true">
        <svg viewBox="0 0 1000 520" role="img">
          <g className="map-land">
            <path d="M120 144c34-34 105-41 156-19 28 12 47 35 73 43 22 7 49 2 66 18 18 17 15 43-3 58-24 19-62 10-92 23-26 11-34 41-62 48-29 8-55-16-81-28-34-16-78-7-104-33-31-32 3-80 47-110Z" />
            <path d="M302 306c28 6 55 32 51 64-3 28-24 48-28 76-3 19 7 38 2 57-37-18-59-55-66-95-6-36 5-76 41-102Z" />
            <path d="M458 157c27-22 83-22 111-2 26 18 21 51-8 62-31 12-69-2-98 14-17 9-27 28-46 29-23 1-40-24-31-45 10-25 49-35 72-58Z" />
            <path d="M514 268c35-33 101-30 131 7 23 28 18 70 40 99 14 19 37 29 51 49-43 15-94 5-128-27-34-31-47-77-84-105-9-7-14-14-10-23Z" />
            <path d="M636 142c82-39 206-24 259 37 29 33 26 80-8 105-35 25-88 16-126 38-32 19-46 59-85 64-43 6-75-31-95-67-19-34-48-63-84-78 24-45 82-72 139-99Z" />
            <path d="M796 379c42-16 96-2 120 31-18 29-69 35-104 18-25-12-39-31-16-49Z" />
          </g>
          <g className="map-routes">
            <path d="M230 228C357 172 489 171 617 239S807 316 897 236" />
            <path d="M538 188c84 10 138 56 194 112 43 43 92 67 160 96" />
            <path d="M636 286c-59 11-101 43-126 91" />
          </g>
          <g className="map-nodes">
            <circle cx="230" cy="228" r="7" />
            <circle cx="538" cy="188" r="7" />
            <circle cx="636" cy="286" r="9" />
            <circle cx="897" cy="236" r="7" />
            <circle cx="812" cy="418" r="7" />
          </g>
        </svg>
      </div>
      <div className="hero-glow hero-glow--left" />
      <div className="hero-glow hero-glow--right" />

      <header className="site-nav">
        <a className="brand" href="#hero" aria-label="VisaFlight home">
          <span className="brand-mark">
            <Plane size={28} />
          </span>
          <span>
            <strong>VisaFlight</strong>
            <small>Your Global Visa Partner</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="Primary navigation">
          <a className="is-active" href="#hero">Home</a>
          <a href="#documents">Visas</a>
          <a href="#destinations">Countries</a>
          <a href="#approval">Process</a>
          <a href="#final-cta">About Us</a>
          <a href="#final-cta">Contact</a>
        </nav>
        <a className="nav-cta" href="#final-cta">Free Assessment</a>
        <button className="menu-button" aria-label="Open menu">
          <Menu size={24} />
        </button>
      </header>

      <div className="hero-plane hero-plane--one"><Plane size={38} /></div>
      <div className="hero-plane hero-plane--two"><Plane size={30} /></div>
      <div className="hero-plane hero-plane--three"><Plane size={34} /></div>

      <div className="section-inner hero-content">
        <div className="hero-copy">
          <p className="eyebrow">Take your future global</p>
          <h1>
            Your Visa Journey
            <span>Starts Here</span>
          </h1>
          <p className="hero-subtitle">
            We make your dream of studying, working, travelling & settling
            abroad a reality.
          </p>
          <div className="hero-actions">
            <a className="button button--gold" href="#destinations">
              Check Eligibility <ArrowRight size={18} />
            </a>
            <a className="button button--ghost" href="#final-cta">
              <MessageCircle size={18} /> Talk to Expert
            </a>
          </div>
        </div>

      </div>

      <div className="section-inner hero-metrics">
        {metrics.map(([Icon, value, label]) => (
          <div className="metric" key={label}>
            <Icon size={28} />
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
