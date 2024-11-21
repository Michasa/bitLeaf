import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormSchema from "@/lib/formSchema";
import { z } from "zod";
import { StateHandler } from "../context/StateHandler";
import FormPage from "./form";
import QRCodeShare from "./qrcode";
import { SavedPayment, SubmittedForm } from "@/lib/types";
import { MIN_REQ_AMOUNT } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";
import { createPaymentURI, sanitizeAndEncodeValues } from "@/lib/utils";

type PaymentsFlow = Pick<StateHandler, "selectedWallet" | "wallets"> & {
  setOpenPaymentDialog: (arg: boolean) => void;
};

const PaymentsFlow = ({
  selectedWallet,
  wallets,
  setOpenPaymentDialog,
}: PaymentsFlow) => {
  const { toast } = useToast();

  const [page, setPage] = useState<number>(1);
  const [createdPayment, setCreatedPayment] = useState<SavedPayment | null>(
    null,
  );

  const onUpdateCurrentPage = (newPage: number) => {
    if (newPage > 1 && newPage <= 2) {
      setPage(newPage);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recipientAddress: selectedWallet?.address,
      amount: MIN_REQ_AMOUNT,
      label: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    //todo if no values crash appp
    const sanitizedValues = sanitizeAndEncodeValues(values);

    if (Object.keys(sanitizedValues).length === 0) {
      toast({
        title: "Could not process payment request!",
        description:
          "Something went wrong when preparing the QR Code, please restart payments again",
      });
    }

    const paymentURI = createPaymentURI(sanitizedValues);

    const newPayment = {
      ...(sanitizedValues as SubmittedForm),
      created: new Date(),
      paid: false,
      uri: paymentURI,
    } satisfies SavedPayment;

    setCreatedPayment(newPayment);
    onUpdateCurrentPage(2);
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <FormPage
            onSubmit={onSubmit}
            form={form}
            selectedWallet={selectedWallet}
            wallets={wallets}
          />
        );
      case 2:
        return (
          <QRCodeShare
            createdPayment={createdPayment}
            setOpenPaymentDialog={setOpenPaymentDialog}
          />
        );
      default:
        return <div>Oops, you weren't suppose to see this!!</div>;
    }
  };

  return (
    <div className="h-full overflow-scroll rounded-md border border-slate-500/50 p-4 md:p-8">
      {renderPage()}
    </div>
  );
};

export default PaymentsFlow;
