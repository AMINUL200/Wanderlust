const express = require("express");
const router = express.Router({mergeParams: true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wraoAsync.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")

const reviewController = require("../controllers/reviews.js");





// Reviews route: Post route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Delete Review route: delete route:

router.delete(
  "/:reviewId",
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;