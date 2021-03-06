const express = require('express');
const router = express.Router({mergeParams:true});

const Campground = require('../models/campground');
const ExpressError = require('../utils/ExpressError');
const catchAsync = require('../utils/catchAsync');
const {reviewSchema} = require("../schemas");
const Review = require('../models/review');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware")
const reviews = require("../controllers/reviews")

router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReview))
router.delete("/:reviewid", isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;