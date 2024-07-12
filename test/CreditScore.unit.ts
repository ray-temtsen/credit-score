import { ethers } from "hardhat";
import { expect } from "chai";
import { CreditScore } from "../typechain";

describe("CreditScore Unit Tests", function () {
    let creditScore: CreditScore;
    let owner: any;
    let addr1: any;

    before(async function () {
        [owner, addr1] = await ethers.getSigners();
        const CreditScore = await ethers.getContractFactory("CreditScore");
        creditScore = (await CreditScore.deploy()) as unknown as CreditScore;
        await creditScore.deployed();
    });

    it("Should update and get transaction volume", async function () {
        await creditScore.updateTransactionVolume(addr1.address, 100);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(335); // 300 + (100 * 35 / 100)
    });

    it("Should update and get wallet balance", async function () {
        await creditScore.updateWalletBalance(addr1.address, 200);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(360); // 300 + (200 * 30 / 100)
    });

    it("Should update and get transaction frequency", async function () {
        await creditScore.updateTransactionFrequency(addr1.address, 50);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(307); // 300 + (50 * 15 / 100)
    });

    it("Should update and get transaction mix", async function () {
        await creditScore.updateTransactionMix(addr1.address, 40);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(304); // 300 + (40 * 10 / 100)
    });

    it("Should update and get new transactions", async function () {
        await creditScore.updateNewTransactions(addr1.address, 30);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(303); // 300 + (30 * 10 / 100)
    });

    it("Should update all credit parameters", async function () {
        await creditScore.updateTransactionVolume(addr1.address, 100);
        await creditScore.updateWalletBalance(addr1.address, 200);
        await creditScore.updateTransactionFrequency(addr1.address, 50);
        await creditScore.updateTransactionMix(addr1.address, 40);
        await creditScore.updateNewTransactions(addr1.address, 30);
        const score = await creditScore.getCreditScore(addr1.address);
        expect(score).to.equal(392); // Combined calculation
    });
});
