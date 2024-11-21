import React from "react";
import logo from "../../public/images/logo.png";
import Image from "next/image";

const Title = () => {
  return (
    <div className="relative self-center text-center">
      <Image
        src={logo}
        alt=""
        className="pointer-events-none absolute left-[15%] size-24 rotate-[-10] animate-bounce object-contain object-left animate-duration-500 animate-once max-xs:hidden md:-left-4 md:top-0 md:size-32 lg:-left-8 lg:-top-3 lg:size-40"
      />
      <h1 className="mb-12 font-bold text-transparent max-xs:text-yellow-400">
        b
        <span className="isolate z-1 text-brand-olive-500 lg:ml-7">
          <span className="isolate text-amber-300 max-xs:text-yellow-400">
            it
          </span>
          Leaf
        </span>{" "}
      </h1>
      <div className="isolate z-1 text-xl">
        <p className="animate-fade-down animate-duration-1000 animate-once animate-ease-linear">
          Your friends will pay you back
        </p>
        <p className="animate-fade-up font-bold text-brand-olive-600 underline decoration-amber-400 decoration-wavy animate-delay-[1500ms] animate-duration-500 animate-once animate-ease-in">
          ...right?
        </p>
      </div>
    </div>
  );
};

export default Title;
