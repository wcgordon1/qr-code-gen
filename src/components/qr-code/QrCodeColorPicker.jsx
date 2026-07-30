/**
 * Renders a labeled native color picker for one part of the QR code.
 *
 * @param {object} props - Component properties.
 * @param {string} props.color - The currently selected hexadecimal color.
 * @param {string} props.label - The name shown on the picker button.
 * @param {(color: string) => void} props.onChange - Stores a selected color.
 * @returns {JSX.Element} A QR color control.
 */
export default function QrCodeColorPicker({ color, label, onChange }) {
  return (
    <label className="flex items-center">
      <span className="mr-2 inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-700 md:text-base">
        {label}
      </span>
      <input
        type="color"
        value={color}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-10 cursor-pointer rounded-lg border border-gray-300 bg-white p-1"
        aria-label={label}
      />
      <span className="sr-only" aria-live="polite">
        {color}
      </span>
    </label>
  );
}
