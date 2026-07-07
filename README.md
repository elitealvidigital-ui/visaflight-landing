# VisaFlight Landing Page

Premium animated visa consultancy landing page built with React, Vite, Tailwind CSS, GSAP, and ScrollTrigger.

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Assets

Animation frames live in:

```text
public/animations/A1
public/animations/A2
public/animations/A3
public/animations/A4
public/animations/A5
public/animations/A6
```

The frame manifest is generated automatically before `npm run dev` and `npm run build`:

```text
public/animations/manifest.json
```

Reference image:

```text
public/reference/visaflight-reference.png
```

## Asset Usage

- `A1` is used directly as the animated hero world-map background.
- `A4` is used directly in the documents verification section.
- `A5` is used directly in the approval stamp section.
- `A6` is used directly in the final boarding-pass CTA.
- `A2` is used as visual reference; the main plane path is code-controlled with GSAP.
- `A3` is used as visual reference; destination cards are real HTML/CSS for responsive text.

## Editing Text And Links

- Main page structure: `src/App.jsx`
- Section copy:
  - `src/components/Hero.jsx`
  - `src/components/DestinationSection.jsx`
  - `src/components/DocumentsSection.jsx`
  - `src/components/ApprovalSection.jsx`
  - `src/components/FinalCTA.jsx`
- WhatsApp and phone links are in `src/components/FinalCTA.jsx`.
- Route/plane animation is in `src/components/FlightPath.jsx`.
- Frame playback is in `src/components/FrameSequence.jsx`.
