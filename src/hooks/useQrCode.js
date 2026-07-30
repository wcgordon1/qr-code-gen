import { useEffect, useMemo, useRef, useState } from "react";

import { createInitialQrDesign } from "../config/qrCodeOptions.js";
import {
  getMinimumQrContrastRatio,
  MINIMUM_QR_CONTRAST_RATIO,
} from "../utils/colorContrast.js";
import {
  appendQrFrame,
  createQrCodeOptions,
  getQrDesignColors,
} from "../utils/qrCodeDesign.js";
import {
  createQrCodeBlob,
  createQrCodeRenderer,
  makeQrPreviewResponsive,
} from "../utils/qrCodeRenderer.js";
import { evaluateQrCodeScanability } from "../utils/qrCodeScan.js";
import { useQrCodeExport } from "./useQrCodeExport.js";

const DEFAULT_PREVIEW_PAYLOAD = "https://qrcodellama.com";
const PREVIEW_SIZE = 1000;
const SCAN_RENDER_SIZE = 800;
const MAXIMUM_LOGO_FILE_SIZE = 3 * 1024 * 1024;
const SUPPORTED_LOGO_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
]);
const IDLE_SCAN_RESULT = Object.freeze({
  status: "idle",
  passedChecks: 0,
  totalChecks: 3,
  checks: [],
});

/**
 * Reads a supported logo into a renderer-safe data URL.
 *
 * @param {File} file - User-selected image file.
 * @returns {Promise<string>} Embedded image data.
 */
function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("The logo file could not be read."));
    reader.readAsDataURL(file);
  });
}

/**
 * Owns QR rendering, design state, local scan checks, and file exports.
 *
 * @param {string} initialDotStyle - The generator's preferred module style.
 * @returns {object} State and actions used by the QR generator interface.
 */
