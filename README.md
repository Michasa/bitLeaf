Bitleaf

<img src="./public/images/logo.png" alt="Bitleaf logo" width="100" style="float: left; display: block; margin: 30px; "/> "_Bitleaf, your friends will pay you back... right?_"

**A pun-inspired Bitcoin TestNet HD wallet web application that enables users to:**

- ✅ Create extended (testnet) Bitcoin wallets from a mnemonic-derived HD seed (_like a tree, hence the leaf pun haha_).
- ✅ Generate shareable payment requests via QR codes.
- 🟧 Poll for payments on the blockchain (not completed yet; please see [this branch](https://github.com/Michasa/bitLeaf/tree/try-websocket) for an attempt).

## Installation

### Prerequisites

- Node.js (version specified in .nvmrc, install with nvm use)
- npm

### Setup

1. Clone a local version.
2. Use the correct Node.js version:

bash
nvm use

3. Install dependencies:

bash
npm install

4. Set up environment variables:

   - Copy .envcopy and rename it to .env.
   - Fill in the required environment variables (as the application will crash without these):

     - SECRET_PASSWORD=""

       > This is the password used to store and encrypt a session cookie created by iron-session. It **must** be 32 characters long. Create your own or generate one [here](https://1password.com/password-generator).

     - SECRET_XPRIV_PASSWORD=""

       > This is the password used by iron-session to _'seal'_ and _unseal_ a newly created wallet's xpriv (extended wallet private key). It’s also recommended to make it 32 characters long.

### Configuration

The application's core settings can be modified in src/lib/constants.ts, including:

- Maximum wallet creation limits
- Minimum and maximum payment request amounts
  - _This is set to 1 Satoshi because anything lower would make high gas fees uneconomical._
- Character limits for labels and messages

## Running the Application

### Development Mode

bash
npm run dev

### Production Build

bash
npm run start

## Usage Guide

> 📝 Note: **There is NO persistence yet (i.e., an external database) in this app. Everything is per session.**

Closing or refreshing the browser erases wallet references but not the wallet or its funds. To retain access, save the mnemonic, public address, and xprivate keys for created wallets.

### Initial Setup

1. When you first load the application, you'll be presented with a mnemonic phrase.
2. Click the "Reveal Phrase" button to view and copy your mnemonic.

   > ⚠️ **Important**: This mnemonic phrase is used to create the seed from which ALL wallets are derived. Knowing this, along with the derivation paths, provides access to them.

   > Remember: _Not your keys, not your coins_ 😘💸

### Creating a Wallet

1. Click the "Create a New Wallet" button.
2. Your new wallet will appear in the wallet list (desktop) or dropdown (mobile).
3. Select the wallet to view available actions:
   - Create payment requests
   - Delete a wallet

### Creating Payment Requests

1. Click the "Create Payment Request" button.
2. Fill in the request form:
   - Select the receiving address (defaults to the currently selected wallet).
   - Enter a requested amount between 1 Satoshi (0.0001 BTC) and 10 testnet Bitcoin.
   - Optional: Add a label and/or message to the payment.
3. Submit the form to generate a QR code.
4. This QR code can then be scanned and opened by an app. I suggest/used [this one](https://bitcoin.org/en/wallets/mobile/ios/green/) on my phone.
5. The payment request will be saved and displayed in the payment requests table.

### Managing Payment Requests

- View all payment requests in the payment table.
- Access QR codes, labels, and messages for each request by clicking the See QRCode button next to it.

# Improvements ✨

I built this with a _"build fast, fix it, and then improve it"_ incremental approach, so I didn’t have time to add everything I wanted, but here is how it could be improved:

**Security enhancements**

- Implement a login system with password authentication for additional security.
- Add encrypted storage of sensitive information (mnemonics, private keys) in a secure external database instead of on the server or in cookies.
- Instead of incrementally generating a derivation path, the index number would be chosen randomly to make it harder to guess.

**Real-time features**

- Implement WebSocket integration for real-time payment status updates.
- Show live polling for transactions with loading icons and confirmation toasts.

**Code organisation**

- Make the dialog reusable across the app to stop duplicaton.

**User experience**

- ~~Enhance the wallet deletion flow with clear warning messages about the loss of data retention but not destruction of wallets.~~
- Ability to delete payment requests from the payment table.
- Enhance the payment table with sorting and filtering capabilities (e.g., filter by pending/completed status or by wallet address).
- Integrate a currency conversion feature on payment requests for BTC to fiat.
- Add a gas fees estimator to know if a request is economically viable.
- Add social media integration to make QR code sharing easier.
- Review and improve application a11y.

Thank you for reading! <3

---

#### Attributions

- _Logo and project images created with a text-to-image [model](https://huggingface.co/alvdansen/softpasty-flux-dev) for non-commercial purposes_

---
