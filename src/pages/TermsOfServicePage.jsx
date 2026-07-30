import SiteFooter from "../components/layout/SiteFooter.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

/**
 * Explains the responsibilities attached to using generated QR codes.
 *
 * @returns {JSX.Element} The terms of service page.
 */
export default function TermsOfServicePage() {
  useDocumentTitle("Terms of Service | QR Code Llama");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-screen-xl px-4 py-12 md:px-8">
        <h1 className="mb-6 text-3xl font-bold text-black sm:text-4xl md:text-5xl">
          Terms of Service
        </h1>
        <p className="mb-4 text-sm text-gray-500">
          By using QR Code Llama, you agree that all content and generated QR
          codes are used at your own discretion.
        </p>
        <p className="mb-4 text-sm text-gray-500">
          QR Code Llama does not store generated QR code data. We may change or
          discontinue features at any time.
        </p>
        <p className="text-sm text-gray-500">
          You are responsible for any QR codes you generate and for how and where
          you use them.
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
