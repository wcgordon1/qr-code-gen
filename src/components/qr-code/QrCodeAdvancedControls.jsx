import {
  QR_ERROR_CORRECTION_LEVELS,
  QR_EXPORT_SIZES,
  QR_FRAME_STYLES,
} from "../../config/qrCodeOptions.js";

const SELECT_CLASS_NAME =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

/**
 * Renders scan resilience, margin, canvas, frame, and export-size settings.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Advanced QR controls.
 */
export default function QrCodeAdvancedControls({ design, onDesignChange }) {
  return (
    <div className="space-y-7">
      <section>
        <label
          htmlFor="error-correction"
          className="text-sm font-semibold text-slate-900"
        >
          Error correction
        </label>
        <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
          Higher levels survive more visual obstruction but create denser codes.
        </p>
        <select
          id="error-correction"
          value={design.errorCorrectionLevel}
          onChange={(event) =>
            onDesignChange("errorCorrectionLevel", event.target.value)
          }
          className={SELECT_CLASS_NAME}
        >
          {QR_ERROR_CORRECTION_LEVELS.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label} — {level.description}
            </option>
          ))}
        </select>
      </section>

      <section className="border-t border-slate-200 pt-6">
        <label className="block">
          <span className="flex items-center justify-between text-sm font-semibold text-slate-900">
            <span>Quiet zone</span>
            <span className="font-mono text-xs tabular-nums text-slate-500">
              {design.margin} px
            </span>
          </span>
          <span className="mt-1 block text-xs leading-5 text-slate-500">
            Blank space around the modules. Frames reserve extra space
            automatically.
          </span>
          <input
            type="range"
            min="24"
            max="120"
            step="4"
            value={design.margin}
            onChange={(event) =>
              onDesignChange("margin", Number(event.target.value))
            }
            className="qr-range mt-3 w-full"
          />
        </label>
      </section>

      <section className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">Canvas shape</h3>
        <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
          A circular canvas is more decorative and should be scan-tested closely.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "square", label: "Square" },
            { value: "circle", label: "Circle" },
          ].map((shape) => (
            <ChoiceButton
              key={shape.value}
              isSelected={design.canvasShape === shape.value}
              label={shape.label}
              onClick={() => onDesignChange("canvasShape", shape.value)}
            />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">Export frame</h3>
        <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
          Add a simple SVG-native border or prompt to every file format.
        </p>
        <div className="grid gap-2 sm:grid-cols-3">
          {QR_FRAME_STYLES.map((frame) => (
            <ChoiceButton
              key={frame.value}
              description={frame.description}
              isSelected={design.frameStyle === frame.value}
              label={frame.label}
              onClick={() => onDesignChange("frameStyle", frame.value)}
            />
          ))}
        </div>
        {design.frameStyle === "label" && (
          <label className="mt-3 block">
            <span className="mb-1.5 block text-xs font-semibold text-slate-700">
              Frame label
            </span>
            <input
              type="text"
              value={design.frameLabel}
              maxLength="18"
              onChange={(event) =>
                onDesignChange("frameLabel", event.target.value)
              }
              className={SELECT_CLASS_NAME}
              placeholder="SCAN ME"
            />
          </label>
        )}
      </section>

      <section className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Export resolution
        </h3>
        <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
          SVG remains vector-based. This size controls raster downloads.
        </p>
        <div className="grid grid-cols-4 gap-2">
          {QR_EXPORT_SIZES.map((size) => (
            <ChoiceButton
              key={size}
              isSelected={design.exportSize === size}
              label={`${size}`}
              onClick={() => onDesignChange("exportSize", size)}
            />
          ))}
        </div>
        <label className="mt-3 grid grid-cols-[1fr_auto] items-center gap-2">
          <span className="sr-only">Custom export size</span>
          <input
            type="number"
            min="256"
            max="4096"
            step="64"
            value={design.exportSize}
            onChange={(event) => {
              const requestedSize = Number(event.target.value);
              const safeSize = Math.min(4096, Math.max(256, requestedSize));
              onDesignChange("exportSize", safeSize);
            }}
            className={SELECT_CLASS_NAME}
          />
          <span className="text-xs font-semibold text-slate-500">
            × {design.exportSize} px
          </span>
        </label>
      </section>
    </div>
  );
}

/**
 * Renders one selectable setting card.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Accessible choice button.
 */
function ChoiceButton({
  description,
  isSelected,
  label,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg border px-3 py-2.5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
        isSelected
          ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-[inset_0_0_0_1px_#4f46e5]"
          : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
      }`}
      aria-pressed={isSelected}
    >
      <span className="block text-xs font-semibold">{label}</span>
      {description && (
        <span className="mt-1 block text-[11px] leading-4 opacity-70">
          {description}
        </span>
      )}
    </button>
  );
}
