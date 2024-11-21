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
  MAX_MESSAGE_CHAR_COUNT,
  MAX_REQ_AMOUNT,
  MIN_REQ_AMOUNT,
} from "@/lib/constants";
import { Textarea } from "../ui/textarea";
import { StateHandler } from "../context/StateHandler";
import { UseFormReturn } from "react-hook-form";
import { SubmittedForm } from ".";
import { cn } from "@/lib/utils";

type FormPage = Pick<StateHandler, "selectedWallet" | "wallets"> & {
  // onUpdateCurrentPage: (arg: number) => void;
  // setCurrentForm: (arg: SubmittedForm) => void;
  form: UseFormReturn<SubmittedForm>;
  onSubmit: (arg: SubmittedForm) => void;
};

const FormPage = ({ form, selectedWallet, wallets, onSubmit }: FormPage) => {
  const { watch, register } = form;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          name="recipientAddress"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full justify-between">
                <FormLabel>Recipient Address</FormLabel>
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
                (Previously selected wallet is set as the default payment
                option.)
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => {
            return (
              <FormItem>
                <div className="flex w-full justify-between">
                  <FormLabel>Amount Request (BTC)</FormLabel> <FormMessage />
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
            const wordCount = label ? label.length : null;
            return (
              <FormItem>
                <div className="flex w-full justify-between">
                  <FormLabel>Message (Optional)</FormLabel> <FormMessage />
                </div>
                <FormControl>
                  <Textarea
                    placeholder="Add an option message to this request!"
                    className="resize-none"
                    {...field}
                    {...register("label")}
                  />
                </FormControl>
                <FormDescription className="w-full text-end italic">
                  {wordCount !== null ? (
                    <div>
                      <span
                        className={cn(
                          wordCount > MAX_MESSAGE_CHAR_COUNT &&
                            "font-bold text-red-500",
                        )}
                      >
                        {wordCount}
                      </span>{" "}
                      / {MAX_MESSAGE_CHAR_COUNT} characters
                    </div>
                  ) : (
                    ""
                  )}
                </FormDescription>
              </FormItem>
            );
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormPage;
