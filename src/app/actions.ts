'use server'
import { SessionOptions } from "@/lib/session"
import { SessionData, NewWallet } from "@/lib/types"
import { generateMnemonic, mnemonicToSeedSync } from "bip39"
import HDKey from 'hdkey'
import { getIronSession, IronSession, sealData, unsealData } from "iron-session"
import { cookies } from "next/headers"
import * as bitcoin from 'bitcoinjs-lib';
import { CANNOT_CREATE_PUB_ADD, CANNOT_DECRYPT, CREATION_FAIL_MSG, NO_MNEMONIC, NO_SECRET_PASSWORD, NO_SEED_FOUND, NO_XWALLET } from "@/lib/errorMessages"

const D_PATH_TEMPLATE = "m/44'/1'/0'/"

async function getSession(): Promise<IronSession<SessionData>> {
  return await getIronSession<SessionData>(await cookies(), SessionOptions)
}

export async function generateMasterKey(): Promise<void> {
  if (process.env.SECRET_PASSWORD === undefined) {
    throw new Error(NO_SECRET_PASSWORD);
  }

  const mnemonic = generateMnemonic()
  const seed = mnemonicToSeedSync(mnemonic).toString("hex")

  if (!mnemonic || !seed) {
    throw new Error(CREATION_FAIL_MSG)
  }

  //Save to session for later access
  const session = await getSession()
  session.mnemonic = mnemonic
  session.seed = seed
  session.pathIndex = 0
  await session.save()
}

export async function revealMnemonic(): Promise<SessionData['mnemonic']> {
  const session = await getSession()
  if (!session.mnemonic) {
    throw new Error(NO_MNEMONIC)
  }
  return session.mnemonic
}

export async function createXWallet(): Promise<NewWallet | void> {
  const session = await getSession()
  if (!session.seed) {
    throw new Error(NO_SEED_FOUND)
  }
  const masterKey = HDKey.fromMasterSeed(Buffer.from(session.seed, 'hex'))

  const derivationPath = D_PATH_TEMPLATE + Number(session.pathIndex)
  const xWallet = masterKey.derive(derivationPath)

  if (!xWallet) {
    throw new Error(NO_XWALLET);
  }

  session.pathIndex = session.pathIndex + 1
  await session.save()

  const xprivSealed = await sealData(xWallet.privateExtendedKey, { password: process.env.SECRET_XPRIV_PASSWORD as string })

  const xpubBuffer = new Uint8Array(xWallet.publicKey as Buffer)

  const { address } = bitcoin.payments.p2wpkh({ pubkey: xpubBuffer, network: bitcoin.networks.testnet });

  if (!address) {
    throw new Error(CANNOT_CREATE_PUB_ADD);
  }

  return {
    created: Date.now(),
    address: address,
    xpriv: 'hidden',
    xprivSealed
  }
}

export async function revealXPriv(xprivSealed: string): Promise<NewWallet['xpriv'] | void> {
  const answer = await unsealData<string>(xprivSealed, { password: process.env.SECRET_XPRIV_PASSWORD as string })

  if (!answer) {
    throw new Error(CANNOT_DECRYPT);
  }

  return answer
}
