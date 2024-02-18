import React from "react";
// import Lottie from "lottie-react";
import  dynamic from"next/dynamic";
import loading_animation from "./loading_animation.json" ;

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loading_animation}></Lottie>
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div> */}
    </div>
  );
};

export default LoadingSpinner;
