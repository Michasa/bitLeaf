import Image from "next/image";
import React from "react";
import logo from "../../../public/images/broken.png";

const Error = ({ message }: { message: string }) => {
  return (
    <div className="mx-auto flex min-h-40 w-full flex-col items-center justify-center gap-y-4 rounded-md bg-gray-100 2xl:max-w-[50%]">
      <h2 className="text-center font-bold">
        <span className="uppercase text-red-500"> Oh snap!</span>
        <br /> There was an app disrupting error
      </h2>
      <Image src={logo} alt="broken tree branch" className="object-contain" />
      <p className="text-2xl font-bold">
        Error Message: <span className="text-brand-olive">{message}</span>
      </p>
      <div className="mt-4 text-xl">
        It's important this gets fixed cause the app can't work without it.
        <br /> Things that can help:
        <ul className="list-inside list-disc marker:text-brand-olive">
          <li>Following the instructions above</li>
          <li>Refreshing the page to create a new wallet</li>
          <li>Allowing cookies (this app really needs them!)</li>
          <li>Closing your browser and touching some grass</li>
        </ul>
      </div>
    </div>
  );
};

export default Error;
