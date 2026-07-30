import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const GENERATOR_LINKS = [
  { label: "Link QR Code", path: "/qr-code-generator" },
  { label: "Email QR Code", path: "/email-qr-code-generator" },
  {
    label: "SMS QR Code",
    path: "/free-text-message-qr-code-generator",
  },
  { label: "Call QR Code", path: "/phone-call-qr-generator" },
  { label: "WiFi QR Code", path: "/wifi-qr-code-generator" },
];

const SOCIAL_LINKS = [
  {
    label: "QR Code Llama on X",
    url: "https://x.com/helloIamWilly",
    icon: FaXTwitter,
    hoverClassName: "hover:text-black",
  },
  {
    label: "Will Gordon on LinkedIn",
    url: "https://www.linkedin.com/in/will-gordon1/",
    icon: FaLinkedin,
    hoverClassName: "hover:text-blue-600",
  },
  {
    label: "QR Code Llama on GitHub",
    url: "https://github.com/wcgordon1/qr-code-gen",
    icon: FaGithub,
    hoverClassName: "hover:text-gray-800",
  },
];

/**
 * Displays generator navigation, project links, and copyright information.
 *
 * @returns {JSX.Element} The global site footer.
 */
export default function SiteFooter() {
  return (
    <footer className="bg-white pt-20">
      <div className="pt-12 lg:pt-16">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 grid gap-12 md:grid-cols-3 lg:gap-8">
            <div>
              <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl"
                aria-label="QR Code Llama home"
              >
                <img
                  src="/images/llamal.png"
                  alt=""
                  className="h-8 w-8 object-contain"
                />
                QR Code Llama
              </Link>
              <p className="mb-6 text-gray-500">
                Generate and customize QR codes quickly and easily. The complete
                source is available on GitHub.
              </p>
              <SocialLinks />
            </div>

            <FooterNavigation
              heading="Generators"
              links={GENERATOR_LINKS}
            />

            <div>
              <h2 className="mb-4 font-bold uppercase tracking-widest text-gray-800">
                Project
              </h2>
              <nav className="flex flex-col gap-4" aria-label="Project links">
                <Link
                  to="/terms-of-service"
                  className="text-gray-500 transition duration-100 hover:text-indigo-600"
                >
                  Terms of Service
                </Link>
                <a
                  href="https://github.com/wcgordon1/qr-code-gen"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-500 transition duration-100 hover:text-indigo-600"
                >
                  Source code
                </a>
              </nav>
            </div>
          </div>

          <div className="border-t py-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} QR Code Llama. Source code licensed
            under MIT.
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Renders the project's external social profiles.
 *
 * @returns {JSX.Element} A list of icon links.
 */
function SocialLinks() {
  return (
    <div className="flex gap-4">
      {SOCIAL_LINKS.map((socialLink) => {
        const Icon = socialLink.icon;

        return (
          <a
            key={socialLink.url}
            href={socialLink.url}
            target="_blank"
            rel="noreferrer"
            className={`text-xl text-gray-600 ${socialLink.hoverClassName}`}
            aria-label={socialLink.label}
          >
            <Icon aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
}

/**
 * Renders a titled list of internal footer links.
 *
 * @param {object} props - Component properties.
 * @returns {JSX.Element} A footer navigation group.
 */
function FooterNavigation({ heading, links }) {
  return (
    <div>
      <h2 className="mb-4 font-bold uppercase tracking-widest text-gray-800">
        {heading}
      </h2>
      <nav className="flex flex-col gap-4" aria-label={heading}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-gray-500 transition duration-100 hover:text-indigo-600"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
