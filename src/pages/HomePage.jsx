import FaqSection from "../components/home/FaqSection.jsx";
import HeroSection from "../components/home/HeroSection.jsx";
import QrCodeTypesSection from "../components/home/QrCodeTypesSection.jsx";
import TeamSection from "../components/home/TeamSection.jsx";
import TestimonialsSection from "../components/home/TestimonialsSection.jsx";
import SiteFooter from "../components/layout/SiteFooter.jsx";
import SiteHeader from "../components/layout/SiteHeader.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";

/**
 * Composes the marketing sections shown on the public home page.
 *
 * @returns {JSX.Element} The QR Code Llama home page.
 */
export default function HomePage() {
  useDocumentTitle("QR Code Llama - Free QR Code Generator");

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TestimonialsSection />
        <QrCodeTypesSection />
        <TeamSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
