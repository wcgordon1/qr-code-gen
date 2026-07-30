import QrCodeColorPicker from "./QrCodeColorPicker.jsx";

const FILL_MODES = [
  { value: "solid", label: "Solid" },
  { value: "linear", label: "Linear" },
  { value: "radial", label: "Radial" },
];

/**
 * Renders foreground, background, gradient, and finder-color controls.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Complete color editor.
 */
export default function QrCodeColorControls({ design, onDesignChange }) {
  return (
    <div className="space-y-7">
      <FillEditor
        description="Use a dark foreground for the most reliable scans."
        endColor={design.foregroundGradientEnd}
        endColorField="foregroundGradientEnd"
        label="QR color"
        mode={design.foregroundMode}
        modeField="foregroundMode"
        onDesignChange={onDesignChange}
        rotation={design.foregroundGradientRotation}
        rotationField="foregroundGradientRotation"
        startColor={design.foregroundColor}
        startColorField="foregroundColor"
      />

      <section className="border-t border-slate-200 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Background
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Transparent exports are checked as if placed on white.
            </p>
          </div>
          <ToggleSwitch
            checked={design.isBackgroundTransparent}
            label="Transparent"
            onChange={(isChecked) =>
              onDesignChange("isBackgroundTransparent", isChecked)
            }
          />
        </div>

        {!design.isBackgroundTransparent && (
          <div className="mt-4">
            <FillEditor
              endColor={design.backgroundGradientEnd}
              endColorField="backgroundGradientEnd"
              label=""
              mode={design.backgroundMode}
              modeField="backgroundMode"
              onDesignChange={onDesignChange}
              rotation={design.backgroundGradientRotation}
              rotationField="backgroundGradientRotation"
              startColor={design.backgroundColor}
              startColorField="backgroundColor"
            />
          </div>
        )}
      </section>

      <section className="border-t border-slate-200 pt-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">
              Finder colors
            </h3>
            <p className="mt-1 text-xs leading-5 text-slate-500">
              Separate the three corner eyes from the module color.
            </p>
          </div>
          <ToggleSwitch
            checked={design.useCustomCornerColors}
            label="Customize"
            onChange={(isChecked) =>
              onDesignChange("useCustomCornerColors", isChecked)
            }
          />
        </div>

        {design.useCustomCornerColors && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <QrCodeColorPicker
              color={design.cornerSquareColor}
              label="Outer eyes"
              onChange={(color) =>
                onDesignChange("cornerSquareColor", color)
              }
            />
            <QrCodeColorPicker
              color={design.cornerDotColor}
              label="Inner eyes"
              onChange={(color) => onDesignChange("cornerDotColor", color)}
            />
          </div>
        )}
      </section>
    </div>
  );
}

/**
 * Edits one solid or gradient fill.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Fill mode and color controls.
 */
function FillEditor({
  description,
  endColor,
  endColorField,
  label,
  mode,
  modeField,
  onDesignChange,
  rotation,
  rotationField,
  startColor,
  startColorField,
}) {
  return (
    <section>
      {label && (
        <div className="mb-3">
          <h3 className="text-sm font-semibold text-slate-900">{label}</h3>
          {description && (
            <p className="mt-1 text-xs leading-5 text-slate-500">
              {description}
            </p>
          )}
        </div>
      )}

      <SegmentedControl
        label={`${label || "Background"} fill type`}
        options={FILL_MODES}
        selectedValue={mode}
        onChange={(value) => onDesignChange(modeField, value)}
      />

      <div
        className={`mt-3 grid gap-3 ${
          mode === "solid" ? "" : "sm:grid-cols-2"
        }`}
      >
        <QrCodeColorPicker
          color={startColor}
          label={mode === "solid" ? "Color" : "Start color"}
          onChange={(color) => onDesignChange(startColorField, color)}
        />
        {mode !== "solid" && (
          <QrCodeColorPicker
            color={endColor}
            label="End color"
            onChange={(color) => onDesignChange(endColorField, color)}
          />
        )}
      </div>

      {mode === "linear" && (
        <label className="mt-4 block">
          <span className="flex items-center justify-between text-xs font-medium text-slate-600">
            <span>Gradient angle</span>
            <span className="font-mono tabular-nums">{rotation}°</span>
          </span>
          <input
            type="range"
            min="0"
            max="360"
            step="15"
            value={rotation}
            onChange={(event) =>
              onDesignChange(rotationField, Number(event.target.value))
            }
            className="qr-range mt-2 w-full"
          />
        </label>
      )}
    </section>
  );
}

/**
 * Renders a compact accessible segmented selection control.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} A single-choice button group.
 */
function SegmentedControl({ label, onChange, options, selectedValue }) {
  return (
    <div
      className="grid grid-cols-3 rounded-lg bg-slate-100 p-1"
      role="group"
      aria-label={label}
    >
      {options.map((option) => {
        const isSelected = option.value === selectedValue;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-md px-3 py-2 text-xs font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
              isSelected
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
            aria-pressed={isSelected}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Renders a labeled boolean switch.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} Accessible toggle.
 */
function ToggleSwitch({ checked, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-slate-600">
      <span>{label}</span>
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="relative h-6 w-11 rounded-full bg-slate-200 transition peer-checked:bg-indigo-600 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-indigo-600 after:absolute after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-sm after:transition after:content-[''] peer-checked:after:translate-x-5" />
    </label>
  );
}
