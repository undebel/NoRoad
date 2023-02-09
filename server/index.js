const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3001;

const hostMongoDB = process.env.MONGO_DB || "localhost";
const urlMongoDB = `mongodb://${hostMongoDB}:27017/noroad`;

mongoose.set("strictQuery", false);

mongoose.connect(urlMongoDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    (err, res) => {
    try {
        if (!err) {
            console.log("Connected to MongoDB");

            app.listen(port, () => {
                console.log(`Server listening on ${port}`);
            });
        }
        else {
            throw err;
        }
    }
    catch (error) {
        console.error(error);
    }
});