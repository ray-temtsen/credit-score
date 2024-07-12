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

## Building
Build using Hardhat:
```sh
npx hardhat compile
npx hardhat typechain

## Testing
Run unit tests using Hardhat:
```sh
npx hardhat test
