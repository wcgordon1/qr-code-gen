const DOWNLOAD_FORMATS = [
  { extension: "png", label: "PNG", colorClass: "bg-blue-500 hover:bg-blue-600" },
  {
    extension: "jpeg",
    label: "JPEG",
    colorClass: "bg-green-500 hover:bg-green-600",
  },
  {
    extension: "webp",
    label: "WebP",
    colorClass: "bg-yellow-500 hover:bg-yellow-600",
  },
  { extension: "svg", label: "SVG", colorClass: "bg-red-500 hover:bg-red-600" },
];

/**
 * Displays the placeholder or generated QR code and its download actions.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The QR preview panel.
 */
export default function QrCodePreview({
  hasContrastWarning,
  isGenerated,
  onDownload,
  previewRef,
}) {
  return (
    <div className="order-1 flex flex-col items-center md:order-2 md:w-1/2">
      {hasContrastWarning && (
        <p
          className="mb-3 w-full max-w-[320px] rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          role="status"
        >
          The contrast between QR code and background colors may be too low for
          optimal scanning. Proceed with caution and triple check your QR code
          before going live.
        </p>
      )}

      <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
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

      {isGenerated && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {DOWNLOAD_FORMATS.map((format) => (
            <button
              key={format.extension}
              type="button"
              onClick={() => onDownload(format.extension)}
              className={`rounded px-4 py-2 text-white ${format.colorClass}`}
            >
              {format.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
