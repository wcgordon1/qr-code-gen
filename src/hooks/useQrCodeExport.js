import { useState } from "react";

import { createQrCodeBlob } from "../utils/qrCodeRenderer.js";

/**
 * Downloads an in-memory file without sending it to a server.
 *
 * @param {Blob} fileBlob - Generated QR data.
 * @param {string} fileName - Browser download name.
 * @returns {void}
 */
function downloadBlob(fileBlob, fileName) {
  const downloadUrl = URL.createObjectURL(fileBlob);
  const downloadLink = document.createElement("a");

  downloadLink.href = downloadUrl;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  downloadLink.remove();
  URL.revokeObjectURL(downloadUrl);
}

/**
 * Isolates QR download and clipboard behavior from preview/design state.
 *
 * @param {object} options - Current export dependencies.
 * @returns {object} Export state and actions.
 */
export function useQrCodeExport({
  design,
  generatedPayload,
  logoDataUrl,
}) {
  const [isExporting, setIsExporting] = useState(false);

  /**
   * Renders the current design into an exportable browser file.
   *
   * @param {string} fileType - PNG, SVG, WebP, or JPEG.
   * @returns {Promise<Blob>} Generated browser file.
   */
  async function createExportBlob(fileType) {
    let exportDesign = design;

    if (fileType === "jpeg" && design.isBackgroundTransparent) {
      exportDesign = {
        ...design,
        isBackgroundTransparent: false,
        backgroundMode: "solid",
        backgroundColor: "#ffffff",
      };
    }

    return createQrCodeBlob(
      exportDesign,
      generatedPayload,
      logoDataUrl,
      design.exportSize,
      fileType,
    );
  }

  /**
   * Prompts for a file name and downloads the current QR code.
   *
   * @param {string} fileType - One of the supported QR export formats.
   * @param {string} defaultFileName - Initial name shown in the prompt.
   * @returns {Promise<boolean>} Whether a download started.
   */
  async function download(fileType, defaultFileName) {
    const requestedName = window.prompt(
      `Name your ${fileType.toUpperCase()} file:`,
      defaultFileName,
    );

    if (!requestedName?.trim()) {
      return false;
    }

    setIsExporting(true);

    try {
      const exportBlob = await createExportBlob(fileType);
      const fileName = requestedName.trim().replace(/\.[^.]+$/, "");
      downloadBlob(exportBlob, `${fileName}.${fileType}`);
      return true;
    } finally {
      setIsExporting(false);
    }
  }

  /**
   * Copies a PNG image or SVG source to the system clipboard.
   *
   * @param {"image" | "svg"} copyType - Clipboard representation.
   * @returns {Promise<void>}
   */
  async function copyToClipboard(copyType) {
    setIsExporting(true);

    try {
      if (copyType === "svg") {
        const svgBlob = await createExportBlob("svg");
        await navigator.clipboard.writeText(await svgBlob.text());
        return;
      }

      if (!window.ClipboardItem || !navigator.clipboard?.write) {
        throw new Error("Image copying is not supported by this browser.");
      }

      const pngBlob = await createExportBlob("png");
      await navigator.clipboard.write([
        new window.ClipboardItem({ "image/png": pngBlob }),
      ]);
    } finally {
      setIsExporting(false);
    }
  }

  return {
    copyToClipboard,
    download,
    isExporting,
  };
}
