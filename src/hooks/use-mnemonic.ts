import { generateMasterKey, revealMnemonic } from "@/app/actions";
import { useErrorContext } from "@/components/context/ErrorHandler";
import { useState, useEffect } from "react";
import { useToast } from "./use-toast";

const useMnemonic = () => {
  const { setError } = useErrorContext();
  const { toast } = useToast();

  const [mnemonicPhrase, setMnemonicPhrase] = useState<null | string>(null);
  const [revealLoading, setRevealLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        await generateMasterKey();
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message as string);
        }
      }
    };
    getData();
  }, [setError]);

  const onRevealMasterKey = async () => {
    if (!mnemonicPhrase) {
      try {
        setRevealLoading(true);
        const response = await revealMnemonic();
        if (response) {
          setMnemonicPhrase(response);
        }
      } catch (error) {
        if (error instanceof Error) {
          return toast({
            title: "Could not reveal mnemonic",
            description: error.message as string,
          });
        }
      } finally {
        setRevealLoading(false);
      }
    } else {
      setMnemonicPhrase(null);
    }
  };

  const handleCopy = async (
    copyItem: string,
    toastMessage: { title: string; description?: string },
  ) => {
    try {
      await navigator.clipboard?.writeText(copyItem);
      return toast(toastMessage);
    } catch (error) {
      if (error)
        return toast({
          title: "Could not copy",
        });
    }
  };

  return { revealLoading, mnemonicPhrase, onRevealMasterKey, handleCopy };
};

export default useMnemonic;
