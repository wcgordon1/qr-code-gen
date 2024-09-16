import React from 'react';

const Faq = () => {
  const faqs = [
    {
      question: "How does the product work?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    },
    {
      question: "What are the features?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    },
    {
      question: "What about integrations?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    },
    {
      question: "Is support available?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    },
    {
      question: "How does one upgrade a plan?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    },
    {
      question: "Which payment methods are available?",
      answer: "This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text."
    }
  ];

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 mb-24">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Frequently asked questions</h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 sm:gap-y-10 xl:grid-cols-3">
          {faqs.map((faq, index) => (
            <div key={index} className="relative rounded-lg bg-gray-100 p-5 pt-8">
              <span className="absolute -top-4 left-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </span>
              <h3 className="mb-3 text-lg font-semibold text-indigo-500 md:text-xl">{faq.question}</h3>
              <p className="text-gray-500">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;