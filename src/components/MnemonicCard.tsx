"use client";
import { generateMasterKey, revealMnemonic } from "@/app/actions";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Icon } from "@iconify-icon/react";
import { useToast } from "@/hooks/use-toast";

const Content = ({
  mnemonicPhrase,
  revealLoading,
}: {
  mnemonicPhrase: null | string;
  revealLoading: boolean;
}) => {
  if (mnemonicPhrase) {
    return mnemonicPhrase.split(" ").map((word, index) => (
      <div className="flex flex-col justify-center" key={index}>
        <span>{index + 1}</span>
        <div className="rounded-lg bg-brand-olive-300 p-2">{word}</div>
      </div>
    ));
  }

  if (revealLoading) {
    return (
      <div className="flex items-center text-lg">
        <Icon className="animate-spin" icon="ri:loader-fill" />
        Loading
      </div>
    );
  }
  return <p className="text-lg">Hidden</p>;
};

const MnemonicCard = () => {
  const { toast } = useToast();
  const [mnemonicPhrase, setMnemonicPhrase] = useState<null | string>(null);
  const [revealLoading, setRevealLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { setUpSuccess, failureReason } = await generateMasterKey();
      //TODO add toast

      if (!setUpSuccess) {
        throw new Error(failureReason);
      }
    };
    getData();
  }, []);

  const onRevealRequest = async () => {
    if (!mnemonicPhrase) {
      setRevealLoading(true);
      const response = await revealMnemonic();
      if (response) {
        setRevealLoading(false);
        setMnemonicPhrase(response);
      }
    } else {
      setMnemonicPhrase(null);
    }
  };

  const handleCopy = async () => {
    //FIXME - why doesn't the copy and paste work on windows?
    await navigator.clipboard
      ?.writeText(mnemonicPhrase as string)
      .then((fulfilled) =>
        toast({
          title: "Master Key Mnemonic Copied!",
          description: "Keep it somewhere safe",
        }),
      )
      .catch((error) =>
        toast({
          title: "Could not copy",
          description: error,
        }),
      );
  };

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Card className="flex w-full flex-col items-center justify-center border-amber-300 bg-amber-100 p-4 text-center md:w-10/12 lg:w-7/12">
          <Collapsible className="w-full">
            <CollapsibleTrigger className="flex w-full items-center justify-between text-start">
              <div className="flex flex-col">
                <CardTitle className="my-2 flex gap-x-2 max-lg:text-center">
                  Your Master Key Mnemonic:
                </CardTitle>
                <CardDescription className="flex items-center gap-x-2 text-stone-600">
                  <Icon
                    inline
                    icon="si:warning-duotone"
                    className="text-lg text-red-500"
                  />
                  <p>
                    Knowing this gives access to <b>all</b> wallets created and
                    potentially their funds too.{" "}
                    <b>Always keep it safe and hidden!</b>
                  </p>
                </CardDescription>{" "}
              </div>
              <Icon
                icon="lsicon:toggle-outline"
                className="m-4 aspect-square text-5xl text-amber-400 hover:text-amber-600"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="flex w-full justify-center">
              <CardContent className="mb-4 mt-8 flex flex-col items-center gap-y-4 lg:w-5/6">
                <div className="flex flex-wrap justify-center gap-2 rounded-md border border-amber-300 bg-white/50 p-4">
                  <Content
                    mnemonicPhrase={mnemonicPhrase}
                    revealLoading={revealLoading}
                  />
                </div>
                <div className="flex gap-x-4">
                  {" "}
                  <Button disabled={revealLoading} onClick={onRevealRequest}>
                    {mnemonicPhrase ? (
                      <>
                        Hide Phrase <Icon icon="mingcute:eye-close-line" />
                      </>
                    ) : (
                      <>
                        Reveal Phrase
                        <Icon icon="mingcute:eye-2-line" />
                      </>
                    )}
                  </Button>
                  {mnemonicPhrase && (
                    <Button
                      variant="outline"
                      disabled={revealLoading}
                      onClick={handleCopy}
                    >
                      Copy
                      <Icon icon="mingcute:copy-line" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </>
  );
};

export default MnemonicCard;
