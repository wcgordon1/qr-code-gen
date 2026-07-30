import {
  QR_CORNER_DOT_STYLES,
  QR_CORNER_SQUARE_STYLES,
  QR_DOT_STYLES,
  QR_PRESETS,
} from "../../config/qrCodeOptions.js";

/**
 * Renders curated presets and QR module/finder-pattern shape controls.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Pattern editor controls.
 */
export default function QrCodePatternControls({
  design,
  onApplyPreset,
  onDesignChange,
}) {
  return (
    <div className="space-y-7">
      <section aria-labelledby="preset-heading">
        <ControlHeading
          id="preset-heading"
          title="Start with a preset"
          description="Presets change appearance only. Your content and logo stay in place."
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {QR_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => onApplyPreset(preset.design)}
              className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-[0_10px_24px_rgba(30,41,59,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:translate-y-0"
            >
              <span className="flex -space-x-2" aria-hidden="true">
                {preset.swatches.map((swatch) => (
                  <span
                    key={swatch}
                    className="h-8 w-8 rounded-full border-2 border-white shadow-sm"
                    style={{ backgroundColor: swatch }}
                  />
                ))}
              </span>
              <span>
                <span className="block text-sm font-semibold text-slate-900">
                  {preset.name}
                </span>
                <span className="block text-xs text-slate-500">
                  {preset.description}
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <StyleChoiceGroup
        description="Changes the shape of the QR data modules."
        label="Module pattern"
        options={QR_DOT_STYLES}
        selectedValue={design.dotStyle}
        onChange={(value) => onDesignChange("dotStyle", value)}
      />

      <div className="grid gap-6 sm:grid-cols-2">
        <StyleChoiceGroup
          description="The outer finder shapes."
          label="Outer eyes"
          options={QR_CORNER_SQUARE_STYLES}
          selectedValue={design.cornerSquareStyle}
          onChange={(value) =>
            onDesignChange("cornerSquareStyle", value)
          }
        />
        <StyleChoiceGroup
          description="The center of each finder."
          label="Inner eyes"
          options={QR_CORNER_DOT_STYLES}
          selectedValue={design.cornerDotStyle}
          onChange={(value) => onDesignChange("cornerDotStyle", value)}
        />
      </div>
    </div>
  );
}

/**
 * Groups a labeled set of visual QR shape choices.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Accessible shape selection.
 */
function StyleChoiceGroup({
  description,
  label,
  onChange,
  options,
  selectedValue,
}) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-900">{label}</legend>
      <p className="mb-3 mt-1 text-xs leading-5 text-slate-500">
        {description}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                isSelected
                  ? "border-indigo-600 bg-indigo-50 text-indigo-950 shadow-[inset_0_0_0_1px_#4f46e5]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
              }`}
              aria-pressed={isSelected}
            >
              <StyleShapeIcon styleName={option.value} />
              <span>{option.label}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * Provides a compact visual sample for a QR shape option.
 *
 * @param {{ styleName: string }} props - Selected renderer style name.
 * @returns {JSX.Element} Decorative style icon.
 */
function StyleShapeIcon({ styleName }) {
  const radiusByStyle = {
    square: "1",
    rounded: "4",
    "extra-rounded": "8",
    classy: "1",
    "classy-rounded": "5",
  };

  if (styleName === "dots" || styleName === "dot") {
    return (
      <svg
        className="h-6 w-6 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="7" cy="7" r="3" />
        <circle cx="17" cy="7" r="3" />
        <circle cx="7" cy="17" r="3" />
        <circle cx="17" cy="17" r="3" />
      </svg>
    );
  }

  if (styleName.startsWith("classy")) {
    return (
      <svg
        className="h-6 w-6 shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 4h7v7H4zM13 4h7v7h-4a3 3 0 0 1-3-3zM4 13h7v7H4zM13 13h7v7h-7z" />
      </svg>
    );
  }

  return (
    <svg
      className="h-6 w-6 shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx={radiusByStyle[styleName] ?? "1"}
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx={radiusByStyle[styleName] ?? "1"}
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx={radiusByStyle[styleName] ?? "1"}
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx={radiusByStyle[styleName] ?? "1"}
      />
    </svg>
  );
}

/**
 * Renders consistent headings for control groups.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} A section heading with supporting copy.
 */
function ControlHeading({ description, id, title }) {
  return (
    <div className="mb-3">
      <h3 id={id} className="text-sm font-semibold text-slate-900">
        {title}
      </h3>
      <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
    </div>
  );
}
