export const MINIMUM_QR_CONTRAST_RATIO = 7;

/**
 * Converts a six-digit hexadecimal color into its WCAG relative luminance.
 *
 * @param {string} hexColor - A color in `#RRGGBB` format.
 * @returns {number} The color's relative luminance from 0 to 1.
 */
export function getRelativeLuminance(hexColor) {
  const normalizedColor = hexColor.replace("#", "");
  const colorChannels = normalizedColor
    .match(/.{2}/g)
    .map((channel) => Number.parseInt(channel, 16) / 255);

  const linearChannels = colorChannels.map((channel) => {
    if (channel <= 0.03928) {
      return channel / 12.92;
    }

    return ((channel + 0.055) / 1.055) ** 2.4;
  });

  const [red, green, blue] = linearChannels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/**
 * Calculates the WCAG contrast ratio between two hexadecimal colors.
 *
 * @param {string} foregroundColor - The QR code foreground color.
 * @param {string} backgroundColor - The QR code background color.
 * @returns {number} A contrast ratio from 1 to 21.
 */
export function getContrastRatio(foregroundColor, backgroundColor) {
  const foregroundLuminance = getRelativeLuminance(foregroundColor);
  const backgroundLuminance = getRelativeLuminance(backgroundColor);
  const lighterColor = Math.max(foregroundLuminance, backgroundLuminance);
  const darkerColor = Math.min(foregroundLuminance, backgroundLuminance);

  return (lighterColor + 0.05) / (darkerColor + 0.05);
}

/**
 * Reports whether a color pair falls below the recommended QR contrast ratio.
 *
 * @param {string} foregroundColor - The QR code foreground color.
 * @param {string} backgroundColor - The QR code background color.
 * @returns {boolean} Whether the colors may be difficult for scanners to read.
 */
export function hasLowQrCodeContrast(foregroundColor, backgroundColor) {
  return (
    getContrastRatio(foregroundColor, backgroundColor) <
    MINIMUM_QR_CONTRAST_RATIO
  );
}
