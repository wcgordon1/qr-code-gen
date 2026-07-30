import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const LINK_STYLES = {
  button:
    "inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base",
  navigation: "font-semibold text-gray-600 hover:text-black",
};

/**
 * Navigates to the home page and smoothly scrolls to its QR generator list.
 *
 * @param {object} props - Component properties.
 * @param {React.ReactNode} props.children - Link text.
 * @param {"button" | "navigation"} [props.variant] - The visual link style.
 * @returns {JSX.Element} A features-section link.
 */
export default function FeaturesLink({ children, variant = "navigation" }) {
  const location = useLocation();
  const navigate = useNavigate();

  /**
   * Scrolls to the QR code types section when it is present in the DOM.
   *
   * @returns {void}
   */
  function scrollToFeatures() {
    document
      .getElementById("features")
      ?.scrollIntoView({ behavior: "smooth" });
  }

  /**
   * Handles same-page scrolling or routes home before scrolling.
   *
   * @param {React.MouseEvent<HTMLAnchorElement>} event - The link click event.
   * @returns {void}
   */
  function handleClick(event) {
    event.preventDefault();

    if (location.pathname === "/") {
      scrollToFeatures();
      return;
    }

    navigate({ pathname: "/", hash: "#features" });
  }

  useEffect(() => {
    if (location.pathname !== "/" || location.hash !== "#features") {
      return undefined;
    }

    const timerId = window.setTimeout(scrollToFeatures, 100);
    return () => window.clearTimeout(timerId);
  }, [location.hash, location.pathname]);

  return (
    <a
      href="/#features"
      onClick={handleClick}
      className={LINK_STYLES[variant]}
    >
      {children}
    </a>
  );
}
