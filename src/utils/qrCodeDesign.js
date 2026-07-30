const PREVIEW_SIZE = 1000;
const LABELED_FRAME_MARGIN = 104;
const OUTLINE_FRAME_MARGIN = 64;
const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

/**
 * Converts a degree value from the editor into the radians used by the renderer.
 *
 * @param {number} degrees - A rotation from 0 to 360 degrees.
 * @returns {number} The equivalent rotation in radians.
 */
function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

/**
 * Builds a solid or gradient fill understood by qr-code-styling.
 *
 * @param {string} mode - Solid, linear, or radial.
 * @param {string} startColor - The solid color or first gradient stop.
 * @param {string} endColor - The final gradient stop.
 * @param {number} rotation - Linear-gradient rotation in degrees.
 * @returns {object} Renderer fill options.
 */
function createFillOptions(mode, startColor, endColor, rotation) {
  if (mode === "solid") {
    return { color: startColor };
  }

  return {
    color: startColor,
    gradient: {
      type: mode,
      rotation: degreesToRadians(rotation),
      colorStops: [
        { offset: 0, color: startColor },
        { offset: 1, color: endColor },
      ],
    },
  };
}

/**
 * Guarantees enough quiet space for an optional exported frame.
 *
 * @param {object} design - Current editor design.
 * @returns {number} The effective renderer margin.
 */
export function getEffectiveQrMargin(design) {
  if (design.frameStyle === "label") {
    return Math.max(design.margin, LABELED_FRAME_MARGIN);
  }

  if (design.frameStyle === "outline") {
    return Math.max(design.margin, OUTLINE_FRAME_MARGIN);
  }

  return design.margin;
}

/**
 * Converts editor state into qr-code-styling renderer options.
 *
 * @param {object} design - Current editor design.
 * @param {string} payload - Data encoded by the QR.
 * @param {string} logoDataUrl - Optional embedded logo data URL.
 * @param {number} [size=PREVIEW_SIZE] - Output width and height.
 * @returns {object} Options accepted by QRCodeStyling.
 */
export function createQrCodeOptions(
  design,
  payload,
  logoDataUrl,
  size = PREVIEW_SIZE,
) {
  const foregroundFill = createFillOptions(
    design.foregroundMode,
    design.foregroundColor,
    design.foregroundGradientEnd,
    design.foregroundGradientRotation,
  );
  const backgroundFill = design.isBackgroundTransparent
    ? { color: "rgba(255, 255, 255, 0)" }
    : createFillOptions(
        design.backgroundMode,
        design.backgroundColor,
        design.backgroundGradientEnd,
        design.backgroundGradientRotation,
      );
  const cornerSquareFill = design.useCustomCornerColors
    ? { color: design.cornerSquareColor }
    : foregroundFill;
  const cornerDotFill = design.useCustomCornerColors
    ? { color: design.cornerDotColor }
    : foregroundFill;

  return {
    width: size,
    height: size,
    type: "svg",
    shape: design.canvasShape,
    data: payload,
    margin: getEffectiveQrMargin(design),
    image: logoDataUrl,
    qrOptions: {
      errorCorrectionLevel: design.errorCorrectionLevel,
    },
    imageOptions: {
      hideBackgroundDots: design.hideBackgroundDots,
      imageSize: design.logoSize,
      margin: design.logoMargin,
    },
    dotsOptions: {
      type: design.dotStyle,
      ...foregroundFill,
    },
    cornersSquareOptions: {
      type: design.cornerSquareStyle,
      ...cornerSquareFill,
    },
    cornersDotOptions: {
      type: design.cornerDotStyle,
      ...cornerDotFill,
    },
    backgroundOptions: backgroundFill,
  };
}

/**
 * Returns every foreground/background color pairing that affects scan contrast.
 *
 * @param {object} design - Current editor design.
 * @returns {{ foregroundColors: string[], backgroundColors: string[] }} Color groups.
 */
export function getQrDesignColors(design) {
  const foregroundColors = [design.foregroundColor];

  if (design.foregroundMode !== "solid") {
    foregroundColors.push(design.foregroundGradientEnd);
  }

  if (design.useCustomCornerColors) {
    foregroundColors.push(design.cornerSquareColor, design.cornerDotColor);
  }

  const backgroundColors = design.isBackgroundTransparent
    ? ["#ffffff"]
    : [design.backgroundColor];

  if (
    !design.isBackgroundTransparent &&
    design.backgroundMode !== "solid"
  ) {
    backgroundColors.push(design.backgroundGradientEnd);
  }

  return { foregroundColors, backgroundColors };
}

/**
 * Appends a scan-safe border or caption to an exported SVG.
 *
 * @param {SVGElement} svgElement - The generated QR SVG.
 * @param {object} options - Active qr-code-styling options.
 * @param {object} design - Current editor design.
 * @returns {void}
 */
export function appendQrFrame(svgElement, options, design) {
  if (design.frameStyle === "none") {
    return;
  }

  const size = Math.min(options.width, options.height);
  const inset = size * 0.018;
  const strokeWidth = Math.max(2, size * 0.006);
  const border = document.createElementNS(SVG_NAMESPACE, "rect");

  border.setAttribute("x", String(inset));
  border.setAttribute("y", String(inset));
  border.setAttribute("width", String(size - inset * 2));
  border.setAttribute("height", String(size - inset * 2));
  border.setAttribute("rx", String(size * 0.035));
  border.setAttribute("fill", "none");
  border.setAttribute("stroke", design.foregroundColor);
  border.setAttribute("stroke-width", String(strokeWidth));
  border.setAttribute("opacity", "0.92");
  svgElement.appendChild(border);

  if (design.frameStyle !== "label") {
    return;
  }

  const label = document.createElementNS(SVG_NAMESPACE, "text");
  const safeLabel =
    design.frameLabel.trim().replace(/[^\x20-\x7E]/g, "").slice(0, 18) ||
    "SCAN ME";

  label.setAttribute("x", String(size / 2));
  label.setAttribute("y", String(size - size * 0.035));
  label.setAttribute("fill", design.foregroundColor);
  label.setAttribute("font-family", "Arial, Helvetica, sans-serif");
  label.setAttribute("font-size", String(size * 0.032));
  label.setAttribute("font-weight", "700");
  label.setAttribute("letter-spacing", String(size * 0.004));
  label.setAttribute("text-anchor", "middle");
  label.textContent = safeLabel.toUpperCase();
  svgElement.appendChild(label);
}
