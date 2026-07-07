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
import FrameSequence from "./FrameSequence.jsx";

const metrics = [
  [Award, "12+", "Years of Experience"],
  [Star, "25K+", "Visas Approved"],
  [Globe2, "50+", "Countries Served"],
  [ShieldCheck, "98%", "Success Rate"],
];

export default function Hero() {
  return (
    <section id="hero" className="hero-section journey-section">
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
