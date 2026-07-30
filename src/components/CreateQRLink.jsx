import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateQRLink = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      scrollToFeatures();
      return;
    }
    navigate('/');
    setTimeout(scrollToFeatures, 100);
  };

  useEffect(() => {
    if (location.pathname === '/' && window.location.hash === '#features') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        setTimeout(() => {
          featuresSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.pathname]);

  return (
    <a href="/#features" onClick={handleClick} className="text-gray-600 font-semibold hover:text-black">
      Create QR
    </a>
  );
};

export default CreateQRLink;
