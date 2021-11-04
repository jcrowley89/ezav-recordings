module.exports = (policy) => {
    return (req, res, next) => {
        if (policy === "anyAdmin") {
            if (req.user.role === "admin" || req.user.role === "developer") {
                next();
            }
        } else {
            res.status(403).end();
        }
    }
}