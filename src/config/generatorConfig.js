import {
  createEmailPayload,
  createLinkPayload,
  createPhoneCallPayload,
  createTextMessagePayload,
  createWifiPayload,
} from "../utils/qrCodePayloads.js";

export const GENERATOR_TYPES = Object.freeze({
  LINK: "link",
  EMAIL: "email",
  TEXT_MESSAGE: "text-message",
  PHONE_CALL: "phone-call",
  WIFI: "wifi",
});

const GENERATOR_CONFIGS = Object.freeze({
  [GENERATOR_TYPES.LINK]: {
    type: GENERATOR_TYPES.LINK,
    path: "/qr-code-generator",
    heading: "QR Code Generator",
    description: "Create custom QR codes quickly and easily!",
    documentTitle: "QR Code Generator | QR Code Llama",
    initialValues: { url: "" },
    initialDotStyle: "square",
    validationMessage: "Must input a URL or text",
    validate(values) {
      return Boolean(values.url.trim());
    },
    createPayload: createLinkPayload,
    createSuccessMessage(values) {
      return `QR Code for "${values.url}" is ready to download`;
    },
    defaultFileName: "my-qr-code",
  },
  [GENERATOR_TYPES.EMAIL]: {
    type: GENERATOR_TYPES.EMAIL,
    path: "/email-qr-code-generator",
    heading: "Email QR Code Generator",
    description: "Generate QR codes for emails quickly and easily!",
    documentTitle: "Email QR Code Generator | QR Code Llama",
    initialValues: { email: "", subject: "", body: "" },
    initialDotStyle: "rounded",
    validationMessage: "Must input email address",
    validate(values) {
      return Boolean(values.email.trim());
    },
    createPayload: createEmailPayload,
    createSuccessMessage() {
      return "QR Code for email is ready to download";
    },
    defaultFileName: "my-email-qr-code",
  },
  [GENERATOR_TYPES.TEXT_MESSAGE]: {
    type: GENERATOR_TYPES.TEXT_MESSAGE,
    path: "/free-text-message-qr-code-generator",
    heading: "Text Message QR Code Generator",
    description: "Generate QR codes for text messages quickly and easily!",
    documentTitle: "Text Message QR Code Generator | QR Code Llama",
    initialValues: { countryCode: "+1", phoneNumber: "", message: "" },
    initialDotStyle: "rounded",
    validationMessage: "Must input telephone number",
    validate(values) {
      return Boolean(values.phoneNumber.trim());
    },
    createPayload: createTextMessagePayload,
    createSuccessMessage() {
      return "QR Code for text message is ready to download";
    },
    defaultFileName: "my-text-message-qr-code",
  },
  [GENERATOR_TYPES.PHONE_CALL]: {
    type: GENERATOR_TYPES.PHONE_CALL,
    path: "/phone-call-qr-generator",
    heading: "Phone Call QR Code Generator",
    description: "Generate QR codes for phone calls quickly and easily!",
    documentTitle: "Phone Call QR Code Generator | QR Code Llama",
    initialValues: { countryCode: "+1", phoneNumber: "" },
    initialDotStyle: "rounded",
    validationMessage: "Must input telephone number",
    validate(values) {
      return Boolean(values.phoneNumber.trim());
    },
    createPayload: createPhoneCallPayload,
    createSuccessMessage() {
      return "QR Code for phone call is ready to download";
    },
    defaultFileName: "my-phone-call-qr-code",
  },
  [GENERATOR_TYPES.WIFI]: {
    type: GENERATOR_TYPES.WIFI,
    path: "/wifi-qr-code-generator",
    heading: "WiFi QR Code Generator",
    description: "Generate a QR code to connect to WiFi!",
    documentTitle: "WiFi QR Code Generator | QR Code Llama",
    initialValues: {
      ssid: "",
      password: "",
      encryption: "WPA",
      hidden: false,
    },
    initialDotStyle: "rounded",
    validationMessage: "Must input network name (SSID)",
    validate(values) {
      return Boolean(values.ssid.trim());
    },
    createPayload: createWifiPayload,
    createSuccessMessage() {
      return "QR Code for WiFi is ready to download";
    },
    defaultFileName: "my-wifi-qr-code",
  },
});

export const GENERATOR_ROUTES = Object.values(GENERATOR_CONFIGS);

/**
 * Returns the complete configuration for one generator type.
 *
 * @param {string} generatorType - A value from `GENERATOR_TYPES`.
 * @returns {object} The matching generator configuration.
 */
export function getGeneratorConfig(generatorType) {
  const config = GENERATOR_CONFIGS[generatorType];

  if (!config) {
    throw new Error(`Unknown QR code generator type: ${generatorType}`);
  }

  return config;
}
