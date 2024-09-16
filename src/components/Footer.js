import Image from 'next/image';
import Link from 'next/link';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="bg-indigo-600 py-6">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
            <div className="mb-3 text-center md:mb-0 md:text-left">
              <span className="font-bold uppercase tracking-widest text-gray-100">Newsletter</span>
              <p className="text-indigo-200">Subscribe to our newsletter</p>
            </div>

            <form className="flex w-full gap-2 md:max-w-md">
              <input placeholder="Email" className="w-full flex-1 rounded border border-white bg-indigo-500 px-3 py-2 text-white placeholder-indigo-200 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              <button className="inline-block rounded bg-white px-8 py-2 text-center text-sm font-semibold text-indigo-600 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:text-indigo-700 md:text-base">Send</button>
            </form>
          </div>
        </div>
      </div>

      <div className="pt-12 lg:pt-16">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-16 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-6 lg:gap-8">
            <div className="col-span-full lg:col-span-2">
              {/* logo - start */}
              <div className="mb-4 lg:-mt-2">
                <Link href="/" className="inline-flex items-center gap-2 text-xl font-bold text-black md:text-2xl" aria-label="logo">
                  <Image src="/images/llamal.png" alt="Logo" width={30} height={30} />
                  QR Code Llama
                </Link>
              </div>
              {/* logo - end */}

              <p className="mb-6 text-gray-500 sm:pr-8">Generate and customize QR codes quickly and easily with our intuitive tool. Perfect for businesses and individuals alike.</p>

              {/* social - start */}
              <div className="flex gap-4">
                {/* Add your social media links here */}
                <div className="flex gap-4">
                  <a href="https://x.com/helloIamWilly" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter className="text-xl text-gray-600 hover:text-black" />
                  </a>

                  <a href="https://www.linkedin.com/in/will-gordon1/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-xl text-gray-600 hover:text-blue-600" />
                  </a>
                  <a href="https://github.com/wcgordon1/color-picker" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-xl text-gray-600 hover:text-gray-800" />
                  </a>
                </div>
              </div>
              {/* social - end */}
            </div>

            {/* nav - start */}
            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Products</div>
              <nav className="flex flex-col gap-4">
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Color Picker</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">.WebP Zip</Link></div>
              </nav>
            </div>
            {/* nav - end */}

            {/* nav - start */}
            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Llama</div>
              <nav className="flex flex-col gap-4">
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">About</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Blog</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Pricing Comparison</Link></div>
              </nav>
            </div>
            {/* nav - end */}

            {/* nav - start */}
            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Support</div>
              <nav className="flex flex-col gap-4">
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Contact</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">FAQ</Link></div>
              </nav>
            </div>
            {/* nav - end */}

            {/* nav - start */}
            <div>
              <div className="mb-4 font-bold uppercase tracking-widest text-gray-800">Legal</div>
              <nav className="flex flex-col gap-4">
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Terms of Service</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Privacy Policy</Link></div>
                <div><Link href="#" className="text-gray-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Cookie settings</Link></div>
              </nav>
            </div>
            {/* nav - end */}
          </div>

          <div className="border-t py-8 text-center text-sm text-gray-400">© {new Date().getFullYear()} - Present QR Code Llama. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;