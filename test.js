require("dotenv").config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
console.log("testting with:",process.env.CLOUD_NAME);
cloudinary.api.ping((error, result) => {
    if(error){
        console.log("Failed - Key is wrong", error.message);
    } else {
        console.log("Success - cloudinary connected", result);
    }
});