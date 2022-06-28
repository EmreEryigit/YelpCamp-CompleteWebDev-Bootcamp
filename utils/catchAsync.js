// module.exports = function catchAsync (fn) {
//     return function(err,req,res,next) {
//         fn(err,req,res,next).catch(e => next(e))
//     }
// }

module.exports = fn => {
    return (req,res,next) => {
        fn(req,res,next).catch(next);
    }
}