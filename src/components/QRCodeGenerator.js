'use client';

import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { ChromePicker } from 'react-color';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const QRCodeGenerator = () => {
  const [url, setUrl] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [dotsColor, setDotsColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showDotsColorPicker, setShowDotsColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [contrastWarning, setContrastWarning] = useState(false);
  const [lastGeneratedUrl, setLastGeneratedUrl] = useState('');
  const [lastGeneratedDotsColor, setLastGeneratedDotsColor] = useState('#000000');
  const [lastGeneratedBackgroundColor, setLastGeneratedBackgroundColor] = useState('#ffffff');
  const qrRef = useRef(null);
  const dotsColorPickerRef = useRef(null);
  const bgColorPickerRef = useRef(null);
  const qrContainerRef = useRef(null);
  const [qrType, setQrType] = useState('square');

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 1000,
      height: 1000,
      type: 'svg',
      dotsOptions: {
        color: dotsColor,
        type: qrType
      },
      backgroundOptions: {
        color: backgroundColor,
      },
    });
    setQrCode(qrCode);
  }, [dotsColor, backgroundColor, qrType]);

  useEffect(() => {
    if (qrCode && qrRef.current && isQRCodeGenerated) {
      qrRef.current.innerHTML = '';
      qrCode.append(qrRef.current);
      
      // After appending, find the SVG and adjust its attributes
      const svg = qrRef.current.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 1000 1000');
        svg.style.display = 'block';
        svg.style.maxWidth = '100%';
        svg.style.maxHeight = '100%';
      }
    }
  }, [qrCode, isQRCodeGenerated]);

  useEffect(() => {
    // Check if the current input or colors are different from the last generated QR code
    if (isQRCodeGenerated && 
        (url !== lastGeneratedUrl || 
         dotsColor !== lastGeneratedDotsColor || 
         backgroundColor !== lastGeneratedBackgroundColor)) {
      setIsQRCodeGenerated(false);
    }
  }, [url, dotsColor, backgroundColor]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dotsColorPickerRef.current && !dotsColorPickerRef.current.contains(event.target)) {
        setShowDotsColorPicker(false);
      }
      if (bgColorPickerRef.current && !bgColorPickerRef.current.contains(event.target)) {
        setShowBgColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const generateQRCode = (e) => {
    e.preventDefault();
    if (qrCode && url) {
      qrCode.update({
        data: url,
        imageOptions: {
          saveAs: "svg" // Generating as SVG to ensure better scaling
        }
      });
      setIsQRCodeGenerated(true);
      setLastGeneratedUrl(url);
      setLastGeneratedDotsColor(dotsColor);
      setLastGeneratedBackgroundColor(backgroundColor);
      
      // Show toast notification
      toast.success(`QR Code for "${url}" is ready to download`, {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#4ade80',
          color: '#fff',
        },
        iconTheme: {
          primary: '#fff',
          secondary: '#4ade80',
        },
      });
    }
  };

  const downloadQRCode = (fileType) => {
    if (qrCode) {
      const fileName = prompt(`Enter a file name for your ${fileType.toUpperCase()} download:`, 'my-qr-code');
      if (fileName) {
        qrCode.download({
          extension: fileType,
          name: fileName,
        });
      }
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleDotsColorChange = (newColor) => {
    setDotsColor(newColor.hex);
    if (qrCode) {
      qrCode.update({
        dotsOptions: {
          color: newColor.hex
        }
      });
    }
    checkContrast();
  };

  const handleBackgroundColorChange = (newColor) => {
    setBackgroundColor(newColor.hex);
    if (qrCode) {
      qrCode.update({
        backgroundOptions: {
          color: newColor.hex
        }
      });
    }
    checkContrast();
  };

  const checkContrast = () => {
    const getLuminance = (color) => {
      const rgb = color.match(/\w\w/g).map(x => parseInt(x, 16) / 255);
      const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(dotsColor);
    const l2 = getLuminance(backgroundColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    setContrastWarning(ratio < 7);
  };

  const ColorButton = ({ color, onClick, children }) => (
    <div className="flex items-center">
      <button
        type="button"
        onClick={onClick}
        className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-700 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-900 md:text-base mr-2"
      >
        {children}
      </button>
      <div 
        className="w-10 h-10 rounded-lg border border-gray-300" 
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );

  const handleTypeChange = (newType) => {
    setQrType(newType);
    setIsQRCodeGenerated(false); // Reset to show default image
    if (qrCode) {
      qrCode.update({
        dotsOptions: {
          type: newType
        }
      });
    }
  };

  const TypeIcon = ({ type, icon }) => (
    <button
      onClick={() => handleTypeChange(type)}
      className={`p-2 rounded-lg ${qrType === type ? 'border-2 border-indigo-600' : 'border-2 border-transparent'}`}
    >
      {icon}
    </button>
  );

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex flex-col justify-center md:w-1/2">
          <form onSubmit={generateQRCode} className="mb-4 flex flex-col gap-4">
            <input
              type="text"
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter URL or text"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            />
            <button
              type="submit"
              className="inline-block rounded-lg bg-indigo-600 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-700 focus-visible:ring active:bg-indigo-800 md:text-base"
            >
              Generate QR Code
            </button>
            <p className="text-black font-bold xl:text-lg">
              Type:
            </p>
            <div className="flex justify-start space-x-4">
              <TypeIcon 
                type="square" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                } 
              />
              <TypeIcon 
                type="dots" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                } 
              />
              <TypeIcon 
                type="rounded" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="5" />
                  </svg>
                } 
              />
            </div>
            <p className="text-black font-bold xl:text-lg">
              Color:
            </p>
            <ColorButton color={dotsColor} onClick={() => setShowDotsColorPicker(!showDotsColorPicker)}>
              QR Color
            </ColorButton>
            {showDotsColorPicker && (
              <div className="absolute z-10" ref={dotsColorPickerRef}>
                <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: '250px' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Choose Color</span>
                    <button
                      onClick={() => setShowDotsColorPicker(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <ChromePicker
                    color={dotsColor}
                    onChange={handleDotsColorChange}
                    onChangeComplete={checkContrast}
                    disableAlpha={true}
                    styles={{ default: { picker: { width: '100%' } } }}
                  />
                </div>
              </div>
            )}
            <ColorButton color={backgroundColor} onClick={() => setShowBgColorPicker(!showBgColorPicker)}>
              Background
            </ColorButton>
            {showBgColorPicker && (
              <div className="absolute z-10" ref={bgColorPickerRef}>
                <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: '250px' }}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-semibold">Choose Background Color</span>
                    <button
                      onClick={() => setShowBgColorPicker(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <ChromePicker
                    color={backgroundColor}
                    onChange={handleBackgroundColorChange}
                    onChangeComplete={checkContrast}
                    disableAlpha={true}
                    styles={{ default: { picker: { width: '100%' } } }}
                  />
                </div>
              </div>
            )}
            {contrastWarning && (
              <p className="text-red-500 text-sm">
                The contrast between QR code and background colors may be too low for optimal scanning. Please choose colors with higher contrast or double check with your phone camera.
              </p>
            )}
          </form>
        </div>

        <div className="md:w-1/2 flex flex-col items-center">
          <div 
            ref={qrContainerRef}
            className="w-full max-w-[320px] aspect-square relative bg-gray-100 rounded-lg shadow-lg overflow-hidden"
          >
            {!isQRCodeGenerated ? (
              <Image
                src="/images/qr.png"
                alt="Default QR Code"
                layout="fill"
                objectFit="contain"
              />
            ) : (
              <div 
                ref={qrRef}
                className="absolute inset-0 flex items-center justify-center"
              >
                {/* The generated QR code will be appended here */}
              </div>
            )}
          </div>

          {isQRCodeGenerated && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button onClick={() => downloadQRCode('png')} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">PNG</button>
              <button onClick={() => downloadQRCode('jpeg')} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">JPEG</button>
              <button onClick={() => downloadQRCode('webp')} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">WebP</button>
              <button onClick={() => downloadQRCode('svg')} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">SVG</button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default QRCodeGenerator;