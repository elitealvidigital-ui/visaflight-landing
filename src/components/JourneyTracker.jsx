const steps = [
  ["01", "Take Off", "Your Journey Begins"],
  ["02", "Destination", "Choose Your Country"],
  ["03", "Documents", "We Prepare"],
  ["04", "Review", "We Review"],
  ["05", "Approved", "Visa Approved"],
  ["06", "Fly Abroad", "Dreams Take Flight"],
];

export default function JourneyTracker({ activeStep }) {
  return (
    <aside className="journey-tracker" aria-label="Visa journey progress">
      {steps.map(([number, title, text], index) => (
        <div
          key={number}
          className={`journey-step ${index < activeStep ? "is-complete" : ""} ${
            index === activeStep ? "is-active" : ""
          }`}
        >
          <span className="journey-node">{number}</span>
          <span className="journey-copy">
            <strong>{title}</strong>
            <small>{text}</small>
          </span>
        </div>
      ))}
    </aside>
  );
}
