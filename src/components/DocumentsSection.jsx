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
      gsap.from(".process-step", {
        y: 28,
        autoAlpha: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
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
          />
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
