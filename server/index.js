const mongoose = require("mongoose");
const app = require("./app");
const port = 3001;
const urlMongoDB = "mongodb://localhost:27017/noroad";

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