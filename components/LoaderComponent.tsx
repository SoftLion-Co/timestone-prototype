import React from "react";
import ReactDOM from "react-dom";

const LoaderComponent: React.FC = () => {
  return ReactDOM.createPortal(
    <div  className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50" >
      <div className="flex gap-3 space-x-2">
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-darkBurgundy rounded-full animate-pulse"></div>
      </div>
    </div>,
     document.body 
  );
};

export default LoaderComponent;
