'use client';

import React, { useState, useRef, useEffect } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { ChromePicker } from 'react-color';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';

const WifiQRGenerator = () => {
  const [ssid, setSSID] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState('WPA');
  const [hidden, setHidden] = useState(false);
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
  const [showPassword, setShowPassword] = useState(false);

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
  }, [ssid, password, encryption, hidden]);

  const generateQRCode = (e) => {
    e.preventDefault();
    if (!ssid.trim()) {
      toast.error('Must input network name (SSID)', {
        duration: 3000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: '#fff',
        },
      });
      return;
    }
    const encodedSSID = encodeURIComponent(ssid);
    const encodedPassword = encodeURIComponent(password);
    const hiddenStr = hidden ? 'true' : 'false';
    const data = `WIFI:S:${encodedSSID};T:${encryption};P:${encodedPassword};H:${hiddenStr};`;
    
    console.log('QR Code data:', data);

    if (qrCode) {
      qrCode.update({
        data: data,
      });
      setIsQRCodeGenerated(false);
      setTimeout(() => {
        setIsQRCodeGenerated(true);
      }, 50);
      
      toast.success(`QR Code for WiFi is ready to download`, {
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
      const fileName = prompt(`Enter a file name for your ${fileType.toUpperCase()} download:`, 'my-wifi-qr-code');
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
            <div>
              <label htmlFor="ssid" className="block text-sm font-medium text-gray-700">Network Name</label>
              <input
                type="text"
                id="ssid"
                value={ssid}
                onChange={(e) => setSSID(e.target.value)}
                placeholder="SSID"
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Encryption</label>
              <select
                value={encryption}
                onChange={(e) => setEncryption(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hidden"
                checked={hidden}
                onChange={() => setHidden(!hidden)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="hidden" className="ml-2 block text-sm font-medium text-gray-700">Hidden</label>
            </div>
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

export default WifiQRGenerator;