import { ArrowRight, MessageCircle, Plane } from "lucide-react";
import FrameSequence from "./FrameSequence.jsx";

const clients = ["SA", "AK", "RM", "NP"];

export default function FinalCTA() {
  return (
    <section id="final-cta" className="final-section journey-section">
      <div className="airport-window" />
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
          />
          <Plane className="sunset-plane" size={58} />
        </div>
      </div>
    </section>
  );
}
