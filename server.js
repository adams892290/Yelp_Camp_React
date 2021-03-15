

const express = require("express");
const app = express();
const cors = require("cors");
const Campground = require("./models/campground");
const mongoose = require("mongoose");
const dbUrl = process.env.DB_URI || "mongodb://localhost:27017/yelpcampreact";
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });
const dataUri = require("datauri/parser");
const path = require("path");
const { cloudinary } = require("./cloudinary");
const Review = require("./models/review");
const bcrypt = require("bcrypt");
const User = require("./models/user");
const jwt = require("jsonwebtoken");


mongoose.connect(dbUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const secret = "thisisnotagoodsecret";


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("The server is up and runnning");
});


app.get("/campground", async function (req, res) {
    const allCampgrounds = await Campground.find({});
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
            foundUser[0].token = token;
            await foundUser[0].save();
            res.status(200).json({ allCampgrounds, token, user_id: foundUser[0]._id });
        } else {
            res.status(200).json({ allCampgrounds, user_id: null });
        }
    } else
        res.status(200).json({ allCampgrounds, user_id: null });
});

app.post("/campground", upload.array("image"), async function (req, res) {
    const { title, location, description } = req.body;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const urlArr = [];
            const public_idArr = [];
            const dUri = new dataUri();
            for (const ele of req.files) {
                const file = dUri.format(path.extname(ele.originalname).toString(), ele.buffer);
                const result = await cloudinary.uploader.upload(file.content, { folder: "Yelp Camp React" });
                urlArr.push(result.url.replace("upload", "upload/w_250,h_200"));
                public_idArr.push(result.public_id);
            }
            const newCampground = new Campground({ title, location, description, image: urlArr, public_id: public_idArr, author: foundUser[0] });
            await newCampground.save();
            const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
            foundUser[0].token = token;
            await foundUser[0].save();
            res.status(200).json({ token });
        }
        else {
            res.status(200).json({ message: "login to continue" });
        }
    }
    else {
        res.status(200).json({ message: "login to continue " });
    }


});

app.get("/campground/:id", upload.fields([]), async function (req, res) {
    const { id } = req.params;
    const token = req.get("authorization");
    const foundCampground = await Campground.findById(id);
    const foundReviews = await Review.find({ "_id": { $in: foundCampground.review } }).populate("author");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
            foundUser[0].token = token;
            await foundUser[0].save();
            res.status(200).json({ foundCampground, foundReviews, user_id: foundUser[0]._id, token });
        } else
            res.status(200).json({ foundCampground, foundReviews, user_id: null });
    } else
        res.status(200).json({ foundCampground, foundReviews, user_id: null });
});

app.get("/campground/edit/:id", upload.fields([]), async function (req, res) {
    const { id } = req.params;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundCampground = await Campground.findById(id);
            if (foundUser[0]._id.trim === foundCampground.author.trim) {
                const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
                foundUser[0].token = token;
                await foundUser[0].save();
                res.status(200).json({ foundCampground, user_id: foundUser[0]._id, token });
            } else {
                res.status(200).json({ message: "you are not permitted to perform this action" });
            }
        } else {
            res.status(200).json({ message: "login to continue" });
        }
    } else {
        res.status(200).join({ message: "login to continue" });
    }
});

app.patch("/campground/:id", upload.fields([]), async function (req, res) {
    const { id } = req.params;
    const { title, location, description } = req.body;
    const token = req.get("authorization");
    if (token) {

        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundCampground = await Campground.findById(id);
            if (foundCampground.author.trim === foundUser[0]._id.trim) {
                foundCampground.title = title;
                foundCampground.location = location;
                foundCampground.description = description;
                await foundCampground.save();
                const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
                foundUser[0].token = token;
                await foundUser[0].save();
                res.status(200).json({ user_id: foundUser[0]._id, token });
            } else {
                res.status(200).json({ message: "you are not permitted to perform this action", user_id: foundUser[0]._id, token });
            }

        } else {
            res.status(200).json({ message: "login to continue" });
        }
    } else {
        res.status(200).json({ message: "login in to continue" });
    }
});

