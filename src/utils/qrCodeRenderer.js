import QRCodeStyling from "qr-code-styling";

import {
  appendQrFrame,
  createQrCodeOptions,
} from "./qrCodeDesign.js";

/**
 * Adds SVG viewport metadata so a high-resolution QR scales to its panel.
 *
 * @param {HTMLElement} previewElement - The element containing the QR SVG.
 * @returns {void}
 */
export function makeQrPreviewResponsive(previewElement) {
  const svgElement = previewElement.querySelector("svg");

  if (!svgElement) {
    return;
  }

  const width = svgElement.getAttribute("width");
  const height = svgElement.getAttribute("height");

  if (width && height) {
    svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
}

/**
 * Creates a QR renderer with the current design and SVG frame extension.
 *
 * @param {object} design - Current editor design.
 * @param {string} payload - Data encoded by the QR.
 * @param {string} logoDataUrl - Optional embedded logo.
 * @param {number} size - Output width and height.
 * @returns {QRCodeStyling} A configured renderer instance.
 */
export function createQrCodeRenderer(
  design,
  payload,
  logoDataUrl,
  size,
) {
  const qrCode = new QRCodeStyling(
    createQrCodeOptions(design, payload, logoDataUrl, size),
  );

  qrCode.applyExtension((svgElement, options) => {
    appendQrFrame(svgElement, options, design);
  });

  return qrCode;
}

/**
 * Renders one independent QR file for scanning, copying, or downloading.
 *
 * @param {object} design - Current editor design.
 * @param {string} payload - Data encoded by the QR.
 * @param {string} logoDataUrl - Optional embedded logo.
 * @param {number} size - Output width and height.
 * @param {string} fileType - PNG, SVG, WebP, or JPEG.
 * @returns {Promise<Blob>} Generated browser file.
 */
export async function createQrCodeBlob(
  design,
  payload,
  logoDataUrl,
  size,
  fileType,
) {
  const qrCode = createQrCodeRenderer(
    design,
    payload,
    logoDataUrl,
    size,
  );
  const qrCodeBlob = await qrCode.getRawData(fileType);

  if (!qrCodeBlob) {
    throw new Error("The QR file could not be created.");
  }

  return qrCodeBlob;
}
