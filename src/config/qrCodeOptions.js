export const QR_DOT_STYLES = Object.freeze([
  { value: "square", label: "Square" },
  { value: "dots", label: "Dots" },
  { value: "rounded", label: "Rounded" },
  { value: "classy", label: "Classy" },
  { value: "classy-rounded", label: "Soft classy" },
  { value: "extra-rounded", label: "Extra round" },
]);

export const QR_CORNER_SQUARE_STYLES = Object.freeze([
  { value: "square", label: "Square" },
  { value: "dot", label: "Round" },
  { value: "extra-rounded", label: "Soft" },
]);

export const QR_CORNER_DOT_STYLES = Object.freeze([
  { value: "square", label: "Square" },
  { value: "dot", label: "Round" },
]);

export const QR_ERROR_CORRECTION_LEVELS = Object.freeze([
  {
    value: "L",
    label: "Low",
    description: "Best for simple, unbranded codes.",
  },
  {
    value: "M",
    label: "Medium",
    description: "A balanced option for everyday use.",
  },
  {
    value: "Q",
    label: "Quartile",
    description: "The recommended default for styled codes.",
  },
  {
    value: "H",
    label: "High",
    description: "Best when a center logo covers QR modules.",
  },
]);

export const QR_EXPORT_FORMATS = Object.freeze([
  { value: "png", label: "PNG" },
  { value: "svg", label: "SVG" },
  { value: "webp", label: "WebP" },
  { value: "jpeg", label: "JPEG" },
]);

export const QR_EXPORT_SIZES = Object.freeze([512, 1024, 2048, 4096]);

export const QR_FRAME_STYLES = Object.freeze([
  {
    value: "none",
    label: "None",
    description: "Export only the QR code.",
  },
  {
    value: "outline",
    label: "Outline",
    description: "Add a restrained rounded border.",
  },
  {
    value: "label",
    label: "Label",
    description: "Add a scan prompt beneath the code.",
  },
]);

export const QR_PRESETS = Object.freeze([
  {
    id: "classic",
    name: "Classic",
    description: "Maximum contrast",
    swatches: ["#111827", "#ffffff"],
    design: {
      dotStyle: "square",
      cornerSquareStyle: "square",
      cornerDotStyle: "square",
      foregroundMode: "solid",
      foregroundColor: "#111827",
      backgroundMode: "solid",
      backgroundColor: "#ffffff",
      useCustomCornerColors: false,
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    description: "Soft and understated",
    swatches: ["#172554", "#eff6ff"],
    design: {
      dotStyle: "rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
      foregroundMode: "solid",
      foregroundColor: "#172554",
      backgroundMode: "solid",
      backgroundColor: "#eff6ff",
      useCustomCornerColors: false,
    },
  },
  {
    id: "lagoon",
    name: "Lagoon",
    description: "Cool radial depth",
    swatches: ["#083344", "#0f766e", "#ecfeff"],
    design: {
      dotStyle: "classy-rounded",
      cornerSquareStyle: "extra-rounded",
      cornerDotStyle: "dot",
      foregroundMode: "radial",
      foregroundColor: "#083344",
      foregroundGradientEnd: "#0f766e",
      backgroundMode: "solid",
      backgroundColor: "#ecfeff",
      useCustomCornerColors: false,
    },
  },
  {
    id: "berry",
    name: "Berry",
    description: "Rich linear color",
    swatches: ["#4c0519", "#9f1239", "#fff1f2"],
    design: {
      dotStyle: "extra-rounded",
      cornerSquareStyle: "dot",
      cornerDotStyle: "dot",
      foregroundMode: "linear",
      foregroundColor: "#4c0519",
      foregroundGradientEnd: "#9f1239",
      foregroundGradientRotation: 135,
      backgroundMode: "solid",
      backgroundColor: "#fff1f2",
      useCustomCornerColors: false,
    },
  },
]);

/**
 * Creates the complete, mutable design state for a QR editor instance.
 *
 * @param {string} initialDotStyle - The generator's preferred initial module style.
 * @returns {object} A fresh QR design object.
 */
export function createInitialQrDesign(initialDotStyle = "square") {
  return {
    backgroundColor: "#ffffff",
    backgroundGradientEnd: "#e0e7ff",
    backgroundGradientRotation: 0,
    backgroundMode: "solid",
    canvasShape: "square",
    cornerDotColor: "#111827",
    cornerDotStyle: "square",
    cornerSquareColor: "#111827",
    cornerSquareStyle: "square",
    dotStyle: initialDotStyle,
    errorCorrectionLevel: "Q",
    exportSize: 1024,
    foregroundColor: "#111827",
    foregroundGradientEnd: "#4338ca",
    foregroundGradientRotation: 45,
    foregroundMode: "solid",
    frameLabel: "SCAN ME",
    frameStyle: "none",
    hideBackgroundDots: true,
    isBackgroundTransparent: false,
    logoMargin: 8,
    logoSize: 0.22,
    margin: 40,
    useCustomCornerColors: false,
  };
}