app.delete("/campground/:id", async function (req, res) {
    const { id } = req.params;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundCampground = await Campground.findById(id);
            if (foundCampground.author.trim === foundUser[0]._id.trim) {
                await Campground.findByIdAndDelete(id);
                const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
                foundUser[0].token = token;
                await foundUser[0].save();
                res.status(200).json({ user_id: foundUser[0]._id, token });
            } else {
                res.status(200).json({ message: "you are not permitted to perform this action", user_id: foundUser[0]._id, token })
            }
        } else {
            res.status(200).json({ message: "login to perform this action" });
        }
    } else {
        res.status(200).json({ message: "login to perform this action" });
    }
});



app.post("/campground/:id/review", upload.fields([]), async function (req, res) {
    const { id } = req.params;
    const { rating, review } = req.body;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundCampground = await Campground.findById(id);
            let newReview = new Review({ rating, review, author: foundUser[0]._id });
            await newReview.save();
            newReview = await Review.findById(newReview._id).populate("author");
            foundCampground.review.push(newReview);
            await foundCampground.save();
            const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
            foundUser[0].token = token;
            await foundUser[0].save();
            res.status(200).json({ user_id: foundUser[0]._id, token, newReview });
        } else {
            res.status(200).json({ message: "login to poat a review" });
        }
    } else {
        res.status(200).json({ message: "login to post a review" });
    }
});

app.patch("/campground/review/:reviewId", upload.fields([]), async function (req, res) {
    const { reviewId } = req.params;
    const { rating, review } = req.body;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundReview = await Review.findById(reviewId);
            if (foundReview.author.trim === foundUser[0]._id.trim) {

                const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, review }, { new: true });
                const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
                foundUser[0].token = token;
                await foundUser[0].save();
                res.status(200).json({ user_id: foundUser[0]._id, token, updatedReview });
            } else {
                res.status(200).json({ message: "you are not permitted to perform this action" });
            }
        } else {
            res.status(200).json({ message: "login to perform this action" });
        }
    } else {
        res.status(200).json({ message: "login to perform this action" });
    }
});

app.delete("/campground/:camp_id/review/:review_id", async function (req, res) {
    const { camp_id, review_id } = req.params;
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            const foundReview = await Review.findById(review_id);
            if (foundReview.author.trim === foundUser[0]._id.trim) {
                await Review.findByIdAndDelete(review_id);
                const foundCampground = await Campground.findById(camp_id);
                foundCampground.review.splice(foundCampground.review.indexOf(review_id), 1);
                await foundCampground.save();
                const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
                foundUser[0].token = token;
                await foundUser[0].save();
                res.status(200).json({ user_id: foundUser[0]._id, token });
            } else {
                res.status(200).json({ message: "you are not permitted to perform this action" });
            }
        } else {
            res.status(200).json({ message: "login to perform this action" });
        }
    } else {
        res.status(200).json({ message: "login to perform this action" });
    }
});

app.post("/login", upload.fields([]), async function (req, res) {
    const { email, password } = req.body;
    const foundUser = await User.find({ email });
    if (foundUser[0]) {
        const result = await bcrypt.compare(password, foundUser[0].hash);
        if (result) {
            const token = jwt.sign({ user_id: foundUser[0]._id }, secret);
            foundUser[0].token = token;
            await foundUser[0].save();
            res.status(200).json({ token, user_id: foundUser[0]._id });
        } else {
            res.status(200).json({ message: "Incorrect username or password" });
        }
    } else {
        res.status(200).json({ message: "No user found" });
    }
});

app.post("/register", upload.fields([]), async function (req, res) {
    const { email, password, username } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newUser = new User({ email, hash, username });
    const token = jwt.sign({ user_id: newUser._id }, secret);
    newUser.token = token;
    await newUser.save();
    res.status(200).json({ token, user_id: newUser._id });
});

app.get("/verifytoken", async function (req, res) {
    const token = req.get("authorization");
    if (token) {
        const foundUser = await User.find({ token });
        if (foundUser[0]) {
            res.status(200).json({ token, user_id: foundUser[0]._id });
        } else
            res.status(200).json({ message: "Oops! You are not logged in" });
    } else {
        res.status(200).json({ message: "Oops! You are not logged in" });
    }
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    })
}