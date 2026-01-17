import Listing from "../models/listing.js";
import Review from "../models/review.js";
import ExpressError from "../utils/ExpressError.js";

/* ================= REVIEW CONTROLLERS ================= */

// CREATE REVIEW
export const createReview = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  const review = new Review(req.body.review);

  // 🔴 SET REVIEW OWNER
  review.owner = req.user._id;

  await review.save();

  listing.reviews.push(review);
  await listing.save();

  req.flash("success", "Review added!");
  res.redirect(`/listings/${id}`);
};

// DELETE REVIEW
export const deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
};
