const jwt = require('jsonwebtoken');

module.exports = function authenticateToken(req, res, next)
{
    const authHeader = req.headers['authorization'];

    //Check that header exists
    if (!authHeader)
    {
        return res.status(401).json({message: 'Authorization header is missing'})
    }

    //Extract token
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
    {
        return res.status(401).json({message: "No token exists, authorization denied"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
        if (err)
        {
            console.error('JWT verification error:' , err);
            return res.status(403).json({message: "Invalid token"});
        }

        // Set decoded payload to req
        req.user = user;
        next();

    })
}