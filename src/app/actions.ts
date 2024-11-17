'use server'
import { SessionOptions } from "@/lib/session"
import { GenerateMasterKey, SessionData, NewWallet } from "@/lib/types"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import HDKey from 'hdkey'
import { getIronSession, sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import * as bitcoin from 'bitcoinjs-lib';

const D_PATH_TEMPLATE = "m/44'/1'/0'/"

async function getSession() {
  return await getIronSession<SessionData>(await cookies(), SessionOptions)
}

export async function generateMasterKey(): Promise<GenerateMasterKey> {
  const CREATION_FAIL_MSG = "Could not create HD-Wallet Seed. Please try again and allow Cookies"

  if (process.env.SECRET_PASSWORD === undefined) {
    throw new Error("SECRET_PASSWORD is not defined");
  }

  try {
    const mnemonic = generateMnemonic()
    const seed = mnemonicToSeedSync(mnemonic).toString("hex")

    if (!mnemonic || !seed) {
      return { setUpSuccess: false, failureReason: CREATION_FAIL_MSG };
    }

    //Save to session
    const session = await getSession()
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

export async function revealMnemonic(): Promise<SessionData['mnemonic']> {
  const session = await getSession()

  if (session.mnemonic) {
    return session.mnemonic
  } else {
    throw new Error("Could not find mnemonic");
  }

}

export async function createXWallet(): Promise<NewWallet | undefined> {
  try {
    const session = await getSession()
    const seed = session.seed

    const derivationPath = D_PATH_TEMPLATE + Number(session.pathIndex)

    const masterKey = HDKey.fromMasterSeed(Buffer.from(seed, 'hex'))
    const xWallet = masterKey.derive(derivationPath)

    if (!xWallet) {
      throw new Error("Could not create extended wallet");
    }

    session.pathIndex = session.pathIndex + 1
    await session.save()

    const xprivSealed = await sealData(xWallet.privateExtendedKey, { password: process.env.SECRET_XPRIV_PASSWORD as string })

    const xpubBuffer = new Uint8Array(xWallet.publicKey as Buffer)

    const { address } = bitcoin.payments.p2wpkh({ pubkey: xpubBuffer, network: bitcoin.networks.testnet });

    if (!address) {
      throw new Error("Could not create public address for this wallet");
    }

    return {
      address: address,
      xpriv: 'hidden',
      xprivSealed
    }
  } catch (error) {
    console.error(error) //TODO Improve this?
  }
}

export async function revealXPriv(xprivSealed: string): Promise<NewWallet['xpriv']> {
  const answer = await unsealData<string>(xprivSealed, { password: process.env.SECRET_XPRIV_PASSWORD as string })


  if (!answer) {
    throw new Error("Could not decrypt this private key");
  }

  return answer
}
