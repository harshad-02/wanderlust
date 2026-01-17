import express from "express";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import { listingSchema } from "../schema.js";
import { upload , isLoggedIn, isOwner } from "../middleware.js";
import * as listingController from "../controllers/listings.js";

const router = express.Router();

/* ================= VALIDATION ================= */

const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

/* ================= ROUTES ================= */

// INDEX (public)
router.get("/", wrapAsync(listingController.index));

// NEW (login required)
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE (login required)
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"), //multer
  validateListing,
  wrapAsync(listingController.createListing)
);

// SHOW + UPDATE + DELETE
router
  .route("/:id")

  // SHOW (public)
  .get(wrapAsync(listingController.showListing))

  // UPDATE (login + owner)
  .put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing)
  )

  // DELETE (login + owner)
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing)
  );

// EDIT FORM (login + owner)
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

export default router;
