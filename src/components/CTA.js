import React from 'react';
import Link from 'next/link';

const CTA = () => {
  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-100 p-4 sm:flex-row md:p-8">
          <div>
            <h2 className="text-xl font-bold text-indigo-500 md:text-2xl">Start your free trial</h2>
            <p className="text-gray-600">No Credit Card required</p>
          </div>

          <Link href="/start-trial" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
            Start now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CTA;
