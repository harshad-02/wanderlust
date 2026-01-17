import ExpressError from "./utils/ExpressError.js";
import Listing from "./models/listing.js";
import Review from "./models/review.js";
import multer from "multer";
import { storage } from "./cloudinary/index.js";

/* ================= AUTHENTICATION ================= */
export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log("Saved returnTo:", req.session.returnTo);
    req.flash("error", "You must be logged in first!");
    return res.redirect("/login");
  }
  next();
};

/* ================= MULTER CONFIG ================= */

export const upload = multer({ storage });

/* ================= AUTHORIZATION ================= */

export const isOwner = async (req, res, next) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing not found");
  }

  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};




export const isReviewOwner = async (req, res, next) => {
  const { reviewId, id } = req.params;

  const review = await Review.findById(reviewId);
  if (!review) throw new ExpressError(404, "Review not found");

  // 🔐 Authorization check
  if (!review.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};