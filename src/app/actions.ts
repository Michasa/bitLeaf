'use server'
import { SessionOptions } from "@/lib/session"
import { SessionData } from "@/lib/types"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import { getIronSession } from "iron-session"
import { cookies } from "next/headers"

type GenerateMasterKey = { setUpSuccess: true; failureReason: null } | { setUpSuccess: false; failureReason: string }

export async function generateMasterKey(): Promise<GenerateMasterKey> {
  const CREATION_FAIL_MSG = "Could not create HD-Wallet Seed. Please try again and allow Cookies"

  if (process.env.SECRET_PASSWORD === undefined) {
    throw new Error("SECRET_PASSWORD is not defined");
  }

  try {
    const session = await getIronSession<SessionData>(
      await cookies(),
      SessionOptions
    )

    const mnemonic = generateMnemonic()
    const seed = mnemonicToSeedSync(mnemonic).toString("hex")

    if (!mnemonic || !seed) {
      return { setUpSuccess: false, failureReason: CREATION_FAIL_MSG };
    }

    //Save to session
    session.mnemonic = mnemonic
    session.seed = seed
    session.pathIndex = 0
    await session.save()

    return {
      setUpSuccess: true, failureReason: null
    }
  } catch (error) {
    return { setUpSuccess: false, failureReason: `Error: ${error}` };
  }

}

export async function revealMnemonic() {
  const session = await getIronSession<SessionData>(
    await cookies(),
    SessionOptions
  )
  if (session.mnemonic) {
    return session.mnemonic
  } else {
    throw new Error("Could not find mnemonic");
  }

}

