import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import logo from "../../../public/images/broken.png";

const Error = () => {
  return (
    <div className="flex size-full w-full flex-col items-center justify-center gap-y-4 rounded-md bg-gray-100">
      <h3 className="text-center font-bold">
        This payment request couldn't be procesed correctly
      </h3>
      <Image
        src={logo}
        alt="tree with no leaves left"
        className="size-10 object-contain"
      />
      <div className="mt-4 text-xl">
        <Button>Restart Payment Request</Button>
      </div>
    </div>
  );
};

export default Error;
