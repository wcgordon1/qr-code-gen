import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "This is a section of some simple filler text, also known as placeholder text.",
      name: "Dr. Milly Barker",
      role: "CEO / Datadrift",
      image: "/images/milly.jpg"
    },
    {
      quote: "This is a section of some simple filler text, also known as placeholder text.",
      name: "Kate Berg",
      role: "CFO / Dashdash",
      image: "/images/milly.jpg"
    },
    {
      quote: "This is a section of some simple filler text, also known as placeholder text.",
      name: "Greg Jackson",
      role: "CTO / Uptime",
      image: "/images/milly.jpg"
    }
  ];

  return (
    <div className="bg-white py-20 sm:py-24 lg:py-24">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">
          What others say about us
        </h2>

        <div className="grid gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:divide-x">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col items-center gap-4 sm:px-4 md:gap-6 lg:px-8">
              <div className="text-center text-gray-600">{testimonial.quote}</div>
              <div className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14">
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.name}`}
                    width={122}
                    height={122}
                    className="object-cover object-center"
                  />
                </div>
                <div>
                  <div className="text-center text-sm font-bold text-indigo-600 sm:text-left md:text-base">
                    {testimonial.name}
                  </div>
                  <p className="text-center text-sm text-gray-500 sm:text-left md:text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
