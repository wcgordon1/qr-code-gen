const TEAM_MEMBERS = [
  { name: "Will G.", role: "Custodial Arts", image: "/images/willy.webp" },
  {
    name: "Larry L.",
    role: "Head of Technical Marketing",
    image: "/images/llama.webp",
  },
  {
    name: "Arty I.",
    role: "Chief Technical Officer",
    image: "/images/arti.webp",
  },
];

/**
 * Introduces the people and llamas credited with building the project.
 *
 * @returns {JSX.Element} The team section.
 */
export default function TeamSection() {
  return (
    <section className="mb-12 bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Meet Team Llama
          </h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">
            The brightest emerging talent in the QR code space came together to
            create a generator that is free for everyone, free of ads, and free
            of emails.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {TEAM_MEMBERS.map((member) => (
            <article key={member.name}>
              <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
                <img
                  src={member.image}
                  alt={`Photo of ${member.name}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="font-bold text-indigo-600 md:text-lg">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500 md:text-base">
                {member.role}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
