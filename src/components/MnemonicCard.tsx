"use client"
import { generateMasterKey, revealMnemonic } from "@/app/actions"
import React, { useEffect, useState } from "react"

const MnemonicCard = () => {
  const [mnemonicPhrase, setMnemonicPhrase] = useState<null | string>(null)
  const [revealLoading, setRevealLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const { setUpSuccess, failureReason } = await generateMasterKey()
      //TODO add toast

      if (!setUpSuccess) {
        throw new Error(failureReason)
      }
    }
    getData()
  }, [])

  const onRevealRequest = async () => {
    if (!mnemonicPhrase) {
      setRevealLoading(true)
      const response = await revealMnemonic()
      if (response) {
        setRevealLoading(false)
        setMnemonicPhrase(response)
      }
    } else {
      setMnemonicPhrase(null)
    }
  }

  const content = mnemonicPhrase
    ? mnemonicPhrase
    : revealLoading
    ? "Loading"
    : "Hidden"
  return (
    <>
      <div>
        mnemoic:
        {content}
      </div>
      <button onClick={onRevealRequest}>Reveal Phrase</button>
    </>
  )
}

export default MnemonicCard
