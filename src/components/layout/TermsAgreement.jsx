import { Link } from "react-router";

/**
 * Links generator users to the terms that apply to generated QR codes.
 *
 * @returns {JSX.Element} A compact terms notice.
 */
export default function TermsAgreement() {
  return (
    <p className="mt-6 text-xs text-slate-400">
      By using QR Code Llama you agree to our{" "}
      <Link
        to="/terms-of-service"
        className="font-medium text-indigo-600 hover:text-indigo-800"
      >
        Terms of Service
      </Link>
      .
    </p>
  );
}
