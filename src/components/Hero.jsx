import {
  ArrowRight,
  Award,
  CheckCircle2,
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
        ...q(".hero-status-card"),
        ...q(".metric"),
      ];

      gsap.set(introTargets, { opacity: 0, y: 34, visibility: "inherit" });
      gsap.set(q(".hero-map"), { scale: 1.04, opacity: 0.78 });

      const revealFallback = window.setTimeout(() => {
        gsap.set(introTargets, { opacity: 1, y: 0, visibility: "inherit" });
      }, 1800);

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .to(q(".site-nav"), { opacity: 1, y: 0, duration: 0.75 })
        .to(q(".hero-map"), { opacity: 0.98, scale: 1, duration: 1.3 }, "<")
        .to(q(".hero-copy .eyebrow"), { opacity: 1, y: 0, duration: 0.55 }, "-=0.35")
        .to(q(".hero-copy h1"), { opacity: 1, y: 0, duration: 0.85 }, "-=0.25")
        .to(q(".hero-subtitle"), { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
        .to(q(".hero-actions"), { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
        .to(q(".hero-status-card"), { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
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

      gsap.to(q(".hero-status-card"), {
        y: 54,
        scale: 0.96,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.25,
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

        <div className="hero-status-card">
          <CheckCircle2 size={28} />
          <strong>Profile assessment ready</strong>
          <span>Start with a guided visa plan.</span>
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
