if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

// console.log(process.env.SECRET)


const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate");
//const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js")
const { listingSchema, reviewSchema } = require("./Schema.js");
const Review = require("./models/review.js");

const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const User = require("./models/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const listingRouter = require("./routes/listing.js")
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js");


// let MONGO_URL = ("mongodb://127.0.0.1:27017/wanderlust")
const dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(dbUrl);
}

main().then(() => {
    console.log("connected to db");
}).catch((err) => {
    console.log(err);
})

app.set("views engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("Error in a Mongo session store", err);
})



const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }

};







// app.get("/", (req, res) => {
//     // res.send("Hi i  am root")
// });


app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    res.locals.currUser = req.user
    //console.log(res.locals.success)
    next();
})

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter)


app.use((req, res, next) => {
    next(new ExpressError(404, "page not found"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wromg" } = err;
    if (err.name === "ValidationError") {
    }
    res.status(statusCode).render("error.ejs", { message });
});

app.listen(8080, () => {
    console.log("app is listening to 8080");
});







// router.get("/clean", async (rq, res) => {
//     let listings = await Listing.find({});
//     for (let listing of listings) {
//         listing.reviews = listing, reviews.filter(r => r != null);
//         await listing.save();
//     }

//     await Review.deleteMany({ author: null });
//     await Review.deleteMany({ author: { $exits: flase } })
//     res.send('cleaned');
// })


// app.use("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student"
//     })

//     let registeredUser = await User.register(fakeUser, "helloWorld")
//     res.send(registeredUser);
// })




// const validateListing = (req, res, next) => {
//     let { error } = listingSchema.validate(req.body);
//     if (error) {
//         let errMsg = error.details.map((el) => el.message).join(" ");
//         throw new ExpressError(400, errMsg)
//     } else {
//         next()
//     }
// }; 

