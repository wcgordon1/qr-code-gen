/**
 * Removes common visual separators from a phone number.
 *
 * @param {string} phoneNumber - A user-entered phone number.
 * @returns {string} The compact phone number used in a QR payload.
 */
function cleanPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/[-()\s]/g, "");
}

/**
 * Escapes characters that delimit fields in the standard Wi-Fi QR format.
 *
 * @param {string} value - A Wi-Fi network name or password.
 * @returns {string} The escaped Wi-Fi field value.
 */
function escapeWifiValue(value) {
  return value.replace(/([\\;,":])/g, "\\$1");
}

/**
 * Returns the URL or plain text entered by the user.
 *
 * @param {{ url: string }} values - Link generator form values.
 * @returns {string} The QR code payload.
 */
export function createLinkPayload(values) {
  return values.url;
}

/**
 * Builds a mailto URI with an optional subject and message.
 *
 * @param {{ email: string, subject: string, body: string }} values - Email form values.
 * @returns {string} The QR code payload.
 */
export function createEmailPayload(values) {
  const subject = encodeURIComponent(values.subject);
  const body = encodeURIComponent(values.body);

  return `mailto:${values.email}?subject=${subject}&body=${body}`;
}

/**
 * Builds an SMS URI using a country code, phone number, and message.
 *
 * @param {{ countryCode: string, phoneNumber: string, message: string }} values - SMS form values.
 * @returns {string} The QR code payload.
 */
export function createTextMessagePayload(values) {
  const phoneNumber = cleanPhoneNumber(values.phoneNumber);
  const message = encodeURIComponent(values.message);

  return `sms:${values.countryCode}${phoneNumber}?body=${message}`;
}

/**
 * Builds a telephone URI that prompts compatible scanners to start a call.
 *
 * @param {{ countryCode: string, phoneNumber: string }} values - Phone form values.
 * @returns {string} The QR code payload.
 */
export function createPhoneCallPayload(values) {
  const countryCode = values.countryCode.replace(/[+\s]/g, "");
  const phoneNumber = cleanPhoneNumber(values.phoneNumber);

  return `tel:+${countryCode}${phoneNumber}`;
}

/**
 * Builds a Wi-Fi configuration payload from the network form values.
 *
 * @param {{ ssid: string, password: string, encryption: string, hidden: boolean }} values - Wi-Fi form values.
 * @returns {string} The QR code payload.
 */
export function createWifiPayload(values) {
  const ssid = escapeWifiValue(values.ssid);
  const password = escapeWifiValue(values.password);
  const hidden = values.hidden ? "true" : "false";

  return `WIFI:S:${ssid};T:${values.encryption};P:${password};H:${hidden};;`;
}
