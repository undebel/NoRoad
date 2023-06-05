const Message = require("../models/message");

/**
 * Handle to create a new message request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const createMessage = async (req, res) => {
    const { isBackup, message } = req.body;

    if (!message) {
        return res.status(400).send({ msg: "Message is required." });
    }

    try {
        const newMessage = new Message({ isBackup, message });
        const savedMessage = await newMessage.save();

        res.status(200).send(savedMessage);
    } catch (error) {
        res.status(500).send({ msg: "Error creating message.", error: error.message });
    }
}

/**
 * Handle to get all messages request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ msg: "Error fetching messages.", error: error.message });
    }
}

/**
 * Handle to get a message request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const getMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Message.findById(messageId);

        if (!message) {
            res.status(404).send({ msg: "Message not found." });
        } else {
            res.status(200).send(message);
        }
    } catch (error) {
        res.status(500).send({ msg: "Error fetching message.", error: error.message });
    }
}

/**
 * Handle to delete message request in MongoDB.
 * @param {Object} req 
 * @param {Object} res 
 * @returns Send response to the client.
 */
const deleteMessage = async (req, res) => {
    const messageId = req.params.id;

    try {
        const message = await Message.findByIdAndDelete(messageId);

        if (!message) {
            res.status(404).send({ msg: "Message not found." });
        } else {
            res.status(200).send({ msg: "Message successfully deleted." });
        }
    } catch (error) {
        res.status(500).send({ msg: "Error deleting message.", error: error.message });
    }
}

module.exports = { createMessage, getMessages, getMessage, deleteMessage };