import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from "./utils/ExpressError.js";
import session from "express-session";
import flash from "connect-flash";

import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./models/user.js";

import userRoutes from "./routes/user.js";
import listings from "./routes/listing.js";
import reviewRoutes from "./routes/review.js";

const app = express();
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

/* ---------------- __dirname fix ---------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ---------------- VIEW ENGINE ---------------- */
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* ---------------- BASIC MIDDLEWARE ---------------- */
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

/* ---------------- SESSION ---------------- */
const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash());

/* ---------------- PASSPORT ---------------- */
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* ---------------- GLOBAL LOCALS (⭐ IMPORTANT) ---------------- */
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success") || [];
  res.locals.error = req.flash("error") || [];
  next();
});

/* ---------------- DATABASE ---------------- */
await mongoose.connect(MONGO_URL);
console.log("Connected to DB");

/* ---------------- ROUTES ---------------- */
app.get("/", (req, res) => {
  res.send("Root working");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/", userRoutes);


//===============Temporary=============>
app.use((req, res, next) => {
  console.log("➡️ Requested URL:", req.originalUrl);
  next();
});
// ====================================>

  
/* ---------------- 404 ---------------- */
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});


/* ---------------- SERVER ---------------- */
app.listen(8080, () => {
  console.log("Server running on port 8080");
});
