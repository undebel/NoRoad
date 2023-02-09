const NodeRSA = require("node-rsa");

const generateRSAKeys = () => {
    const key = new NodeRSA({b: 2048});

    key.generateKeyPair();

    const publicKey = key.exportKey("pkcs1-public-pem");
    const privateKey = key.exportKey("pkcs1-private-pem");

    return { publicKey, privateKey };
};

module.exports = { generateRSAKeys };