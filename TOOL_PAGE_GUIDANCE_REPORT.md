# Tool-page guidance — October 8, 2026

Completed the agreed layout across all nine individual tools: compact introduction and working workspace, labeled demonstration, three steps, concise technical context, tool-specific FAQs, and three relevant next tools. Existing URLs and working tool controls are preserved.

## Implementation

- Shared server-rendered `ToolDemonstration` and `ToolSteps` components, backed by centralized `config/tool-guidance.ts`.
- Four real image demonstrations: solid-background logo removal, 16:9 center-crop resizing, same-format JPEG compression, and annotated Shorts planning export.
- Fictional Frame Lab graphics were created for these examples. Outputs were downloaded from the existing Creovly browser tools, with the settings shown on their respective pages. No third-party imagery or invented measurements.
- Eight public example files with dimensions and exact byte counts in `config/tool-example-assets.json`. Both source and output can be downloaded. PNG transparency is displayed over a checkerboard.
- Title demonstration uses `analyzeTitle` on an original draft and a clearly labeled manual edit. Calculator examples reuse `calculatorDefinitions.example`, `calculateCreator`, and `formatCalculatorMetric`; sample results remain separate from live inputs.
- Three steps tailored to each tool; explicitly selected related-tool destinations replace generic category sorting where guidance exists.
- Native keyboard-accessible FAQ disclosures, without new client JavaScript. Added missing format/limit/privacy answers where needed.

## Validation

- `npm run lint`, `npm run test` (29 passed), and `npm run build` passed; 18 static pages generated.
- Integrity check: nine guidance entries, exactly three steps and three distinct valid related tools per entry, no self-links, manifest byte sizes matching actual files.
- Pillow independently decoded all eight example assets and checked logo transparency/enclosed white detail. Compression example: 258,969-byte JPEG source to 76,231-byte JPEG output, preserving 1600×1000 dimensions. These are example-specific measurements, not general performance claims.
- Production browser checks on all nine tools at 375px: example present, three steps, FAQs present, three related cards, and no horizontal overflow.
- Reviewed the logo demonstration in light mode and the RPM worked example in dark mode. FAQ keyboard expansion worked; live inputs stayed empty. No browser console warnings/errors during these checks.
- Production preview refreshed at `http://localhost:3103`.
