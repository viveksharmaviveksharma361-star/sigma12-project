const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");


let MONGO_URL = ("mongodb://127.0.0.1:27017/wanderlust")
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})

app.set("views engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
    res.send("Hi i  am root")
});

//Index Route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({})
    res.render("listings/index.ejs", { allListings });
});


// New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


// Show Route
app.get("/listings/:id", async (req, res) => {
    let id = req.params.id.trim();
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// Create Route
app.post("/listings", async (req, res) => {
    console.log("BODY:", req.body);
    console.log("Listing:", req.body.listing);
    // let{title,description,image, price, country,location} = req.body;
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});


//Update Rout
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

// Delete Route

app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;

    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})

// app.get("/testListing", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My new villa",
//         Description: "By the Beach",
//         price: 1200,
//         location: "Calangute Goa",
//         country: "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });




app.listen(8080, () => {
    console.log("app is listening to 8080");
});

