import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#20FF82] mb-4"></div>
        <p className="text-gray-400">Carregando...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;

