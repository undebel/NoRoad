const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make node serve the files of our app in React.
app.use(express.static(path.resolve(__dirname, '../client/build')));

const userRoutes = require("./routes/user");

app.use("/api", userRoutes);

// All GET requests that we have not handled will return our React app.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;