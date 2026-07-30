const FAQ_ITEMS = [
  {
    question: "What types of QR codes can I generate?",
    answer:
      "You can create QR codes for URLs, email addresses, text messages, phone calls, and WiFi networks. Each type is designed for specific use cases.",
  },
  {
    question: "Can I customize the QR code?",
    answer:
      "Yes, you can customize the QR code type (square, rounded, dots), colors for dots and background, and download in various formats (PNG, JPEG, WebP, SVG).",
  },
  {
    question: "Is there a limit to QR code generation?",
    answer:
      "There's no limit to the number of QR codes you can generate. The service is free and doesn't require registration or sign-up.",
  },
  {
    question: "Are the generated QR codes permanent?",
    answer:
      "The QR codes are generated client-side and not stored on our servers. We recommend downloading and saving your QR codes for future use.",
  },
  {
    question: "How secure are the generated QR codes?",
    answer:
      "The QR codes are as secure as the data they contain. We don't store any information, but be cautious about sharing QR codes with sensitive data.",
  },
  {
    question: "Can I use the QR codes for commercial purposes?",
    answer:
      "Yes, you can use the generated QR codes for any purpose, including commercial use. There are no restrictions on usage. Just triple check it works!",
  },
];

/**
 * Answers common questions about QR generation, privacy, and usage.
 *
 * @returns {JSX.Element} The frequently asked questions section.
 */
export default function FaqSection() {
  return (
    <section className="mb-24 bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Frequently asked questions
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            Here are common questions about the QR code generator.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
          {FAQ_ITEMS.map((faqItem) => (
            <article
              key={faqItem.question}
              className="relative rounded-lg bg-gray-100 p-5 pt-8"
            >
              <span className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                <QuestionIcon />
              </span>
              <h3 className="mb-3 text-lg font-semibold text-indigo-600 md:text-xl">
                {faqItem.question}
              </h3>
              <p className="text-gray-500">{faqItem.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Draws the repeated question-mark badge used by FAQ cards.
 *
 * @returns {JSX.Element} The FAQ badge icon.
 */
function QuestionIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}
