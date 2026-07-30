import { useState } from "react";
import { HiOutlineArrowRight, HiOutlineLockClosed } from "react-icons/hi2";
import toast, { Toaster } from "react-hot-toast";

import { useQrCode } from "../../hooks/useQrCode.js";
import GeneratorFields from "./GeneratorFields.jsx";
import QrCodePreview from "./QrCodePreview.jsx";
import QrCodeStyleControls from "./QrCodeStyleControls.jsx";

const TOAST_OPTIONS = {
  duration: 3200,
  position: "top-right",
  style: {
    background: "#0f172a",
    color: "#f8fafc",
    borderRadius: "12px",
    boxShadow: "0 16px 45px rgba(15, 23, 42, 0.2)",
  },
};

/**
 * Coordinates generator content with the shared QR design and export editor.
 *
 * @param {{ config: object }} props - The active generator configuration.
 * @returns {JSX.Element} A complete QR code editor.
 */
export default function QrCodeGenerator({ config }) {
  const [formValues, setFormValues] = useState(() => ({
    ...config.initialValues,
  }));
  const {
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
  } = useQrCode(config.initialDotStyle);

  /**
   * Stores one content value and invalidates the previous generated payload.
   *
   * @param {string} fieldName - Form field to update.
   * @param {string | boolean} value - Field's next value.
   * @returns {void}
   */
  function updateFormValue(fieldName, value) {
    setFormValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
    resetPreview();
  }

  /**
   * Validates the form and generates a payload for local rendering.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - Form submission event.
   * @returns {void}
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (!config.validate(formValues)) {
      toast.error(config.validationMessage, TOAST_OPTIONS);
      return;
    }

    generate(config.createPayload(formValues));
    toast.success(config.createSuccessMessage(formValues), TOAST_OPTIONS);
  }

  /**
   * Validates and embeds a selected logo, reporting any file issue inline.
   *
   * @param {File} logoFile - Selected browser image.
   * @returns {Promise<void>}
   */
  async function handleLogoChange(logoFile) {
    try {
      await setLogoFile(logoFile);
      toast.success("Logo added with high error correction.", TOAST_OPTIONS);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  }

  /**
   * Downloads the current QR and reports export failures without blocking UI.
   *
   * @param {string} fileType - Requested file format.
   * @returns {Promise<void>}
   */
  async function handleDownload(fileType) {
    try {
      const didDownload = await download(fileType, config.defaultFileName);

      if (didDownload) {
        toast.success(`${fileType.toUpperCase()} download started.`, TOAST_OPTIONS);
      }
    } catch {
      toast.error("The QR file could not be exported.", TOAST_OPTIONS);
    }
  }

  /**
   * Copies the current QR as an image or SVG source.
   *
   * @param {"image" | "svg"} copyType - Clipboard representation.
   * @returns {Promise<void>}
   */
  async function handleCopy(copyType) {
    try {
      await copyToClipboard(copyType);
      toast.success(
        copyType === "svg" ? "SVG source copied." : "PNG copied.",
        TOAST_OPTIONS,
      );
    } catch (error) {
      toast.error(error.message || "The QR could not be copied.", TOAST_OPTIONS);
    }
  }

  return (
    <>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)] xl:gap-8">
        <div className="order-2 space-y-6 lg:order-1">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white p-5 shadow-[0_18px_55px_rgba(30,41,59,0.08)] ring-1 ring-slate-200/80 sm:p-6"
          >
            <div className="mb-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-indigo-600 uppercase">
                Step 1
              </p>
              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950">
                Add your content
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your QR content is generated and checked entirely in this
                browser.
              </p>
            </div>

            <div className="space-y-4">
              <GeneratorFields
                generatorType={config.type}
                values={formValues}
                onChange={updateFormValue}
              />
            </div>

            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(79,70,229,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:translate-y-0 active:scale-[0.99]"
            >
              <span>{isGenerated ? "Update QR code" : "Generate QR code"}</span>
              <HiOutlineArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <HiOutlineLockClosed className="h-3.5 w-3.5" aria-hidden="true" />
              No QR content or logo is uploaded
            </p>
          </form>

          <QrCodeStyleControls
            design={design}
            logoName={logoName}
            onApplyPreset={applyPreset}
            onDesignChange={updateDesign}
            onLogoChange={handleLogoChange}
            onLogoRemove={removeLogo}
            onReset={resetDesign}
          />
        </div>

        <QrCodePreview
          design={design}
          hasContrastWarning={hasContrastWarning}
          isExporting={isExporting}
          isGenerated={isGenerated}
          minimumContrastRatio={minimumContrastRatio}
          onCopy={handleCopy}
          onDownload={handleDownload}
          previewRef={previewRef}
          scanResult={scanResult}
        />
      </div>
      <Toaster />
    </>
  );
}
