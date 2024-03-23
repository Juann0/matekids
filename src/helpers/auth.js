module.exports = {
    estaLaSesion(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    noEstaLaSesion(req, res, next) {
        if (req.user) {
            return res.redirect('/app');
        } else {
            if (!req.isAuthenticated()) {
                return next();
            }
            return res.redirect('/');
        }
    }
};