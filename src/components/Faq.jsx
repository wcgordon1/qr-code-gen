import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: "What types of QR codes can I generate?",
      answer: "You can create QR codes for URLs, email addresses, text messages, phone calls, and WiFi networks. Each type is designed for specific use cases.",
      icon: <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
    },
    {
      question: "Can I customize the QR code?",
      answer: "Yes, you can customize the QR code type (square, rounded, dots), colors for dots and background, and download in various formats (PNG, JPEG, WebP, SVG).",
      icon: <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
    },
    {
      question: "Is there a limit to QR code generation?",
      answer: "There's no limit to the number of QR codes you can generate. The service is free and doesn't require registration or sign-up.",
      icon: <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
    },
    {
      question: "Are the generated QR codes permanent?",
      answer: "The QR codes are generated client-side and not stored on our servers. We recommend downloading and saving your QR codes for future use.",
      icon: <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    },
    {
      question: "How secure are the generated QR codes?",
      answer: "The QR codes are as secure as the data they contain. We don't store any information, but be cautious about sharing QR codes with sensitive data.",
      icon: <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    },
    {
      question: "Can I use the QR codes for commercial purposes?",
      answer: "Yes, you can use the generated QR codes for any purpose, including commercial use. There are no restrictions on usage. Just triple check it works!",
      icon: <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    }
  ];

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 mb-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h3 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Frequently asked questions</h3>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">Here are some common questions about our QR code generator. If you need more information, please contact us.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
          {faqs.map((faq, index) => (
            <div key={index} className="relative rounded-lg bg-gray-100 p-5 pt-8">
              <span className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {faq.icon}
                </svg>
              </span>
              <h3 className="mb-3 text-lg font-semibold text-indigo-600 md:text-xl">{faq.question}</h3>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;