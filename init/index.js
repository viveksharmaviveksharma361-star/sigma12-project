const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongo://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        image: typeof obj.image === "string" ? { url: obj.image, filename: "listingimage" } : obj.image
    }));
    await Listing.insertMany(initData.data);
    console.log("data initialized");
    mongoose.connection.close();

};



initDB();