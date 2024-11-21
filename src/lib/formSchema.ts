"use client"

import { z } from "zod"
import * as bitcoin from 'bitcoinjs-lib';

import { MAX_LABEL_CHAR_COUNT, MAX_MESSAGE_CHAR_COUNT, MAX_REQ_AMOUNT, MIN_REQ_AMOUNT } from "./constants"

const FormSchema = z.object({
  recipientAddress: z.string().refine(val => {
    try {
      return bitcoin.address.toOutputScript(val, bitcoin.networks.testnet) //check if address valid for testnet
    } catch (error) {
      if (error)
        return false
    }
  }, {
    message: "This testnet bitcoin address is not valid",
  }),
  amount: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number()
        .gte(MIN_REQ_AMOUNT, { message: `Minimum request is ${MIN_REQ_AMOUNT} BTC` })
        .lte(MAX_REQ_AMOUNT, { message: `Maximum request is ${MAX_REQ_AMOUNT} BTC` })
        .nonnegative({ message: "Request cannot be negative" })
    ),
  label: z.string().max(MAX_LABEL_CHAR_COUNT, { message: `Maximum ${MAX_LABEL_CHAR_COUNT} characters allowed as message` }).optional(),
  message: z.string().max(MAX_MESSAGE_CHAR_COUNT, { message: `Maximum ${MAX_MESSAGE_CHAR_COUNT} characters allowed as message` }).optional()
})

export default FormSchema
