import { ArrowRight, MessageCircle, Plane } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FrameSequence from "./FrameSequence.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const clients = ["SA", "AK", "RM", "NP"];

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const mm = gsap.matchMedia();

      gsap.set(q(".final-grid .section-copy > *"), { y: 34, autoAlpha: 0 });
      gsap.set(q(".boarding-frame"), { y: 46, autoAlpha: 0, scale: 0.92 });
      gsap.set(q(".boarding-pass-card"), { y: 78, x: -18, autoAlpha: 0, rotation: -5, scale: 0.9 });
      gsap.set(q(".passport-book"), { y: 92, x: 34, autoAlpha: 0, rotation: 10, scale: 0.88 });
      gsap.set(q(".sunset-plane"), { x: -60, y: 36, autoAlpha: 0, rotation: -8 });
      gsap.set(q(".final-success-glow"), { scale: 0.7, autoAlpha: 0 });

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=175%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(q(".boarding-frame"), {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.36,
        })
          .to(q(".boarding-pass-card"), {
            y: 0,
            x: 0,
            autoAlpha: 1,
            rotation: -2,
            scale: 1,
            duration: 0.34,
          }, "-=0.08")
          .to(q(".passport-book"), {
            y: 0,
            x: 0,
            autoAlpha: 1,
            rotation: -7,
            scale: 1,
            duration: 0.3,
            ease: "back.out(1.5)",
          }, "-=0.18")
          .to(q(".final-grid .section-copy .eyebrow, .final-grid .section-copy h2, .final-grid .section-copy p"), {
            y: 0,
            autoAlpha: 1,
            stagger: 0.06,
            duration: 0.3,
          }, "-=0.1")
          .to(q(".sunset-plane"), {
            x: 0,
            y: 0,
            autoAlpha: 1,
            rotation: 18,
            duration: 0.38,
            ease: "power2.out",
          }, "-=0.12")
          .to(q(".final-grid .hero-actions"), {
            y: 0,
            autoAlpha: 1,
            duration: 0.24,
          }, "-=0.04")
          .to(q(".clients-row"), {
            y: 0,
            autoAlpha: 1,
            duration: 0.24,
          }, "-=0.08")
          .to(q(".final-success-glow"), {
            scale: 1,
            autoAlpha: 1,
            duration: 0.34,
            ease: "power2.out",
          }, "-=0.06");
      });

      mm.add("(max-width: 900px)", () => {
        gsap.to(q(".final-grid .section-copy > *, .boarding-frame, .boarding-pass-card, .passport-book, .sunset-plane, .final-success-glow"), {
          y: 0,
          x: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.055,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="final-cta" ref={sectionRef} className="final-section journey-section">
      <div className="airport-window" />
      <div className="final-success-glow" aria-hidden="true" />
      <div className="section-inner final-grid">
        <div className="section-copy">
          <p className="eyebrow">Your Journey Begins Now</p>
          <h2>
            Ready to Fly
            <span>Towards Your Dreams?</span>
          </h2>
          <p>
            Get a free profile assessment and take the first step towards your
            global future.
          </p>
          <div className="hero-actions">
            <a className="button button--gold" href="tel:+910000000000">
              Check Eligibility Now <ArrowRight size={18} />
            </a>
            <a className="button button--ghost" href="https://wa.me/910000000000">
              <MessageCircle size={18} /> Chat on WhatsApp
            </a>
          </div>
          <div className="clients-row">
            <div>
              {clients.map((client) => (
                <span key={client}>{client}</span>
              ))}
            </div>
            <p>
              <strong>25K+ Happy Clients</strong>
              Trust our expertise
            </p>
          </div>
        </div>

        <div className="boarding-visual">
          <FrameSequence
            sequence="A6"
            mode="scroll"
            className="boarding-frame"
            alt="Boarding pass and passport animation"
            posterFrame={116}
            scrollTrigger={() => ({
              trigger: sectionRef.current,
              start: "top top",
              end: "+=175%",
              scrub: 1.1,
            })}
          />
          <div className="boarding-pass-card" aria-hidden="true">
            <div className="boarding-pass-head">
              <strong>BOARDING PASS</strong>
              <span>VISAFLIGHT</span>
            </div>
            <div className="boarding-pass-body">
              <div>
                <small>FROM</small>
                <strong>India</strong>
              </div>
              <Plane size={26} />
              <div>
                <small>TO</small>
                <strong>Dream Destination</strong>
              </div>
            </div>
            <div className="boarding-pass-foot">
              <span><small>GATE</small><strong>12A</strong></span>
              <span><small>DATE</small><strong>Today</strong></span>
              <span><small>TIME</small><strong>Now</strong></span>
              <i />
            </div>
          </div>
          <div className="passport-book" aria-hidden="true">
            <span>PASSPORT</span>
            <i />
          </div>
          <Plane className="sunset-plane" size={58} />
        </div>
      </div>
    </section>
  );
}
