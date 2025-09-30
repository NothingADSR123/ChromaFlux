
import React from 'react';

export const Loader: React.FC = () => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex flex-col justify-center items-center z-50">
    <div className="w-16 h-16 border-4 border-t-4 border-gray-600 border-t-indigo-500 rounded-full animate-spin"></div>
    <p className="mt-4 text-white text-lg">AI is thinking...</p>
  </div>
);
