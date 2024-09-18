import dynamic from 'next/dynamic';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const DynamicQRCodeGenerator = dynamic(() => import('../../components/QRCodeGenerator'), {
  ssr: false,
});

export default function QRCodeGeneratorPage() {
  return (
    <>
      <Header />
      <div className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <h1 className="mb-4 text-3xl font-bold text-black sm:text-4xl md:mb-8 md:text-5xl">
            QR Code Generator
          </h1>
          <p className="mb-6 text-gray-500 md:mb-8 xl:text-lg">
            Create custom QR codes quickly and easily with our intuitive tool. Perfect for businesses and individuals alike. No sign-up required!
          </p>
          <DynamicQRCodeGenerator />
          <p className="mt-4 text-sm text-gray-400">
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
      </div>
      <Footer />
    </>
  );
}