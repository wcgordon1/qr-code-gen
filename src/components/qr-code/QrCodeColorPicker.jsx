/**
 * Renders a labeled native color picker with its exact hexadecimal value.
 *
 * @param {object} props - Component properties.
 * @param {string} props.color - Current six-digit hexadecimal color.
 * @param {string} props.label - Human-readable color role.
 * @param {(color: string) => void} props.onChange - Stores a selected color.
 * @returns {JSX.Element} Accessible QR color control.
 */
export default function QrCodeColorPicker({ color, label, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-2.5 transition hover:border-slate-300 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100">
      <span className="min-w-0">
        <span className="block text-xs font-semibold text-slate-700">
          {label}
        </span>
        <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wide text-slate-400">
          {color}
        </span>
      </span>
      <span
        className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-slate-200 shadow-inner"
        style={{ backgroundColor: color }}
      >
        <input
          type="color"
          value={color}
          onChange={(event) => onChange(event.target.value)}
          className="absolute -inset-2 h-14 w-14 cursor-pointer opacity-0"
          aria-label={label}
        />
      </span>
    </label>
  );
}
