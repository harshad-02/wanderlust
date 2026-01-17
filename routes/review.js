import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import { reviewSchema } from "../schema.js";
import { isLoggedIn, isReviewOwner } from "../middleware.js";
import * as reviewController from "../controllers/reviews.js";

const router = express.Router({ mergeParams: true });

/* ================= VALIDATION ================= */

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

/* ================= ROUTES ================= */

// CREATE REVIEW
// POST /listings/:id/reviews
router
  .route("/")
  .post(
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
  );

// DELETE REVIEW
// DELETE /listings/:id/reviews/:reviewId
router
  .route("/:reviewId")
  .delete(
    isLoggedIn,
    isReviewOwner,
    wrapAsync(reviewController.deleteReview)
  );

export default router;
