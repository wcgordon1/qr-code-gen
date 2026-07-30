import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

import { hasLowQrCodeContrast } from "../utils/colorContrast.js";

const DEFAULT_DOT_COLOR = "#000000";
const DEFAULT_BACKGROUND_COLOR = "#ffffff";

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
        type: "canvas",
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
    if (!isGenerated || !previewRef.current) {
      return;
    }

    qrCode.update({
      data: generatedPayload,
      dotsOptions: {
        color: dotColor,
        type: dotStyle,
      },
      backgroundOptions: {
        color: backgroundColor,
      },
    });
    qrCode.append(previewRef.current);
  }, [
    backgroundColor,
    dotColor,
    dotStyle,
    generatedPayload,
    isGenerated,
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
