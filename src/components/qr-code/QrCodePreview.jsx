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
  isGenerated,
  onDownload,
  previewRef,
}) {
  return (
    <div className="flex flex-col items-center md:w-1/2">
      <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
        {isGenerated ? (
          <div
            ref={previewRef}
            className="absolute inset-0 flex items-center justify-center [&>canvas]:h-full [&>canvas]:w-full [&>canvas]:object-contain"
            aria-label="Generated QR code preview"
            role="img"
          />
        ) : (
          <img
            src="/images/qr.png"
            alt="Sample QR code placeholder"
            className="h-full w-full object-contain"
          />
        )}
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
