import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="bg-white pb-6 sm:pb-8 mb-12 lg:pb-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <section className="flex flex-col justify-between gap-6 sm:gap-10 md:gap-16 lg:flex-row">
          {/* content - start */}
          <div className="flex flex-col justify-center sm:text-center lg:py-12 lg:text-left xl:w-5/12 xl:py-24">
            <p className="mb-4 font-semibold text-indigo-600 md:mb-6 md:text-lg xl:text-xl">100% FREE FOREVER!</p>
            <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">Free QR Code Generator</h1>
            <p className="mb-8 leading-relaxed text-gray-500 md:mb-12 lg:w-4/5 xl:text-lg">QR Code Llama is a free QR code generator that allows you to create QR codes for your website, maketing materials, and more. Always free. No Limits. No Ads. No Emails.</p>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/qr-code-generator" className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base">
                Create a QR Code
              </Link>
              <Link href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
                QR Types
              </Link>
            </div>
          </div>
          {/* content - end */}

          {/* image - start */}
          <div className="lg:h-auto lg:w-5/12 flex justify-center items-center">
            <div className="w-full max-w-[500px] lg:max-w-none">
              <Image
                src="/images/qrhero.png"
                alt="Photo by Fakurian Design"
                width={500}
                height={500}
                className="h-auto w-full rounded-2xl object-cover object-center"
              />
            </div>
          </div>
          {/* image - end */}
        </section>
      </div>
    </div>
  );
};

export default Hero;