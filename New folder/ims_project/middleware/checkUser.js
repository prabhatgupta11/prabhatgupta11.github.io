
module.exports = (req, res, next) => {

    if (req.session.isLoggedIn) {
        next()
    } else {
        req.flash('message', 'Please login first');
        res.redirect('/')
    }
}



