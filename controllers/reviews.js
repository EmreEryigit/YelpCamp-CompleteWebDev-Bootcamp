const Review = require('../models/review');
const Campground = require('../models/campground');
module.exports.createReview = async(req,res) => {
    const {id} = req.params
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review)
    review.author = req.user.id
    campground.reviews.push(review);
    await campground.save();
    await review.save()
    req.flash("success", "Succesfully made a new review!")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req,res) => {
    const {id, reviewid} = req.params
    await Campground.findByIdAndUpdate(id, {$pull: {reviews:reviewid}})
    await Review.findByIdAndDelete(reviewid)
    req.flash("success", "Succesfully deleted a review!")
    res.redirect(`/campgrounds/${id}`)

}