/**
 * Renders center-logo upload, sizing, spacing, and removal controls.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Logo editor controls.
 */
export default function QrCodeLogoControls({
  design,
  logoName,
  onDesignChange,
  onLogoChange,
  onLogoRemove,
}) {
  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-sm font-semibold text-slate-900">Center logo</h3>
        <p className="mt-1 max-w-xl text-xs leading-5 text-slate-500">
          Add a PNG, JPEG, or WebP up to 3 MB. High error correction is selected
          automatically when you add a logo.
        </p>

        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5">
          <label className="flex cursor-pointer flex-col items-center text-center">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-white text-xl text-indigo-600 shadow-sm">
              +
            </span>
            <span className="mt-3 text-sm font-semibold text-slate-800">
              {logoName ? "Replace logo" : "Choose a logo"}
            </span>
            <span className="mt-1 max-w-xs text-xs text-slate-500">
              Your image remains in this browser and is embedded in the export.
            </span>
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              className="sr-only"
              onChange={(event) => {
                const [file] = event.target.files;

                if (file) {
                  onLogoChange(file);
                }

                event.target.value = "";
              }}
            />
          </label>
        </div>

        {logoName && (
          <div className="mt-3 flex items-center justify-between gap-4 rounded-lg bg-indigo-50 px-3 py-2">
            <span className="min-w-0 truncate text-xs font-semibold text-indigo-950">
              {logoName}
            </span>
            <button
              type="button"
              onClick={onLogoRemove}
              className="shrink-0 text-xs font-semibold text-indigo-700 hover:text-indigo-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Remove
            </button>
          </div>
        )}
      </section>

      {logoName && (
        <section className="space-y-5 border-t border-slate-200 pt-6">
          <RangeControl
            label="Logo size"
            min={12}
            max={35}
            suffix="%"
            value={Math.round(design.logoSize * 100)}
            onChange={(value) => onDesignChange("logoSize", value / 100)}
          />
          <RangeControl
            label="Logo padding"
            min={0}
            max={30}
            suffix=" px"
            value={design.logoMargin}
            onChange={(value) => onDesignChange("logoMargin", value)}
          />
          <label className="flex items-start gap-3 rounded-lg bg-slate-50 p-3">
            <input
              type="checkbox"
              checked={design.hideBackgroundDots}
              onChange={(event) =>
                onDesignChange("hideBackgroundDots", event.target.checked)
              }
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span>
              <span className="block text-xs font-semibold text-slate-800">
                Clear modules behind logo
              </span>
              <span className="mt-1 block text-xs leading-5 text-slate-500">
                Recommended for a cleaner logo and more dependable scan.
              </span>
            </span>
          </label>
        </section>
      )}
    </div>
  );
}

/**
 * Renders a consistently labeled numeric range.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Range input and current value.
 */
function RangeControl({
  label,
  max,
  min,
  onChange,
  suffix,
  value,
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-xs font-semibold text-slate-700">
        <span>{label}</span>
        <span className="font-mono tabular-nums text-slate-500">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="qr-range mt-3 w-full"
      />
    </label>
  );
}
