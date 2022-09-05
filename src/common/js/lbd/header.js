import axios from "axios";
import { generateRandomString } from './randomStr.js';
// import Dotenv from 'dotenv';

// Header 정보
const apiKey = process.env.VUE_APP_SERVICE_API_KEY;
const apiSecret = process.env.VUE_APP_SERVICE_API_SECRET;
const walletAddress = process.env.VUE_APP_WALLET_ADDRESS;
const walletSecret = process.env.VUE_APP_WALLET_ADDRESS_SECRET;
const response = await axios.get(`/v1/time`, { headers: { 'service-api-key': apiKey } })
const timeStamp = response.data.responseTime;
const nonce = generateRandomString(8);

export { walletAddress, walletSecret, apiKey, apiSecret, timeStamp, nonce }