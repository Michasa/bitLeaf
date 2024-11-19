import React from "react";
import logo from "../../public/images/logo.png";
import Image from "next/image";

const Title = () => {
  return (
    <div className="relative self-center text-center">
      <Image
        src={logo}
        alt=""
        className="animate-once max-xs:hidden animate-duration-500 pointer-events-none absolute left-[15%] size-24 rotate-[-10] animate-bounce object-contain object-left md:-left-4 md:top-0 md:size-32 lg:-left-8 lg:-top-3 lg:size-40"
      />
      <h1 className="max-xs:text-yellow-400 mb-12 font-bold text-transparent">
        b
        <span className="isolate z-1 text-brand-green-600 lg:ml-7">
          <span className="max-xs:text-yellow-400 isolate text-amber-300">
            it
          </span>
          Leaf
        </span>{" "}
      </h1>
      <div className="isolate z-1 text-xl">
        <p className="animate-fade-up animate-once animate-duration-1000 animate-ease-linear">
          Your friends will pay you back
        </p>
        <p className="animate-shake animate-once animate-duration-500 animate-delay-[1200ms] animate-ease-in">
          ...right?
        </p>
      </div>
    </div>
  );
};

export default Title;
