// Header 정보
const apiKey = process.env.VUE_APP_SERVICE_API_KEY;
const apiSecret = process.env.VUE_APP_SERVICE_API_SECRET;
const walletAddress = process.env.VUE_APP_WALLET_ADDRESS;
const walletSecret = process.env.VUE_APP_WALLET_ADDRESS_SECRET;
const internalAPIKey = process.env.VUE_APP_INTERNAL_API_KEY;

export { walletAddress, walletSecret, apiKey, apiSecret, internalAPIKey }