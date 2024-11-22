import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormSchema from "@/lib/formSchema";
import { z } from "zod";
import { StateHandler } from "../context/StateHandler";
import FormPage from "./form";
import QRCodeShare from "./qrcode";
import { PageType, SavedPayment, SubmittedForm } from "@/lib/types";
import { MIN_REQ_AMOUNT } from "@/lib/constants";
import { createPaymentURI, sanitizeAndEncodeValues } from "@/lib/utils";
import Error from "./error";
import { toast } from "@/hooks/use-toast";

type PaymentsFlow = Pick<
  StateHandler,
  "selectedWallet" | "wallets" | "onAddPayment"
> & {
  setOpenPaymentDialog: (arg: boolean) => void;
};

export const PAGES = {
  0: PageType.ERROR,
  1: PageType.FORM,
  2: PageType.QR_CODE,
};

const PaymentsFlow = ({
  selectedWallet,
  wallets,
  setOpenPaymentDialog,
  onAddPayment,
}: PaymentsFlow) => {
  const [page, setPage] = useState<PageType>(PAGES[1]);
  const [createdPayment, setCreatedPayment] = useState<SavedPayment | null>(
    null,
  );

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
    if (!values.recipientAddress || !values.amount) {
      setPage(PAGES[0]);
      return;
    }

    const sanitizedValues = sanitizeAndEncodeValues(values);

    if (Object.keys(sanitizedValues).length === 0) {
      setPage(PAGES[0]);
      return;
    }

    const newPayment = {
      ...(sanitizedValues as SubmittedForm),
      created: new Date(),
      paid: false,
      uri: createPaymentURI(sanitizedValues),
    } satisfies SavedPayment;

    setCreatedPayment(newPayment);
    onAddPayment(newPayment);
    toast({
      title: "Payment request created!",
      description: `For ${newPayment.amount} BTC to ${newPayment.recipientAddress}`,
    });
    setPage(PAGES[2]);
  };

  const renderPage = () => {
    switch (page) {
      case PAGES[1]:
        return (
          <FormPage
            onSubmit={onSubmit}
            form={form}
            selectedWallet={selectedWallet}
            wallets={wallets}
          />
        );
      case PAGES[2]:
        return (
          <QRCodeShare
            setPage={setPage}
            createdPayment={createdPayment}
            setOpenPaymentDialog={setOpenPaymentDialog}
          />
        );
      case PAGES[0]:
      default:
        return <Error />;
    }
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden rounded-md border border-slate-500/50 xl:h-fit">
      {renderPage()}
    </div>
  );
};

export default PaymentsFlow;
