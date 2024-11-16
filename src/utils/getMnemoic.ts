import { generateMnemonic } from 'bip39'

const getMnemonic = async () => {
  const phrase = generateMnemonic()

  return Response.json({
    message: "Hello World", phrase
  })
}

export default getMnemonic
