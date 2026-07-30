import QrCodeTypesSection from "../components/home/QrCodeTypesSection.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import TermsAgreement from "../components/layout/TermsAgreement.jsx";
import QrCodeGenerator from "../components/qr-code/QrCodeGenerator.jsx";
import { getGeneratorConfig } from "../config/generatorConfig.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

/**
 * Wraps any configured QR generator in the shared page layout.
 *
 * @param {{ generatorType: string }} props - Component properties.
 * @returns {JSX.Element} A complete generator page.
 */
export default function GeneratorPage({ generatorType }) {
  const config = getGeneratorConfig(generatorType);
  useDocumentTitle(config.documentTitle);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-white py-12 sm:py-8 lg:py-10">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h1 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">
              {config.heading}
            </h1>
            <p className="mb-6 text-gray-500 md:mb-8 xl:text-lg">
              {config.description}
            </p>
            <QrCodeGenerator key={config.type} config={config} />
            <TermsAgreement />
          </div>
        </section>
        <QrCodeTypesSection />
      </main>
      <SiteFooter />
    </>
  );
}
