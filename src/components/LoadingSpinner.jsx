import React from 'react';
import { FaSpinner } from 'react-icons/fa';

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin mr-2 w-20 h-20" />
    </div>
  );
}

export default LoadingSpinner;
