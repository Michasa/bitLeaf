"use client"

import { z } from "zod"
import * as bitcoin from 'bitcoinjs-lib';

import { MAX_MESSAGE_CHAR_COUNT, MAX_REQ_AMOUNT, MIN_REQ_AMOUNT } from "./constants"

const FormSchema = z.object({
  recipientAddress: z.string().refine(val => {
    try {
      return bitcoin.address.toOutputScript(val, bitcoin.networks.testnet) //check if address valid for testnet
    } catch (error) {
      if (error)
        return false
    }
  }, {
    message: "This bitcoin testnet address is not valid",
  }),
  amount: z
    .preprocess(
      (val) => (typeof val === "string" ? Number(val) : val),
      z.number()
        .gte(MIN_REQ_AMOUNT, { message: `Minimum request is ${MIN_REQ_AMOUNT} BTC` })
        .lte(MAX_REQ_AMOUNT, { message: `Maximum request is ${MAX_REQ_AMOUNT} BTC` })
        .nonnegative({ message: "Amount cannot be negative" })
    ),
  label: z.string().max(MAX_MESSAGE_CHAR_COUNT, { message: `Maximum ${MAX_MESSAGE_CHAR_COUNT} characters allowed as message` }).optional()
})

export default FormSchema
