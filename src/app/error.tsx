"use client";
import Image from "next/image";
import React from "react";
import logo from "../../public/images/broken.png";

const Error = () => {
  return (
    <div className="mx-auto flex min-h-40 w-full flex-col items-center justify-center gap-y-4 rounded-md bg-gray-100 2xl:max-w-[50%]">
      <h1 className="text-center font-bold">
        <span className="uppercase text-red-500"> Oh snap!</span>
        <br /> There was an app disrupting error
      </h1>
      <Image src={logo} alt="broken tree branch" className="object-contain" />
      <p>
        Check the console for more information or the page to refresh to restart
        the app
      </p>
    </div>
  );
};

export default Error;
