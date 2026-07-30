import {
  HiOutlineArrowDownTray,
  HiOutlineArrowPath,
  HiOutlineCheckCircle,
  HiOutlineClipboard,
  HiOutlineCodeBracket,
  HiOutlineExclamationTriangle,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import { QR_EXPORT_FORMATS } from "../../config/qrCodeOptions.js";

const SCAN_PANEL_STYLES = {
  neutral: {
    container: "border-slate-200 bg-white text-slate-700",
    icon: "bg-slate-100 text-slate-500",
  },
  checking: {
    container: "border-indigo-200 bg-indigo-50 text-indigo-950",
    icon: "bg-indigo-100 text-indigo-700",
  },
  success: {
    container: "border-emerald-200 bg-emerald-50 text-emerald-950",
    icon: "bg-emerald-100 text-emerald-700",
  },
  warning: {
    container: "border-amber-200 bg-amber-50 text-amber-950",
    icon: "bg-amber-100 text-amber-700",
  },
  danger: {
    container: "border-rose-200 bg-rose-50 text-rose-950",
    icon: "bg-rose-100 text-rose-700",
  },
};

/**
 * Displays the live QR, static scanability panel, and export actions.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Sticky QR preview and export panel.
 */
export default function QrCodePreview({
  design,
  hasContrastWarning,
  isExporting,
  isGenerated,
  minimumContrastRatio,
  onCopy,
  onDownload,
  previewRef,
  scanResult,
}) {
  return (
    <aside className="order-1 lg:order-2">
      <div className="lg:sticky lg:top-6">
        <section className="rounded-2xl bg-slate-950 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.22)] sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-indigo-300 uppercase">
                Live preview
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {isGenerated ? "Your current content" : "Sample content"}
              </p>
            </div>
            <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs tabular-nums text-slate-300">
              {design.exportSize} px
            </span>
          </div>

          <div
            className={`qr-preview-grid relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-xl ${
              design.canvasShape === "circle" ? "rounded-full" : ""
            }`}
          >
            <div
              ref={previewRef}
              className="absolute inset-0 flex items-center justify-center [&>svg]:h-full [&>svg]:w-full"
              aria-label={
                isGenerated
                  ? "Generated QR code preview"
                  : "Sample QR code preview"
              }
              role="img"
            />
          </div>
        </section>

        <ScanabilityPanel
          hasContrastWarning={hasContrastWarning}
          isGenerated={isGenerated}
          minimumContrastRatio={minimumContrastRatio}
          scanResult={scanResult}
        />

        {isGenerated && (
          <ExportPanel
            design={design}
            isExporting={isExporting}
            onCopy={onCopy}
            onDownload={onDownload}
          />
        )}
      </div>
    </aside>
  );
}

/**
 * Keeps scan guidance in one stable location beneath the preview.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Local scan and contrast status.
 */
function ScanabilityPanel({
  hasContrastWarning,
  isGenerated,
  minimumContrastRatio,
  scanResult,
}) {
  const panelContent = getScanabilityPanelContent({
    hasContrastWarning,
    isGenerated,
    scanResult,
  });
  const panelStyle = SCAN_PANEL_STYLES[panelContent.tone];
  const StatusIcon = panelContent.icon;

  return (
    <section
      className={`mt-4 min-h-28 rounded-xl border p-4 transition-colors duration-200 ${panelStyle.container}`}
      aria-labelledby="scanability-heading"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${panelStyle.icon}`}
        >
          <StatusIcon
            className={`h-5 w-5 ${
              scanResult.status === "checking" ? "animate-spin" : ""
            }`}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <h2
              id="scanability-heading"
              className="text-sm font-semibold tracking-tight"
            >
              {panelContent.title}
            </h2>
            <span className="font-mono text-[11px] tabular-nums opacity-65">
              Contrast {minimumContrastRatio.toFixed(1)}:1
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 opacity-80">
            {panelContent.description}
          </p>
          {isGenerated && scanResult.status !== "checking" && (
            <p className="mt-2 text-[11px] font-semibold opacity-65">
              {scanResult.passedChecks}/{scanResult.totalChecks} local scan
              checks passed
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * Chooses scanability copy and tone without nesting display conditions in JSX.
 *
 * @param {object} state - Current generation, contrast, and decoder state.
 * @returns {object} Display-ready panel content.
 */
function getScanabilityPanelContent({
  hasContrastWarning,
  isGenerated,
  scanResult,
}) {
  if (!isGenerated) {
    return {
      tone: "neutral",
      icon: HiOutlineShieldCheck,
      title: "Ready for a local scan check",
      description:
        "Generate your QR to test it privately at three representative sizes.",
    };
  }

  if (scanResult.status === "checking") {
    return {
      tone: "checking",
      icon: HiOutlineArrowPath,
      title: "Checking scanability",
      description:
        "Decoding this QR locally. Its content never leaves your browser.",
    };
  }

  if (scanResult.status === "failed") {
    return {
      tone: "danger",
      icon: HiOutlineExclamationTriangle,
      title: "Local scan check failed",
      description:
        "Simplify the styling, remove the logo, or increase foreground/background contrast before using this QR.",
    };
  }

  if (scanResult.status === "unavailable") {
    return {
      tone: "warning",
      icon: HiOutlineExclamationTriangle,
      title: "Scan check unavailable",
      description:
        "This browser could not complete the local decode. Test the exported QR with a camera before publishing.",
    };
  }

  if (hasContrastWarning) {
    return {
      tone: "warning",
      icon: HiOutlineExclamationTriangle,
      title: "Contrast needs attention",
      description:
        "The QR may decode here, but its weakest color pair is below the recommended contrast. Test it carefully before publishing.",
    };
  }

  if (scanResult.status === "caution") {
    return {
      tone: "warning",
      icon: HiOutlineExclamationTriangle,
      title: "Scans under limited conditions",
      description:
        "The full-size QR decoded, but smaller tests struggled. Increase the quiet zone or simplify the design.",
    };
  }

  return {
    tone: "success",
    icon: HiOutlineCheckCircle,
    title:
      scanResult.status === "strong"
        ? "Strong local scan result"
        : "Local scan check passed",
    description:
      "The encoded value matched across the completed browser checks. Test the final file on physical devices before publishing.",
  };
}

/**
 * Renders file-format downloads and clipboard actions after generation.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Export action panel.
 */
function ExportPanel({ design, isExporting, onCopy, onDownload }) {
  return (
    <section
      className="mt-4 rounded-xl border border-slate-200 bg-white p-4"
      aria-labelledby="export-heading"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 id="export-heading" className="text-sm font-semibold text-slate-900">
            Export your QR
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Raster files export at {design.exportSize} × {design.exportSize}px.
          </p>
        </div>
        <HiOutlineArrowDownTray
          className="h-5 w-5 text-slate-400"
          aria-hidden="true"
        />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {QR_EXPORT_FORMATS.map((format) => (
          <button
            key={format.value}
            type="button"
            disabled={isExporting}
            onClick={() => onDownload(format.value)}
            className="rounded-lg border border-slate-200 bg-white px-2 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50"
          >
            {format.label}
          </button>
        ))}
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          disabled={isExporting}
          onClick={() => onCopy("image")}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50"
        >
          <HiOutlineClipboard className="h-4 w-4" aria-hidden="true" />
          Copy PNG
        </button>
        <button
          type="button"
          disabled={isExporting}
          onClick={() => onCopy("svg")}
          className="flex items-center justify-center gap-2 rounded-lg bg-slate-100 px-3 py-2.5 text-xs font-semibold text-slate-800 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-[0.98] disabled:cursor-wait disabled:opacity-50"
        >
          <HiOutlineCodeBracket className="h-4 w-4" aria-hidden="true" />
          Copy SVG
        </button>
      </div>

      {design.isBackgroundTransparent && (
        <p className="mt-3 text-[11px] leading-4 text-slate-500">
          JPEG does not support transparency, so JPEG exports use a white
          background.
        </p>
      )}
    </section>
  );
}
