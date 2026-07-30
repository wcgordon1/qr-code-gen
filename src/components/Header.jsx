import { Link } from 'react-router-dom';
import CreateQRLink from './CreateQRLink';

const Header = () => {
  return (
    <header className="bg-white mb-24 shadow-md">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src="/images/llamal.png" alt="Logo" className="h-8 w-8 object-contain" />
            <h1 className="ml-2 text-xl font-bold">QR Code Llama</h1>
          </Link>
          <div className="flex space-x-4 items-center">
            <CreateQRLink />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
