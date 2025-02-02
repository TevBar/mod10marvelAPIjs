const CryptoJS = require("crypto-js");

function generateHash(publicKey, privateKey) {
  const timestamp = new Date().getTime(); // Get current timestamp
  const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString(CryptoJS.enc.Hex);
  return { timestamp, hash };
}

// Replace with your actual keys
const publicKey = '7970b2e25bb9ff24d40a3e091e77a80d';
const privateKey = 'cf3a7569c0b7b21407003f2ed1299f2e0775d2ff';

const { timestamp, hash } = generateHash(publicKey, privateKey);

console.log(`Timestamp: ${timestamp}`);
console.log(`Hash: ${hash}`);
