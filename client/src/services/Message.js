import axios from "axios";
import { JSEncrypt } from "jsencrypt";
import CryptoJS from "crypto-js";

const generateRandomAESKey = () => {
    return CryptoJS.lib.WordArray.random(32).toString(); // 32 bytes (256 bits) = AES-256
};

const encryptWithAES = (message, aesKey) => {
    return CryptoJS.AES.encrypt(message, aesKey).toString();
};

const decryptWithAES = (message, aesKey) => {
    const decryptedBytes = CryptoJS.AES.decrypt(message, aesKey);
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
};

const encryptMessage = (publicKey, message) => {
    const aesKey = generateRandomAESKey();

    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    const encryptedAES = encrypt.encrypt(aesKey);
    
    const encryptedMessage = encryptWithAES(message, aesKey);
    
    return `${encryptedAES}$_NoRoad_$${encryptedMessage}`;
};

const decryptMessage = (privateKey, message) => {
    const parts = message.split("$_NoRoad_$");

    const aesEncrypted = parts[0];
    const messageEncrypted = parts[1];

    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    const aesKey =  decrypt.decrypt(aesEncrypted);

    return decryptWithAES(messageEncrypted, aesKey);
};

const createMessage = async (isBackup, message) => {
    const result = await axios.post("/api/message", {
        isBackup,
        message
    });
    return result.data;
};

const addMessageToRoom = async (roomId, messageId, isOwner) => {
    const result = await axios.post(`/api/room/message/${roomId}`, {
        messageId,
        isOwner
    });
    return result.data;
};

const getMessage = async (id) => {
    const result = await axios.get(`/api/message/${id}`);
    return result.data;
};

export { createMessage, addMessageToRoom, getMessage, encryptMessage, decryptMessage };