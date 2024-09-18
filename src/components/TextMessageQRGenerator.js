'use client';

import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { ChromePicker } from 'react-color';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const TextMessageQRGenerator = () => {
  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrCode, setQrCode] = useState(null);
  const [dotsColor, setDotsColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showDotsColorPicker, setShowDotsColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [contrastWarning, setContrastWarning] = useState(false);
  const [qrType, setQrType] = useState('rounded');
  const qrRef = useRef(null);
  const dotsColorPickerRef = useRef(null);
  const bgColorPickerRef = useRef(null);
  const qrContainerRef = useRef(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 1000,
      height: 1000,
      type: 'canvas',
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

      const canvas = qrRef.current.querySelector('canvas');
      if (canvas) {
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.maxWidth = '100%';
        canvas.style.maxHeight = '100%';
        canvas.style.objectFit = 'contain';
      }
    }
  }, [qrCode, isQRCodeGenerated]);

  useEffect(() => {
    setIsQRCodeGenerated(false);
  }, [countryCode, phoneNumber, message]);

  const generateQRCode = (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      toast.error('Must input telephone number', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
      return;
    }
    const cleanedPhoneNumber = phoneNumber.replace(/[-()\s]/g, '');
    const data = `sms:${countryCode}${cleanedPhoneNumber}?body=${encodeURIComponent(message)}`;
    if (qrCode) {
      qrCode.update({
        data: data,
      });
      setIsQRCodeGenerated(true);
      
      toast.success(`QR Code for text message is ready to download`, {
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
      const fileName = prompt(`Enter a file name for your ${fileType.toUpperCase()} download:`, 'my-text-message-qr-code');
      if (fileName) {
        const canvas = qrRef.current.querySelector('canvas');
        if (canvas) {
          const dataUrl = canvas.toDataURL(`image/${fileType}`);
          const link = document.createElement('a');
          link.download = `${fileName}.${fileType}`;
          link.href = dataUrl;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
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
    checkContrast(newColor.hex, backgroundColor);
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
    checkContrast(dotsColor, newColor.hex);
  };

  const checkContrast = (fgColor, bgColor) => {
    const getLuminance = (color) => {
      const rgb = color.match(/\w\w/g).map(x => parseInt(x, 16) / 255);
      const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const l1 = getLuminance(fgColor);
    const l2 = getLuminance(bgColor);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

    setContrastWarning(ratio < 7);
  };

  const ColorButton = ({ color, onClick, children, showPicker, onClose, onChangeComplete }) => (
    <div className="relative">
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
      {showPicker && (
        <div className="absolute bottom-full mb-2 z-10" ref={children === 'QR Color' ? dotsColorPickerRef : bgColorPickerRef}>
          <div className="bg-white rounded-lg shadow-lg p-4" style={{ width: '250px' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-semibold">Choose Color</span>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <ChromePicker
              color={color}
              onChange={onChangeComplete}
              disableAlpha={true}
              styles={{ default: { picker: { width: '100%' } } }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const handleTypeChange = (newType) => {
    setQrType(newType);
    setIsQRCodeGenerated(false);
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

  return (
    <>
      <div className="flex flex-col gap-8 md:flex-row md:items-start">
        <div className="flex flex-col justify-center md:w-1/2">
          <form onSubmit={generateQRCode} className="mb-4 flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                placeholder="Country Code"
                className="w-1/4 rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className="w-3/4 rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message. Not compatible with all carriers 100% of the time."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              rows="4"
            ></textarea>
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
                type="rounded" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="5" />
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
                type="square" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                  </svg>
                } 
              />
            
            </div>
            <p className="text-black font-bold xl:text-lg">
              Color:
            </p>
            <ColorButton 
              color={dotsColor} 
              onClick={() => setShowDotsColorPicker(!showDotsColorPicker)}
              showPicker={showDotsColorPicker}
              onClose={() => setShowDotsColorPicker(false)}
              onChangeComplete={handleDotsColorChange}
            >
              QR Color
            </ColorButton>
            <ColorButton 
              color={backgroundColor} 
              onClick={() => setShowBgColorPicker(!showBgColorPicker)}
              showPicker={showBgColorPicker}
              onClose={() => setShowBgColorPicker(false)}
              onChangeComplete={handleBackgroundColorChange}
            >
              Background
            </ColorButton>
            {contrastWarning && (
              <p className="text-red-500 text-sm">
                The contrast between QR code and background colors may be too low for optimal scanning. Proceed with caution and triple check your QR code before going live.
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
                priority
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

export default TextMessageQRGenerator;