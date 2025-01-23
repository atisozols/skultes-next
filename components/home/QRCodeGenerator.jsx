'use client';
import { useState, useEffect } from 'react';
import Card from '../ui/Card';
import QRCode from 'react-qr-code';
import { IoQrCode } from 'react-icons/io5';

const QRCodeGenerator = () => {
  const [code, setCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to generate a random 8-character alphanumeric code
  const generateRandomCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCodeRequest = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
      return;
    }
    const newCode = generateRandomCode();
    setCode(newCode);
    setIsModalOpen(true);

    // Automatically close the modal after 7 seconds
    setTimeout(() => {
      setCode('');
      setIsModalOpen(false);
    }, 7000);
  };

  const closeModal = () => {
    setCode('');
    setIsModalOpen(false);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 md:hidden">
      <div
        onClick={handleCodeRequest}
        className="absolute bottom-10 left-1/2 z-50 flex -translate-x-1/2 cursor-pointer items-center justify-center rounded-full bg-background p-5 shadow-lg"
      >
        <IoQrCode className="h-9 w-9 text-white" />
        {/* <span className="loading loading-dots h-12 w-12 text-white"></span> */}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30"
          onClick={closeModal}
        >
          <div className="mx-auto flex max-w-sm items-center justify-center">
            <Card onClick={(e) => e.stopPropagation()}>
              {code && (
                <div className="w-full max-w-xs rounded-lg bg-white p-2">
                  <QRCode className="h-full w-full" value={code} />
                </div>
              )}
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRCodeGenerator;
