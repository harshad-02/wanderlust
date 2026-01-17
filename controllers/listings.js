import Listing from "../models/listing.js";

/* ================= CONTROLLERS ================= */

// INDEX – show all listings
export const index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// NEW – render form
export const renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE – save listing
export const createListing = async (req, res) => {
  const listing = new Listing(req.body.listing);

  listing.owner = req.user._id;

  // 🔥 CLOUDINARY IMAGE
  listing.image = {
    url: req.file.path,
    filename: req.file.filename,
  };

  await listing.save();
  req.flash("success", "Listing created!");
  res.redirect("/listings");
};


// SHOW – single listing
export const showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("owner") // listing owner
    .populate({
      path: "reviews",
      populate: {
        path: "owner",
        model: "User",
      },
    });

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// EDIT – render edit form
export const renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }

  res.render("listings/edit.ejs", { listing });
};

// UPDATE – save changes
export const updateListing = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
  req.flash("success", "Listing updated!");
  res.redirect(`/listings/${req.params.id}`);
};

// DELETE – remove listing
export const deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id);
  req.flash("success", "Listing deleted!");
  res.redirect("/listings");
};