export function useQrCode(initialDotStyle) {
  const previewRef = useRef(null);
  const [design, setDesign] = useState(() =>
    createInitialQrDesign(initialDotStyle),
  );
  const [generatedPayload, setGeneratedPayload] = useState("");
  const [logoDataUrl, setLogoDataUrl] = useState("");
  const [logoName, setLogoName] = useState("");
  const [scanResult, setScanResult] = useState(IDLE_SCAN_RESULT);
  const [qrCode] = useState(
    () =>
      createQrCodeRenderer(
        createInitialQrDesign(initialDotStyle),
        DEFAULT_PREVIEW_PAYLOAD,
        "",
        PREVIEW_SIZE,
      ),
  );
  const { copyToClipboard, download, isExporting } = useQrCodeExport({
    design,
    generatedPayload,
    logoDataUrl,
  });

  const isGenerated = generatedPayload.length > 0;
  const designColors = useMemo(() => getQrDesignColors(design), [design]);
  const minimumContrastRatio = getMinimumQrContrastRatio(
    designColors.foregroundColors,
    designColors.backgroundColors,
  );
  const hasContrastWarning =
    minimumContrastRatio < MINIMUM_QR_CONTRAST_RATIO;

  useEffect(() => {
    const previewElement = previewRef.current;

    if (!previewElement) {
      return;
    }

    const previewObserver = new MutationObserver(() => {
      makeQrPreviewResponsive(previewElement);
    });

    previewObserver.observe(previewElement, {
      childList: true,
      subtree: true,
    });

    qrCode.append(previewElement);
    makeQrPreviewResponsive(previewElement);

    return () => {
      previewObserver.disconnect();
      previewElement.replaceChildren();
    };
  }, [qrCode]);

  useEffect(() => {
    qrCode.update(
      createQrCodeOptions(
        design,
        generatedPayload || DEFAULT_PREVIEW_PAYLOAD,
        logoDataUrl,
        PREVIEW_SIZE,
      ),
    );
    qrCode.applyExtension((svgElement, options) => {
      appendQrFrame(svgElement, options, design);
    });
  }, [design, generatedPayload, logoDataUrl, qrCode]);

  useEffect(() => {
    if (!generatedPayload) {
      return undefined;
    }

    let isCancelled = false;

    const scanTimer = window.setTimeout(async () => {
      try {
        const qrImageBlob = await createQrCodeBlob(
          design,
          generatedPayload,
          logoDataUrl,
          SCAN_RENDER_SIZE,
          "png",
        );

        const nextScanResult = await evaluateQrCodeScanability(
          qrImageBlob,
          generatedPayload,
        );

        if (!isCancelled) {
          setScanResult(nextScanResult);
        }
      } catch {
        if (!isCancelled) {
          setScanResult({
            ...IDLE_SCAN_RESULT,
            status: "unavailable",
          });
        }
      }
    }, 450);

    return () => {
      isCancelled = true;
      window.clearTimeout(scanTimer);
    };
  }, [design, generatedPayload, logoDataUrl]);

  /**
   * Keeps the stable status panel accurate while a new local check is pending.
   *
   * @returns {void}
   */
  function markScanCheckPending() {
    setScanResult((currentResult) => ({
      ...currentResult,
      status: "checking",
    }));
  }

  /**
   * Stores one design value and refreshes the live preview.
   *
   * @param {string} fieldName - Design property to update.
   * @param {string | number | boolean} value - The next property value.
   * @returns {void}
   */
  function updateDesign(fieldName, value) {
    setDesign((currentDesign) => ({
      ...currentDesign,
      [fieldName]: value,
    }));

    if (generatedPayload) {
      markScanCheckPending();
    }
  }

  /**
   * Applies a curated visual preset without replacing export or logo settings.
   *
   * @param {object} presetDesign - Appearance values from a QR preset.
   * @returns {void}
   */
  function applyPreset(presetDesign) {
    setDesign((currentDesign) => ({
      ...currentDesign,
      ...presetDesign,
      isBackgroundTransparent: false,
    }));

    if (generatedPayload) {
      markScanCheckPending();
    }
  }

  /**
   * Stores a new payload so the QR preview and scan check can render it.
   *
   * @param {string} payload - The data encoded in the QR code.
   * @returns {void}
   */
  function generate(payload) {
    setGeneratedPayload(payload);
    markScanCheckPending();
  }

  /**
   * Returns the preview to sample data after generator content changes.
   *
   * @returns {void}
   */
  function resetPreview() {
    setGeneratedPayload("");
    setScanResult(IDLE_SCAN_RESULT);
  }

  /**
   * Validates and embeds an optional center logo.
   *
   * @param {File} file - PNG, JPEG, or WebP logo.
   * @returns {Promise<void>}
   */
  async function setLogoFile(file) {
    if (!SUPPORTED_LOGO_TYPES.has(file.type)) {
      throw new Error("Choose a PNG, JPEG, or WebP logo.");
    }

    if (file.size > MAXIMUM_LOGO_FILE_SIZE) {
      throw new Error("Choose a logo smaller than 3 MB.");
    }

    const nextLogoDataUrl = await readFileAsDataUrl(file);
    setLogoDataUrl(nextLogoDataUrl);
    setLogoName(file.name);
    setDesign((currentDesign) => ({
      ...currentDesign,
      errorCorrectionLevel: "H",
    }));

    if (generatedPayload) {
      markScanCheckPending();
    }
  }

  /**
   * Removes the embedded logo while preserving other design choices.
   *
   * @returns {void}
   */
  function removeLogo() {
    setLogoDataUrl("");
    setLogoName("");

    if (generatedPayload) {
      markScanCheckPending();
    }
  }

  /**
   * Restores the initial appearance and removes any uploaded logo.
   *
   * @returns {void}
   */
  function resetDesign() {
    setDesign(createInitialQrDesign(initialDotStyle));
    removeLogo();
  }

  return {
    applyPreset,
    copyToClipboard,
    design,
    download,
    generate,
    hasContrastWarning,
    isExporting,
    isGenerated,
    logoName,
    minimumContrastRatio,
    previewRef,
    removeLogo,
    resetDesign,
    resetPreview,
    scanResult,
    setLogoFile,
    updateDesign,
  };
}
