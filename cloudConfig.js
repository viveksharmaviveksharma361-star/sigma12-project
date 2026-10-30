// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET,
// })


// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'wanderlust-DEV',
//         allowedFormats: ["jpg", "png", "jpeg"]
//         //public_id: (req, file) => 'computed-filename-using-request',
//     },
// });


// module.exports = {
//     cloudinary,
//     storage
// }


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
})
module.exports = { storage };