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
      const q = gsap.utils.selector(sectionRef);
      const mm = gsap.matchMedia();

      gsap.set(q(".approval-grid .section-copy > *, .review-card"), { y: 0, autoAlpha: 1, scale: 1 });
      gsap.set(q(".approval-card, .success-badge"), { y: 34, autoAlpha: 0, scale: 0.96 });
      gsap.set(q(".progress-track span"), { y: 14, autoAlpha: 0, scale: 0.86 });
      gsap.set(q(".progress-bar span"), { scaleX: 0, transformOrigin: "left center" });
      gsap.set(q(".review-card > strong"), { autoAlpha: 0, y: 10 });
      gsap.set(q(".approval-detail, .secure-field"), { x: -16, autoAlpha: 0 });
      gsap.set(q(".stamp-frame"), { autoAlpha: 1, scale: 0.92, rotation: -18 });
      gsap.set(q(".approval-scanner"), { xPercent: -130, autoAlpha: 0 });
      gsap.set(q(".success-badge svg, .success-badge strong, .success-badge span"), {
        scale: 0.82,
        autoAlpha: 0,
      });

      mm.add("(min-width: 901px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=115%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.fromTo(q(".approval-grid .section-copy > *, .review-card"), {
          y: 10,
        }, {
          y: 0,
          stagger: 0.03,
          duration: 0.18,
        })
          .to(q(".progress-track span"), {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: 0.055,
            duration: 0.3,
          }, 0.12)
          .to(q(".progress-bar span"), { scaleX: 1, duration: 0.36, ease: "none" }, 0.22)
          .to(q(".review-card > strong"), { autoAlpha: 1, y: 0, duration: 0.16 }, 0.34)
          .to(q(".approval-card"), { y: 0, autoAlpha: 1, scale: 1, duration: 0.28 }, 0.38)
          .to(q(".approval-detail, .secure-field"), {
            x: 0,
            autoAlpha: 1,
            stagger: 0.035,
            duration: 0.28,
          }, 0.48)
          .to(q(".approval-scanner"), {
            autoAlpha: 1,
            xPercent: 110,
            duration: 0.34,
            ease: "none",
          }, 0.58)
          .to(q(".stamp-frame"), {
            autoAlpha: 1,
            scale: 1,
            rotation: -12,
            duration: 0.28,
            ease: "back.out(1.8)",
          }, 0.66)
          .to(q(".success-badge"), {
            y: 0,
            autoAlpha: 1,
            scale: 1,
            duration: 0.24,
          }, 0.78)
          .to(q(".success-badge svg, .success-badge strong, .success-badge span"), {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.05,
            duration: 0.2,
            ease: "back.out(1.6)",
          }, 0.82)
          .to(q(".success-badge"), {
            boxShadow: "0 0 0 8px rgba(27, 191, 117, 0.08), 0 28px 90px rgba(27, 191, 117, 0.24)",
            duration: 0.24,
            ease: "power2.out",
          }, 0.88);
      });

      mm.add("(max-width: 900px)", () => {
        gsap.to(q(".approval-grid .section-copy > *, .review-card, .approval-card, .success-badge"), {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.06,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        });

        gsap.to(q(".progress-track span, .approval-detail, .secure-field, .success-badge svg, .success-badge strong, .success-badge span"), {
          y: 0,
          x: 0,
          autoAlpha: 1,
          scale: 1,
          stagger: 0.035,
          duration: 0.55,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 55%",
          },
        });

        gsap.to(q(".progress-bar span"), {
          scaleX: 1,
          duration: 0.7,
          ease: "power2.out",
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
          <div className="approval-detail">
            <p>Visa Application</p>
            <h3>Student Visa</h3>
            <div className="secure-field">
              <span>Applicant Profile</span>
              <i />
            </div>
            <div className="secure-field">
              <span>Passport Check</span>
              <i />
            </div>
            <div className="secure-field">
              <span>Review Status</span>
              <strong>Ready</strong>
            </div>
          </div>
          <FrameSequence
            sequence="A5"
            mode="scroll"
            className="stamp-frame"
            alt="Approved stamp animation"
            posterFrame={0}
            scrollTrigger={() => ({
              trigger: sectionRef.current,
              start: "top top",
              end: "+=115%",
              scrub: 1.1,
            })}
          />
          <div className="approval-scanner" aria-hidden="true" />
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
