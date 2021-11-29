const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRETE;

module.exports = (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split("Bearer ")[1];
            if (token) {
                try {
                    const user = jwt.verify(token, secret);
                    return user;
                } catch (err) {
                    res.json({
                        success: false,
                        message: "Invalid/ Expired token"
                    })
                    throw new Error("Invalid/ Expired token");
                }
            }
            res.json({
                success: false,
                message: "Athuntication token must be \' Bearer [token]"
            })
            throw new Error("Athuntication token must be \' Bearer [token]");
        }
        res.json({
            success: false,
            message: "Authorization header must be provided"
        })
        throw new Error("Authorization header must be provided");
    }
    catch (err) {
        console.log(err)
    }
}