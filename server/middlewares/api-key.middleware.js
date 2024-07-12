// Middleware function to check API key
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;

    // Check if API key is valid
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    // API key is valid, proceed to next middleware or route handler
    next();
};
module.exports = { apiKeyMiddleware };