import React from "react";

const LoaderComponent: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="flex gap-3 space-x-2">
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default LoaderComponent;
