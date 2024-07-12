require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { apiKeyMiddleware } = require("./middlewares/api-key.middleware");
const ethers = require("ethers").ethers;
const CreditScoreABI = require("../artifacts/contracts/CreditScore.sol/CreditScore.json").abi;
const { INFURA_API_KEY, SERVER_PORT, CONTRACT_ADDRESS, PRIVATE_KEY } = process.env;


// Connect to Infura
const infuraUrl = `https://sepolia.infura.io/v3/${INFURA_API_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(infuraUrl);
//wallet
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
 // Load contract instance
 const contract = new ethers.Contract(CONTRACT_ADDRESS, CreditScoreABI, wallet);


// Express app
const app = express();
app.use(bodyParser.json());
const router = express.Router();

app.use('/api', router);

// Minimal AUthentication
app.use('/api', apiKeyMiddleware);

//routes
router.get("/credit-score/:address", async (req, res) => {
    try {
        const address = req.params.address;
        if (!ethers.utils.isAddress(address)) {
            return res.status(400).json({ error: 'Invalid Address' });
        }
        const score = await contract.getCreditScore(address);
        res.status(200).json({ creditScore: score.toString() });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});
//404 Fail Safe
router.use((_, res) => {
    return res.status(404).json({ error: 'Route not found' });
});
app.use(router);
app.listen(SERVER_PORT, () => {
    console.log(`Server running on URL http://localhost:${SERVER_PORT}/api`);
});
