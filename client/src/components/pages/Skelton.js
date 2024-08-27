import React from "react";

const Skelton = () => {
  return (
    <>
       <div className=" p-4  shadow-2xl h-screen bg-custom-700 overflow-auto">
        <div className="relative h-16    mb-4 flex justify-center items-center bg-gray-300 animate-pulse"></div>
        <div className="flex ">
          <div className="w-1/4  bg-gray-300 h-[100vh]  animate-pulse flex flex-row"></div>
          <div className="w-3/4  bg-gray-300 h-[10vh]  animate-pulse ml-8">
            <div className="w-3/4  bg-gray-300 h-[10vh] mt-32 animate-pulse w-[100%]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Skelton;
