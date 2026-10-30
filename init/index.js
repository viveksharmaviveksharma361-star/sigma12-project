const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async () => {
    await Listing.deleteMany({});
    // for owner
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '6ac07e3e4dbdde1fd03e309f' }))
    // image: {
    //     url: typeof obj.image === 'string' ? obj.image : obj.image.url
    // }


await Listing.insertMany(initData.data);
console.log("data initialized");
}



initDB();