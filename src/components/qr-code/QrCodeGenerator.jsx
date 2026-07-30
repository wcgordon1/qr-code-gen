import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

import { useQrCode } from "../../hooks/useQrCode.js";
import GeneratorFields from "./GeneratorFields.jsx";
import QrCodePreview from "./QrCodePreview.jsx";
import QrCodeStyleControls from "./QrCodeStyleControls.jsx";

const ERROR_TOAST_OPTIONS = {
  duration: 3000,
  position: "top-right",
  style: {
    background: "#ef4444",
    color: "#fff",
  },
};

const SUCCESS_TOAST_OPTIONS = {
  duration: 3000,
  position: "top-right",
  style: {
    background: "#4ade80",
    color: "#fff",
  },
  iconTheme: {
    primary: "#fff",
    secondary: "#4ade80",
  },
};

/**
 * Coordinates form state with the shared QR rendering and styling interface.
 *
 * @param {{ config: object }} props - The active generator configuration.
 * @returns {JSX.Element} A complete QR code generator.
 */
export default function QrCodeGenerator({ config }) {
  const [formValues, setFormValues] = useState(() => ({
    ...config.initialValues,
  }));
  const {
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
  } = useQrCode(config.initialDotStyle);

  /**
   * Stores one form value and invalidates the previous QR preview.
   *
   * @param {string} fieldName - The form field to update.
   * @param {string | boolean} value - The field's next value.
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
   * Validates the form and generates a QR payload for the current values.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   * @returns {void}
   */
  function handleSubmit(event) {
    event.preventDefault();

    if (!config.validate(formValues)) {
      toast.error(config.validationMessage, ERROR_TOAST_OPTIONS);
      return;
    }

    generate(config.createPayload(formValues));
    toast.success(
      config.createSuccessMessage(formValues),
      SUCCESS_TOAST_OPTIONS,
    );
  }

  /**
   * Downloads the current QR code using the selected file extension.
   *
   * @param {string} fileType - The requested download format.
   * @returns {Promise<void>}
   */
  async function handleDownload(fileType) {
    await download(fileType, config.defaultFileName);
  }

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="order-2 flex flex-col justify-center md:order-1 md:w-1/2">
          <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-4">
            <GeneratorFields
              generatorType={config.type}
              values={formValues}
              onChange={updateFormValue}
            />
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
            >
              Generate QR Code
            </button>
            <QrCodeStyleControls
              backgroundColor={backgroundColor}
              dotColor={dotColor}
              dotStyle={dotStyle}
              onBackgroundColorChange={setBackgroundColor}
              onDotColorChange={setDotColor}
              onDotStyleChange={setDotStyle}
            />
          </form>
        </div>

        <QrCodePreview
          hasContrastWarning={hasContrastWarning}
          isGenerated={isGenerated}
          onDownload={handleDownload}
          previewRef={previewRef}
        />
      </div>
      <Toaster />
    </>
  );
}
