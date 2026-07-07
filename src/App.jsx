import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Hero from "./components/Hero.jsx";
import DestinationSection from "./components/DestinationSection.jsx";
import DocumentsSection from "./components/DocumentsSection.jsx";
import ApprovalSection from "./components/ApprovalSection.jsx";
import FinalCTA from "./components/FinalCTA.jsx";
import JourneyTracker from "./components/JourneyTracker.jsx";
import FlightPath from "./components/FlightPath.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sections = [
  { id: "hero", step: 0, start: "top 55%", end: "bottom 45%" },
  { id: "destinations", step: 1, start: "top 55%", end: "bottom 45%" },
  { id: "documents", step: 2, start: "top 55%", end: "bottom 45%" },
  { id: "approval", step: 3, start: "top 55%", end: "bottom 45%", split: 0.54 },
  { id: "final-cta", step: 5, start: "top 38%", end: "bottom 45%" },
];

export default function App() {
  const appRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      const setStep = (nextStep) => {
        setActiveStep((current) => (current === nextStep ? current : nextStep));
      };

      sections.forEach(({ id, step, start, end, split }) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start,
          end,
          onEnter: () => setStep(step),
          onEnterBack: () => setStep(step),
          onLeave: () => {
            if (typeof split === "number") setStep(4);
          },
          onUpdate: (self) => {
            if (typeof split === "number" && self.isActive) {
              setStep(self.progress >= split ? 4 : step);
            }
          },
        });
      });
    },
    { scope: appRef },
  );

  return (
    <main ref={appRef} className="site-shell">
      <FlightPath />
      <JourneyTracker activeStep={activeStep} />
      <Hero />
      <DestinationSection />
      <DocumentsSection />
      <ApprovalSection />
      <FinalCTA />
    </main>
  );
}
