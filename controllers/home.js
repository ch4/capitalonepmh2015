/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    if (req.user) {
        res.render('home-loggedin', {
            title: 'Home',
            loggedin: true
        });
    } else {
        res.render('home', {
            title: 'Home'
        });
    }
};