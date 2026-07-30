import { Link } from "react-router";

const QR_CODE_TYPES = [
  {
    icon: "link",
    title: "Link or Text QR Code",
    description:
      "Encode a complete URL or plain text. Include https:// when the result should open as a link.",
    path: "/qr-code-generator",
  },
  {
    icon: "email",
    title: "Email QR Code",
    description:
      "Create QR codes that open a new email with pre-filled recipient, subject, and body. Great for easy contact or feedback collection.",
    path: "/email-qr-code-generator",
  },
  {
    icon: "message",
    title: "Text Message QR Code",
    description:
      "Generate QR codes that open a new text message with a pre-filled number and message. Ideal for easy SMS communication.",
    path: "/free-text-message-qr-code-generator",
  },
  {
    icon: "phone",
    title: "Phone Call QR Code",
    description:
      "Create QR codes that initiate phone calls when scanned. Perfect for customer support or quick contact information.",
    path: "/phone-call-qr-generator",
  },
  {
    icon: "wifi",
    title: "WiFi QR Code",
    description:
      "Generate QR codes that allow easy connection to WiFi networks. Simplify guest access to your network.",
    path: "/wifi-qr-code-generator",
  },
  {
    icon: "bitcoin",
    title: "Bitcoin Payment QR Code",
    description:
      "Create QR codes for Bitcoin payments. Streamline cryptocurrency transactions for your business or personal use.",
    path: null,
  },
];

/**
 * Lists every available QR generator and labels planned generator types.
 *
 * @returns {JSX.Element} The QR code types section.
 */
export default function QrCodeTypesSection() {
  return (
    <section
      id="features"
      className="my-20 scroll-mt-8 bg-white py-6 sm:py-8 lg:py-12"
    >
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            QR Code Types We Offer
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Explore our range of QR code generators, each designed for a
            specific purpose.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:gap-12 xl:grid-cols-3 xl:gap-16">
          {QR_CODE_TYPES.map((qrCodeType) => (
            <QrCodeTypeCard key={qrCodeType.title} qrCodeType={qrCodeType} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Summarizes one QR generator and links to it when available.
 *
 * @param {{ qrCodeType: object }} props - Component properties.
 * @returns {JSX.Element} A QR generator summary card.
 */
function QrCodeTypeCard({ qrCodeType }) {
  return (
    <article className="flex gap-4 md:gap-6">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-lg md:h-14 md:w-14 md:rounded-xl">
        <QrCodeTypeIcon type={qrCodeType.icon} />
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold md:text-xl">
          {qrCodeType.title}
        </h3>
        <p className="mb-2 text-gray-500">{qrCodeType.description}</p>
        {qrCodeType.path ? (
          <Link
            to={qrCodeType.path}
            className="font-bold text-indigo-600 transition duration-100 hover:text-indigo-700"
          >
            Try it now
          </Link>
        ) : (
          <span className="cursor-not-allowed font-bold text-gray-400">
            Coming Soon
          </span>
        )}
      </div>
    </article>
  );
}

/**
 * Draws the icon associated with a QR generator category.
 *
 * @param {{ type: string }} props - Component properties.
 * @returns {JSX.Element} The category icon.
 */
function QrCodeTypeIcon({ type }) {
  const commonProps = {
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "aria-hidden": true,
  };

  if (type === "email") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    );
  }

  if (type === "message") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
        />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    );
  }

  if (type === "wifi") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
        />
      </svg>
    );
  }

  if (type === "bitcoin") {
    return (
      <svg {...commonProps}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}
