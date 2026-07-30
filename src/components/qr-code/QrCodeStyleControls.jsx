import QrCodeColorPicker from "./QrCodeColorPicker.jsx";

const DOT_STYLES = ["square", "dots", "rounded"];

/**
 * Renders dot-shape and color controls shared by every QR generator.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The QR appearance controls.
 */
export default function QrCodeStyleControls({
  backgroundColor,
  dotColor,
  dotStyle,
  hasContrastWarning,
  onBackgroundColorChange,
  onDotColorChange,
  onDotStyleChange,
}) {
  return (
    <>
      <fieldset>
        <legend className="mb-2 font-bold text-black xl:text-lg">Type:</legend>
        <div className="flex justify-start space-x-4">
          {DOT_STYLES.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => onDotStyleChange(style)}
              className={`rounded-lg border-2 p-2 ${
                dotStyle === style
                  ? "border-indigo-600"
                  : "border-transparent"
              }`}
              aria-label={`Use ${style} QR code dots`}
              aria-pressed={dotStyle === style}
            >
              <DotStyleIcon style={style} />
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 font-bold text-black xl:text-lg">
          Color:
        </legend>
        <QrCodeColorPicker
          color={dotColor}
          label="QR Color"
          onChange={onDotColorChange}
        />
        <QrCodeColorPicker
          color={backgroundColor}
          label="Background"
          onChange={onBackgroundColorChange}
        />
      </fieldset>

      {hasContrastWarning && (
        <p className="text-sm text-red-500" role="status">
          The contrast between QR code and background colors may be too low for
          optimal scanning. Proceed with caution and triple check your QR code
          before going live.
        </p>
      )}
    </>
  );
}

/**
 * Draws a simple preview of one QR module shape.
 *
 * @param {{ style: string }} props - Component properties.
 * @returns {JSX.Element} The selected shape icon.
 */
function DotStyleIcon({ style }) {
  if (style === "dots") {
    return (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
      </svg>
    );
  }

  const cornerRadius = style === "rounded" ? 5 : 2;

  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <rect width="18" height="18" x="3" y="3" rx={cornerRadius} />
    </svg>
  );
}
