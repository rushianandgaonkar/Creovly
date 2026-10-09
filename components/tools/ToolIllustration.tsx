/** Decorative diagrams explain each tool without suggesting live results. */
export default function ToolIllustration({ toolId }: { toolId: string }) {
  const kind = toolId.replace('youtube-', '');
  const isThumbnail = kind.startsWith('thumbnail');
  return <div className={`tool-illustration illustration-${kind}`} aria-hidden="true">
    <svg viewBox="0 0 320 112" fill="none" className="tool-diagram">
      {isThumbnail ? <>
        <rect x="54" y="19" width="135" height="76" rx="8" className="diagram-surface" />
        <path d="m55 83 34-36 29 27 22-19 48 39H62a7 7 0 0 1-7-7Z" className="diagram-fill" />
        <circle cx="155" cy="40" r="10" className="diagram-fill" />
        <path d="m107 48 17 10-17 10V48Z" className="diagram-ink" />
        {kind === 'thumbnail-resizer' ? <>
          <rect x="72" y="12" width="135" height="76" rx="5" className="diagram-accent" strokeDasharray="4 4" />
          <path d="M72 27V12h15m105 76h15V73" className="diagram-accent" strokeWidth="3" />
          <text x="230" y="54" className="diagram-label">16:9</text>
          <path d="M226 66h33m-5-5 5 5-5 5m-23-10-5 5 5 5" className="diagram-accent" />
        </> : <>
          <path d="M207 57h30m-6-6 6 6-6 6" className="diagram-accent" strokeWidth="2" />
          <rect x="248" y="34" width="25" height="45" rx="5" className="diagram-surface" />
          <path d="M260 34v45m-4-36h8m-8 8h8m-8 8h8m-8 8h8" className="diagram-accent" />
        </>}
      </> : kind === 'shorts-safe-zone' ? <>
        <rect x="130" y="8" width="60" height="96" rx="12" className="diagram-surface" />
        <rect x="138" y="24" width="36" height="53" rx="3" className="diagram-accent" strokeDasharray="4 3" />
        <path d="M140 86h25m-25 6h18" className="diagram-muted" strokeWidth="3" strokeLinecap="round" />
        <circle cx="181" cy="60" r="3" className="diagram-fill" /><circle cx="181" cy="71" r="3" className="diagram-fill" />
        <path d="M100 40h22m76 38h23" className="diagram-accent" />
        <path d="m151 42 12 8-12 8V42Z" className="diagram-fill" />
      </> : kind === 'title-checker' ? <>
        <rect x="48" y="20" width="224" height="73" rx="9" className="diagram-surface" />
        <text x="66" y="49" className="diagram-title">Your next great video</text>
        <path d="M67 65h130m-130 12h90" className="diagram-muted" strokeWidth="4" strokeLinecap="round" />
        <circle cx="241" cy="65" r="12" className="diagram-fill" />
        <path d="m235 65 4 4 8-8" className="diagram-accent" strokeWidth="2" />
      </> : <>
        <rect x="68" y="17" width="184" height="80" rx="9" className="diagram-surface" />
        {kind === 'watch-hours-calculator' ? <>
          <circle cx="112" cy="57" r="23" className="diagram-muted" strokeWidth="5" />
          <path d="M112 34a23 23 0 0 1 23 23" className="diagram-accent" strokeWidth="5" strokeLinecap="round" />
          <path d="M112 43v15l9 6" className="diagram-accent" strokeWidth="2" strokeLinecap="round" />
          <path d="M155 48h72m-72 14h51m-51 13h35" className="diagram-muted" strokeWidth="4" strokeLinecap="round" />
        </> : kind === 'rpm-calculator' ? <>
          <text x="88" y="52" className="diagram-title">Revenue</text>
          <path d="M88 60h88" className="diagram-muted" />
          <text x="88" y="78" className="diagram-title">Views</text>
          <text x="190" y="63" className="diagram-label">× 1k</text>
        </> : kind === 'monetization-calculator' ? <>
          <rect x="88" y="37" width="10" height="40" rx="3" className="diagram-fill" />
          <rect x="106" y="48" width="10" height="29" rx="3" className="diagram-fill" />
          <rect x="124" y="29" width="10" height="48" rx="3" className="diagram-fill" />
          <path d="M155 44h72m-72 13h50m-50 17h72" className="diagram-muted" strokeWidth="4" strokeLinecap="round" />
        </> : <>
          <path d="M89 76V38m0 38h143" className="diagram-muted" />
          <path d="m97 68 27-13 25 6 27-23 20 7 29-16" className="diagram-accent" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="m97 68 27-13 25 6 27-23 20 7 29-16v47H97Z" className="diagram-fill" />
        </>}
      </>}
    </svg>
  </div>;
}
