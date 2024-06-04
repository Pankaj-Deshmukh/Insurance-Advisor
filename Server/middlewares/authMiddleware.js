require('dotenv').config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = "KALYAN";
const authMiddleware = async(req, res, next) => {
      console.log(req.headers);
      const authToken = req.headers.authorization;
      console.log(authToken);
      if(!authToken || !authToken.startsWith("Bearer ")) {
            console.log(authToken);
            return res.status(204).json({
                  message: "wrong auth token"
            });
      }
      
      const Token = authToken.split(" ")[1];
      try {
            const verifyedToken = await jwt.verify(Token,process.env.JWT_SECRET);
            req.id = verifyedToken.id;
            next();

      }catch (err) {
            console.log(err);
            return res.status(204).json({
                  message: "You are not verifyed"
            });
      }
}

module.exports = authMiddleware;