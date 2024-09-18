import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Header = () => {
  return (
    <header className="bg-white mb-24 shadow-md">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center">
            <Image src="/images/llamal.png" alt="Logo" width={30} height={30} />
            <h1 className="ml-2 text-xl font-bold">QR Code Llama</h1>
          </Link>
          <div className="flex space-x-4 items-center">
            <Link href="/info" className="text-gray-600 font-semibold hover:text-black">
              Create QR
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;