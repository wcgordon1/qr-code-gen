import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '../../components/Header';
import Features from '../../components/Features';
import Footer from '../../components/Footer';

const DynamicTextMessageQRGenerator = dynamic(() => import('../../components/TextMessageQRGenerator'), {
  ssr: false,
});

export default function TextMessageQRGeneratorPage() {
  return (
    <>
      <Header />
      <div className="bg-white py-12 sm:py-8 lg:py-10">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h1 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">
            Text Message QR Code Generator
          </h1>
          <h2 className="mb-6 text-gray-500 md:mb-8 xl:text-lg">
            Generate QR codes for text messages quickly and easily!
          </h2>
          <DynamicTextMessageQRGenerator />
          <p className="mt-4 text-sm text-gray-400">
            By using QR Code Llama you agree to our{' '}
            <Link href="/terms-of-service" className="text-indigo-600 hover:text-indigo-700">
              Terms of Service
            </Link>{' '}
          </p>
        </div>
      </div>
      <Features />
      <Footer />
    </>
  );
}