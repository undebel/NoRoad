const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(cors());
// Parse the body of the request in JSON format.
app.use(express.json());

// Make node serve the files of our app in React.
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Sets the API paths and relates them to the corresponding routes.
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const roomRoutes = require("./routes/room");
const messageRoutes = require("./routes/message");

app.use("/api", userRoutes);
app.use("/api", loginRoutes);
app.use("/api", roomRoutes);
app.use("/api", messageRoutes);

// All GET requests that we have not handled will return our React app.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;