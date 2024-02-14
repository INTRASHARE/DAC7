import Image from "next/image";
import React from "react";
import Lottie from "lottie-react";
import animationdata from "../components/common/animation.json" ;

function Empty() {
  return (
    <div style={{backgroundColor: "#f7efe0"}} className="border-conversation-border border-l w-full flex flex-col h-[100vh] border-b-4 border-b-icon-green items-center justify-center">
      <Lottie animationData={animationdata} height={300} width={300} ></Lottie>
    </div>
  );
}

export default Empty;
