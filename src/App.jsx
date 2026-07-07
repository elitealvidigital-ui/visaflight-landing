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
  "hero",
  "destinations",
  "documents",
  "approval",
  "final-cta",
];

export default function App() {
  const appRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      sections.forEach((id, index) => {
        const el = document.getElementById(id);
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
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
