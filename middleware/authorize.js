module.exports = (policy) => {
    return (req, res, next) => {
        if (policy === "anyAdmin") {
            console.log(req.user.role)
            if (req.user.role === "admin" || req.user.role === "developer") {
                return next();
            }
            return res.status(403).json({msg: "Not authorized"}).end();
        } else {
            // More stuff here
        }
    }
}