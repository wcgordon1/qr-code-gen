import { useState } from "react";

import { GENERATOR_TYPES } from "../../config/generatorConfig.js";

const INPUT_CLASS_NAME =
  "min-h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100";

/**
 * Renders the input fields required by the active generator type.
 *
 * @param {object} props - Component properties.
 * @param {string} props.generatorType - The active generator type.
 * @param {object} props.values - Current form values.
 * @param {(fieldName: string, value: string | boolean) => void} props.onChange - Updates a form value.
 * @returns {JSX.Element} The matching generator fields.
 */
export default function GeneratorFields({
  generatorType,
  values,
  onChange,
}) {
  switch (generatorType) {
    case GENERATOR_TYPES.LINK:
      return <LinkFields values={values} onChange={onChange} />;
    case GENERATOR_TYPES.EMAIL:
      return <EmailFields values={values} onChange={onChange} />;
    case GENERATOR_TYPES.TEXT_MESSAGE:
      return <TextMessageFields values={values} onChange={onChange} />;
    case GENERATOR_TYPES.PHONE_CALL:
      return <PhoneCallFields values={values} onChange={onChange} />;
    case GENERATOR_TYPES.WIFI:
      return <WifiFields values={values} onChange={onChange} />;
    default:
      return null;
  }
}

/**
 * Renders the URL or text field for a standard QR code.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The link generator fields.
 */
function LinkFields({ values, onChange }) {
  return (
    <FormField label="URL or text" inputId="url">
      <input
        id="url"
        type="text"
        value={values.url}
        onChange={(event) => onChange("url", event.target.value)}
        placeholder="Enter URL or text"
        className={INPUT_CLASS_NAME}
      />
    </FormField>
  );
}

/**
 * Renders recipient, subject, and message fields for an email QR code.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The email generator fields.
 */
function EmailFields({ values, onChange }) {
  return (
    <>
      <FormField label="Email address" inputId="email">
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
          placeholder="Email Address"
          autoComplete="email"
          className={INPUT_CLASS_NAME}
        />
      </FormField>
      <FormField label="Email subject" inputId="subject">
        <input
          id="subject"
          type="text"
          value={values.subject}
          onChange={(event) => onChange("subject", event.target.value)}
          placeholder="Email Subject"
          className={INPUT_CLASS_NAME}
        />
      </FormField>
      <FormField label="Email body" inputId="email-body">
        <textarea
          id="email-body"
          value={values.body}
          onChange={(event) => onChange("body", event.target.value)}
          placeholder="Email Body"
          className={INPUT_CLASS_NAME}
          rows={4}
        />
      </FormField>
    </>
  );
}

/**
 * Renders country code, phone number, and message fields for an SMS QR code.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The text-message generator fields.
 */
function TextMessageFields({ values, onChange }) {
  return (
    <>
      <PhoneNumberFields values={values} onChange={onChange} />
      <FormField label="Text message" inputId="message">
        <textarea
          id="message"
          value={values.message}
          onChange={(event) => onChange("message", event.target.value)}
          placeholder="Enter your message. Not compatible with all carriers 100% of the time."
          className={INPUT_CLASS_NAME}
          rows={4}
        />
      </FormField>
    </>
  );
}

/**
 * Renders country code and phone number fields for a call QR code.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The phone-call generator fields.
 */
function PhoneCallFields({ values, onChange }) {
  return <PhoneNumberFields values={values} onChange={onChange} />;
}

/**
 * Renders the shared country code and telephone number controls.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} A grouped phone-number field.
 */
function PhoneNumberFields({ values, onChange }) {
  return (
    <div className="flex gap-2">
      <FormField
        label="Country code"
        inputId="country-code"
        className="w-[7.5rem] shrink-0"
      >
        <input
          id="country-code"
          type="text"
          value={values.countryCode}
          onChange={(event) => onChange("countryCode", event.target.value)}
          placeholder="Country Code"
          autoComplete="tel-country-code"
          className={INPUT_CLASS_NAME}
        />
      </FormField>
      <FormField
        label="Phone number"
        inputId="phone-number"
        className="min-w-0 flex-1"
      >
        <input
          id="phone-number"
          type="tel"
          value={values.phoneNumber}
          onChange={(event) => onChange("phoneNumber", event.target.value)}
          placeholder="Phone Number"
          autoComplete="tel-national"
          className={INPUT_CLASS_NAME}
        />
      </FormField>
    </div>
  );
}

/**
 * Renders network credentials and visibility controls for a Wi-Fi QR code.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} The Wi-Fi generator fields.
 */
function WifiFields({ values, onChange }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <>
      <FormField label="Network name" inputId="ssid">
        <input
          id="ssid"
          type="text"
          value={values.ssid}
          onChange={(event) => onChange("ssid", event.target.value)}
          placeholder="SSID"
          autoComplete="off"
          className={INPUT_CLASS_NAME}
        />
      </FormField>
      <FormField label="Password" inputId="password">
        <div className="relative">
          <input
            id="password"
            type={isPasswordVisible ? "text" : "password"}
            value={values.password}
            onChange={(event) => onChange("password", event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className={`${INPUT_CLASS_NAME} pr-20`}
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            className="absolute inset-y-0 right-0 px-3 text-sm font-semibold text-gray-500 hover:text-gray-700"
            aria-label={
              isPasswordVisible ? "Hide WiFi password" : "Show WiFi password"
            }
          >
            {isPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
      </FormField>
      <FormField label="Encryption" inputId="encryption">
        <select
          id="encryption"
          value={values.encryption}
          onChange={(event) => onChange("encryption", event.target.value)}
          className={INPUT_CLASS_NAME}
        >
          <option value="WPA">WPA/WPA2</option>
          <option value="WEP">WEP</option>
          <option value="nopass">No Password</option>
        </select>
      </FormField>
      <label
        htmlFor="hidden-network"
        className="flex items-center rounded-xl bg-slate-50 p-3 text-sm font-medium text-slate-700"
      >
        <input
          id="hidden-network"
          type="checkbox"
          checked={values.hidden}
          onChange={(event) => onChange("hidden", event.target.checked)}
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
        />
        <span className="ml-2">Hidden network</span>
      </label>
    </>
  );
}

/**
 * Gives each generator control a consistent, accessible label.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} A labeled form control.
 */
function FormField({
  children,
  className = "w-full",
  inputId,
  label,
}) {
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="mb-1.5 block text-xs font-semibold text-slate-700"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
