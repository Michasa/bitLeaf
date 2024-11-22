import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  MAX_LABEL_CHAR_COUNT,
  MAX_MESSAGE_CHAR_COUNT,
  MAX_REQ_AMOUNT,
  MIN_REQ_AMOUNT,
} from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import { StateHandler } from "../context/StateHandler";
import { UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { SubmittedForm } from "@/lib/types";

type FormPage = Pick<StateHandler, "selectedWallet" | "wallets"> & {
  form: UseFormReturn<SubmittedForm>;
  onSubmit: (arg: SubmittedForm) => void;
};

const FormPage = ({ form, selectedWallet, wallets, onSubmit }: FormPage) => {
  const { watch, register } = form;
  return (
    <Form {...form}>
      <FormDescription className="text-right">
        Fields with <span className="text-lg text-red-500">*</span> are required
      </FormDescription>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center space-y-8 p-4 md:p-8"
      >
        <FormField
          name="recipientAddress"
          render={({ field }) => (
            <FormItem className="w-full">
              <div className="flex w-full justify-between">
                <FormLabel>
                  Recieving Wallet Address{" "}
                  <span className="text-lg text-red-500">*</span>
                </FormLabel>
                <FormMessage />
              </div>
              <Select
                onValueChange={field.onChange}
                defaultValue={selectedWallet?.address}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {wallets.map(({ address }) => {
                    return (
                      <SelectItem key={address} value={address}>
                        {address}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription>
                Previously selected wallet is set as the default payment option.
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => {
            return (
              <FormItem className="w-full">
                <div className="flex w-full justify-between">
                  <FormLabel>
                    Amount Requested (BTC)
                    <span className="text-lg text-red-500">*</span>
                  </FormLabel>{" "}
                  <FormMessage />
                </div>

                <FormControl>
                  <Input
                    type="number"
                    min={MIN_REQ_AMOUNT}
                    step={MIN_REQ_AMOUNT}
                    max={MAX_REQ_AMOUNT}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Minimum amount supported is {MIN_REQ_AMOUNT} BTC and maximum{" "}
                  {MAX_REQ_AMOUNT} BTC.
                </FormDescription>
              </FormItem>
            );
          }}
        />{" "}
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => {
            const label = watch("label");
            const wordCount = label ? label.length : 0; // Changed from null to 0

            return (
              <FormItem className="w-full">
                <div className="flex w-full justify-between">
                  <FormLabel>Label</FormLabel>
                  <FormMessage />
                </div>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="The purpose of this payment"
                    className="resize-none"
                    {...field}
                    {...register("label")}
                  />
                </FormControl>
                <FormDescription className="w-full text-end italic">
                  <span
                    className={cn(
                      wordCount > MAX_LABEL_CHAR_COUNT &&
                        "font-bold text-red-500",
                    )}
                  >
                    {wordCount}
                  </span>
                  {" / "}
                  {MAX_LABEL_CHAR_COUNT} characters
                </FormDescription>
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => {
            const message = watch("message");
            const wordCount = message ? message.length : null;
            return (
              <FormItem className="w-full">
                <div className="flex w-full justify-between">
                  <FormLabel>Message </FormLabel> <FormMessage />
                </div>
                <FormControl>
                  <Textarea
                    defaultValue={undefined}
                    placeholder="Why not add a message to this request?"
                    className="resize-none"
                    {...field}
                    {...register("message")}
                  />
                </FormControl>
                <FormDescription className="w-full text-end italic">
                  {wordCount !== null ? (
                    <>
                      <span
                        className={cn(
                          wordCount > MAX_MESSAGE_CHAR_COUNT &&
                            "font-bold text-red-500",
                        )}
                      >
                        {wordCount}
                      </span>{" "}
                      / {MAX_MESSAGE_CHAR_COUNT} characters
                    </>
                  ) : (
                    ""
                  )}
                </FormDescription>
              </FormItem>
            );
          }}
        />
        <Button type="submit" className="w-1/2">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default FormPage;
