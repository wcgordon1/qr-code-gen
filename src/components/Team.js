import React from 'react';
import Image from 'next/image';

const Team = () => {
  const teamMembers = [
    { name: "Will G.", role: "Janitor & Customer Support", image: "/images/me44.png" },
    { name: "Larry L.", role: "Head of Technical Marketing", image: "/images/llama.webp" },
    { name: "Arty I.", role: "Chief Technical Officer", image: "/images/artyi.jpg" },
  ];

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 mb-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">Meet our Team</h2>
          <p className="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random or otherwise generated.</p>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          {teamMembers.map((member, index) => (
            <div key={index}>
              <div className="mb-2 h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg sm:mb-4 sm:h-60 md:h-80">
                <Image src={member.image} alt={`Photo of ${member.name}`} width={500} height={500} className="h-full w-full object-cover object-center" />
              </div>

              <div>
                <div className="font-bold text-indigo-500 md:text-lg">{member.name}</div>
                <p className="mb-3 text-sm text-gray-500 md:mb-4 md:text-base">{member.role}</p>

                
                {/* end card */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;