const NodeRSA = require("node-rsa");
const crypto = require("crypto");

/**
 * Generate a pair of RSA keys.
 * @returns The public key and the private key as an object.
 */
const generateRSAKeys = () => {
    const key = new NodeRSA({b: 2048});

    key.generateKeyPair();

    const publicKey = key.exportKey("pkcs1-public-pem");
    const privateKey = key.exportKey("pkcs1-private-pem");

    return { publicKey, privateKey };
};

/**
 * Cipher a string to a SHA256 has.
 * @param {string} password 
 * @returns The ciphered hash.
 */
const toSHA256 = (password) => {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
};

module.exports = { generateRSAKeys, toSHA256 };