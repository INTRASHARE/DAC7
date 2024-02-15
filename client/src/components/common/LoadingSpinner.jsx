import React from "react";
import Lottie from "lottie-react";
import loading_animation from "./loading_animation.json" ;

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Lottie animationData={loading_animation}></Lottie>
      {/* <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div> */}
    </div>
  );
};

export default LoadingSpinner;
