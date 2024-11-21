import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormSchema from "@/lib/formSchema";
import { z } from "zod";
import { StateHandler } from "../context/StateHandler";
import FormPage from "./form";
import Confirmation from "./qrcode";

type PaymentsFlow = Pick<StateHandler, "selectedWallet" | "wallets">;

export type SubmittedForm = {
  recipientAddress: string;
  amount: number;
  label?: string | undefined;
};

const PaymentsFlow = ({ selectedWallet, wallets }: PaymentsFlow) => {
  const [page, setPage] = useState<number>(1);
  const [submittedForm, setSubmittedForm] = useState<SubmittedForm | null>(
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
      amount: undefined,
      label: undefined,
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //TODO sanatise values
    onUpdateCurrentPage(2);
    setSubmittedForm(values);
    console.log(values, "hihih");
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
        return <Confirmation submittedForm={submittedForm} />;
      default:
        return <div>Oops, you weren't suppose to see this!!</div>;
    }
  };

  return <>{renderPage()}</>;
};

export default PaymentsFlow;
