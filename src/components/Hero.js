import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
          {/* content - start */}
          <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
            <p className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl">Very proud to introduce</p>
            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Revolutionary way to build the web</h1>
            <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">This is a section of some simple filler text, also known as placeholder text. It shares some characteristics of a real written text but is random.</p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                Start now
              </Link>
              <Link href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                Take tour
              </Link>
            </div>
          </div>
          {/* content - end */}

          {/* image - start */}
          <div className="h-48 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:w-300">
            <Image
              src="/images/pinger.png"
              alt="QR Code Llama"
              width={1000}
              height={1000}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* image - end */}
        </section>
      </div>
    </div>
  );
};

export default Hero;