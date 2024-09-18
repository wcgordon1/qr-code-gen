'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const CreateQRLink = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/');
    setTimeout(() => {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && window.location.hash === '#features') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        setTimeout(() => {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <a href="/#features" onClick={handleClick} className="text-gray-600 font-semibold hover:text-black">
      Create QR
    </a>
  );
};

export default CreateQRLink;