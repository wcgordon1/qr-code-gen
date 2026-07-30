import { Link } from "react-router";

import FeaturesLink from "../navigation/FeaturesLink.jsx";

/**
 * Displays the site identity and primary navigation on every page.
 *
 * @returns {JSX.Element} The global site header.
 */
export default function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center" aria-label="QR Code Llama">
            <img
              src="/images/llamal.png"
              alt=""
              className="h-8 w-8 object-contain"
            />
            <span className="ml-2 text-xl font-bold">QR Code Llama</span>
          </Link>
          <nav aria-label="Primary navigation">
            <FeaturesLink>Create QR</FeaturesLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
