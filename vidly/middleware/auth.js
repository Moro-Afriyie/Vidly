const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decodedToken = jwt.verify(token, "jwtPrivateKey");
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(400).send("invalid token");
  }
};

module.exports = { auth };
