# On-Chain Credit Score Feature

## Overview
This project implements an on-chain credit score feature for a crypto payment app.

## Smart Contract
The `CreditScore` contract calculates and stores user credit scores based on transaction volume, wallet balance, transaction frequency, transaction mix, and pursuit of new transactions.

### Functions
- `updateTransactionVolume(address, uint256)`
- `updateWalletBalance(address, uint256)`
- `updateTransactionFrequency(address, uint256)`
- `updateTransactionMix(address, uint256)`
- `updateNewTransactions(address, uint256)`
- `getCreditScore(address)`

## Deployment
Deployed the contract on Sepolia testnet.
- `https://sepolia.etherscan.io/address/0x0F8C57da3133f76022AFF50BD44ff7A069A64E43`

### Starting The API Server
- `yarn install`
- `node server/server.js`

### Building The Contract
- `npx hardhat compile`
- `npx hardhat typechain`

### Testing
- `npx hardhat test`

### API DOC
- `GET /api/credit-score/:address`: Receives the address and returns its Credit Score.


