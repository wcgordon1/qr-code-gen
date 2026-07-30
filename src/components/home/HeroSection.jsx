import { Link } from "react-router";

import FeaturesLink from "../navigation/FeaturesLink.jsx";

/**
 * Introduces the product and directs visitors to its generator tools.
 *
 * @returns {JSX.Element} The home page hero section.
 */
export default function HeroSection() {
  return (
    <section className="mb-12 bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
          <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
            <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">
              100% FREE FOREVER!
            </p>
            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
              Free QR Code Generator
            </h1>
            <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">
              QR Code Llama creates QR codes for websites, marketing materials,
              contact details, and more. Always free. No limits. No ads. No
              emails.
            </p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/qr-code-generator"
                className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
              >
                Create a QR Code
              </Link>
              <FeaturesLink variant="button">QR Types</FeaturesLink>
            </div>
          </div>

          <div className="flex items-center justify-center lg:h-auto lg:w-5/12">
            <div className="w-full max-w-[500px] lg:max-w-none">
              <img
                src="/images/qrhero.png"
                alt="Colorful QR code illustration"
                className="h-auto w-full rounded-2xl object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
