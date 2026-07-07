import { ArrowRight, CheckCircle2, FileText, Stamp } from "lucide-react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FrameSequence from "./FrameSequence.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const progress = ["Received", "In Review", "Verification", "Decision"];

export default function ApprovalSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(".review-card, .approval-card, .success-badge", {
        y: 34,
        autoAlpha: 0,
        stagger: 0.1,
        duration: 0.72,
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
    <section id="approval" ref={sectionRef} className="approval-section journey-section">
      <div className="section-inner approval-grid">
        <div className="section-copy section-copy--light">
          <p className="eyebrow">Application Review</p>
          <h2>
            We Review,
            <span>You Relax!</span>
          </h2>
          <p>
            Our team reviews your application carefully to maximize your
            success before final submission.
          </p>
        </div>

        <article className="review-card">
          <h3>Application Review Progress</h3>
          <div className="progress-track">
            {progress.map((label) => (
              <span key={label}>
                <i><FileText size={16} /></i>
                <small>{label}</small>
              </span>
            ))}
          </div>
          <div className="progress-bar"><span /></div>
          <strong>100%</strong>
        </article>

        <article className="approval-card">
          <div>
            <p>Visa Application</p>
            <h3>Student Visa</h3>
            <small>Applicant Name</small>
            <strong>John Doe</strong>
            <small>Passport No.</small>
            <strong>A1234567</strong>
          </div>
          <FrameSequence
            sequence="A5"
            mode="scroll"
            className="stamp-frame"
            alt="Approved stamp animation"
          />
        </article>

        <div className="success-badge">
          <CheckCircle2 size={42} />
          <strong>Visa Approved</strong>
          <span>Dreams Delivered</span>
          <ArrowRight size={18} />
        </div>
      </div>
      <Stamp className="approval-watermark" size={130} />
    </section>
  );
}
