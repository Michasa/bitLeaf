"use client";
// import { ErrorBoundary } from "react-error-boundary";
import React, { useEffect, useState } from "react";
import MnemonicCard from "../MnemonicCard";
import WalletGenerator from "../WalletGenerator/index";
import Title from "../Title";

const StartDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Title />
      <div className="flex w-full flex-col items-center gap-y-4">
        <MnemonicCard />
        <WalletGenerator />
      </div>
    </>
  );
};

export default StartDashboard;
