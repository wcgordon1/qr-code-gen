import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

import { hasLowQrCodeContrast } from "../utils/colorContrast.js";

const DEFAULT_DOT_COLOR = "#000000";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";
const DEFAULT_PREVIEW_PAYLOAD = "https://qrcodellama.com";

/**
 * Adds the missing SVG viewport metadata so the 1000px QR scales to its panel.
 *
 * @param {HTMLElement} previewElement - The element containing the QR SVG.
 * @returns {void}
 */
function makePreviewSvgResponsive(previewElement) {
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
 * Owns QR rendering, appearance, preview state, and file downloads.
 *
 * @param {string} initialDotStyle - The initial shape of the QR modules.
 * @returns {object} State and actions used by the QR generator interface.
 */
export function useQrCode(initialDotStyle) {
  const previewRef = useRef(null);
  const [qrCode] = useState(
    () =>
      new QRCodeStyling({
        width: 1000,
        height: 1000,
        type: "svg",
        data: DEFAULT_PREVIEW_PAYLOAD,
        dotsOptions: {
          color: DEFAULT_DOT_COLOR,
          type: initialDotStyle,
        },
        backgroundOptions: {
          color: DEFAULT_BACKGROUND_COLOR,
        },
      }),
  );
  const [generatedPayload, setGeneratedPayload] = useState("");
  const [dotColor, setDotColor] = useState(DEFAULT_DOT_COLOR);
  const [backgroundColor, setBackgroundColor] = useState(
    DEFAULT_BACKGROUND_COLOR,
  );
  const [dotStyle, setDotStyle] = useState(initialDotStyle);

  const isGenerated = generatedPayload.length > 0;
  const hasContrastWarning = hasLowQrCodeContrast(
    dotColor,
    backgroundColor,
  );

  useEffect(() => {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return;
    }

    const previewObserver = new MutationObserver(() => {
      makePreviewSvgResponsive(previewElement);
    });

    previewObserver.observe(previewElement, {
      childList: true,
      subtree: true,
    });

    qrCode.append(previewElement);
    makePreviewSvgResponsive(previewElement);

    return () => {
      previewObserver.disconnect();
      previewElement.replaceChildren();
    };
  }, [qrCode]);

  useEffect(() => {
    qrCode.update({
      data: generatedPayload || DEFAULT_PREVIEW_PAYLOAD,
      dotsOptions: {
        color: dotColor,
        type: dotStyle,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
    });
  }, [
    backgroundColor,
    dotColor,
    dotStyle,
    generatedPayload,
    qrCode,
  ]);

  /**
   * Stores a new payload so the QR preview can render it.
   *
   * @param {string} payload - The data encoded in the QR code.
   * @returns {void}
   */
  function generate(payload) {
    setGeneratedPayload(payload);
  }

  /**
   * Hides a generated preview after its form data changes.
   *
   * @returns {void}
   */
  function resetPreview() {
    setGeneratedPayload("");
  }

  /**
   * Prompts for a file name and downloads the QR code in the selected format.
   *
   * @param {string} fileType - One of the supported QR export formats.
   * @param {string} defaultFileName - The initial name shown in the prompt.
   * @returns {Promise<void>}
   */
  async function download(fileType, defaultFileName) {
    const fileName = window.prompt(
      `Enter a file name for your ${fileType.toUpperCase()} download:`,
      defaultFileName,
    );

    if (!fileName) {
      return;
    }

    await qrCode.download({
      name: fileName,
      extension: fileType,
    });
  }

  return {
    backgroundColor,
    dotColor,
    dotStyle,
    download,
    generate,
    hasContrastWarning,
    isGenerated,
    previewRef,
    resetPreview,
    setBackgroundColor,
    setDotColor,
    setDotStyle,
  };
}
