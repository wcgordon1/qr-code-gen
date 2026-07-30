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
        <section className="relative overflow-hidden bg-slate-50 pb-16 pt-10 sm:pt-12 lg:pb-24 lg:pt-16">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_75%_0%,rgba(99,102,241,0.12),transparent_52%)]"
            aria-hidden="true"
          />
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.16em] text-indigo-600 uppercase">
                Private · browser-based · free
              </p>
              <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-[-0.035em] text-slate-950 text-balance sm:text-4xl md:text-5xl">
                {config.heading}
              </h1>
              <p className="mb-8 mt-4 max-w-2xl text-base leading-7 text-slate-600 text-pretty md:mb-10 md:text-lg">
                {config.description} Customize the details, verify it locally,
                then export a production-ready file.
              </p>
              <QrCodeGenerator key={config.type} config={config} />
              <TermsAgreement />
            </div>
          </div>
        </section>
        <QrCodeTypesSection />
      </main>
      <SiteFooter />
    </>
  );
}
