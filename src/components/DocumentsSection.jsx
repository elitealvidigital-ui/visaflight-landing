import {
  ClipboardCheck,
  FileCheck2,
  Fingerprint,
  FolderSearch,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FrameSequence from "./FrameSequence.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  [UserRoundCheck, "Profile Assessment"],
  [FolderSearch, "Document Collection"],
  [FileCheck2, "Application Filing"],
  [Fingerprint, "Biometrics & Verification"],
  [ShieldCheck, "Pre-Submission Check"],
];

export default function DocumentsSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(sectionRef);
      const mm = gsap.matchMedia();

      gsap.set(q(".documents-grid .section-copy > *"), { y: 0, autoAlpha: 1 });
      gsap.set(q(".process-step"), { y: 0, autoAlpha: 1, scale: 1 });
      gsap.set(q(".documents-frame"), { y: 0, autoAlpha: 1, scale: 1 });
      gsap.set(q(".verify-item"), { x: 72, autoAlpha: 0 });
      gsap.set(q(".verify-item strong"), { scale: 0.72, autoAlpha: 0, transformOrigin: "center" });
      gsap.set(q(".scanner-beam"), { xPercent: -140, autoAlpha: 0 });

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=110%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(q(".documents-grid .section-copy > *, .process-step, .documents-frame"), {
          y: 10,
        }, {
          y: 0,
          stagger: 0.025,
          duration: 0.18,
        })
          .to(q(".scanner-beam"), {
            autoAlpha: 1,
            xPercent: 110,
            duration: 0.42,
            ease: "none",
          }, 0.16)
          .to(q(".verify-item"), {
            x: 0,
            autoAlpha: 1,
            stagger: 0.08,
            duration: 0.42,
          }, 0.36)
          .to(q(".verify-item strong"), {
            scale: 1,
            autoAlpha: 1,
            stagger: 0.055,
            duration: 0.28,
            ease: "back.out(1.7)",
          }, 0.54)
          .to(q(".process-step span"), {
            boxShadow: "0 0 0 7px rgba(247, 191, 88, 0.12), 0 16px 34px rgba(247, 191, 88, 0.18)",
            stagger: 0.05,
            duration: 0.28,
          }, 0.66);
      });

      mm.add("(max-width: 900px)", () => {
        gsap.to(q(".documents-grid .section-copy > *, .process-step, .documents-frame, .verify-item"), {
          y: 0,
          x: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        gsap.to(q(".verify-item strong"), {
          scale: 1,
          autoAlpha: 1,
          stagger: 0.05,
          duration: 0.35,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 52%",
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id="documents" ref={sectionRef} className="documents-section journey-section">
      <div className="section-inner documents-grid">
        <div className="section-copy">
          <p className="eyebrow">We Handle Everything</p>
          <h2>
            From Documents
            <span>to Submission</span>
          </h2>
          <p>
            Our experts prepare and verify your documents with 100% accuracy,
            keeping every step organized and review-ready.
          </p>
          <div className="process-row">
            {steps.map(([Icon, label]) => (
              <div className="process-step" key={label}>
                <span><Icon size={24} /></span>
                <small>{label}</small>
              </div>
            ))}
          </div>
        </div>

        <div className="documents-visual">
          <FrameSequence
            sequence="A4"
            mode="scroll"
            className="documents-frame"
            alt="Passport and document verification animation"
            posterFrame={0}
            scrollTrigger={() => ({
              trigger: sectionRef.current,
              start: "top top",
              end: "+=110%",
              scrub: 1.15,
            })}
          />
          <div className="scanner-beam" aria-hidden="true" />
          <div className="verification-stack">
            {["Passport", "Bank Statement", "SOP", "IELTS Certificate", "Offer Letter"].map((item) => (
              <div className="verify-item" key={item}>
                <ClipboardCheck size={18} />
                <span>{item}</span>
                <strong>Verified</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
