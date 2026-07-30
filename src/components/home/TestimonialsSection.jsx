const TESTIMONIALS = [
  {
    quote:
      "No Ads and No Email. Just a free QR Code Generator. What more could you want?",
    name: "Danny Devito",
    role: "Hollywood Movie Star",
    image: "/images/danny.jpg",
  },
  {
    quote:
      "I use QR Code Llama to generate QR Codes for all my businesses. Plus I ate with Will at Wingstop and he is a cool guy.",
    name: "Metta Sandiford-Artest",
    role: "Small Forward / LA Lakers",
    image: "/images/ron.jpg",
  },
  {
    quote:
      "I thought SpaceX was a cool company, but we don't make QR Codes. My mind was seriously blown after using QR Code Llama. Next level stuff!",
    name: "Elon Musk",
    role: "Tesla, SpaceX, Neuralink, X, etc.",
    image: "/images/elon1.jpg",
  },
];

/**
 * Displays the site's testimonial content in a responsive card grid.
 *
 * @returns {JSX.Element} The testimonial section.
 */
export default function TestimonialsSection() {
  return (
    <section className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:mb-12 lg:text-3xl">
          People are talking about the Llama
        </h2>

        <div className="grid gap-y-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3 lg:divide-x">
          {TESTIMONIALS.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col items-center gap-4 sm:px-4 md:gap-6 lg:px-8"
            >
              <blockquote className="text-center text-gray-600">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="flex flex-col items-center gap-2 sm:flex-row md:gap-3">
                <div className="h-12 w-12 overflow-hidden rounded-full bg-gray-100 shadow-lg md:h-14 md:w-14">
                  <img
                    src={testimonial.image}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div>
                  <div className="text-center text-sm font-bold text-indigo-600 sm:text-left md:text-base">
                    {testimonial.name}
                  </div>
                  <p className="text-center text-sm text-gray-500 sm:text-left">
                    {testimonial.role}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
