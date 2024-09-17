import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function QRCodeGenerator() {
  return (
    <>
      <Header />
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* content - start */}
            <div className="flex flex-col justify-center md:w-1/2">
              <h1 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">
                Generate Your QR Code
              </h1>
              <p className="mb-6 text-gray-500 md:mb-8 xl:text-lg">
                Create custom QR codes quickly and easily with our intuitive tool. Perfect for businesses and individuals alike. No sign-up required!
              </p>
              <form className="mb-4 flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Enter URL or text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                />
                <button
                  type="submit"
                  className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
                >
                  Generate QR Code
                </button>
              </form>
              <p className="text-sm text-gray-400">
                By using our service you agree to our{' '}
                <Link href="/terms" className="text-indigo-600 hover:text-indigo-700">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-indigo-600 hover:text-indigo-700">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            {/* content - end */}

            {/* QR code image - start */}
            <div className="md:w-1/2">
              <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
                <Image
                  src="/images/sample-qr-code.png"  // Replace with your sample QR code image
                  alt="Sample QR Code"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>
            {/* QR code image - end */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}