const admin = (req, res, next) => {
  // we have access to req.user
  if (!req.user.isAdmin) return res.status(403).send("Access denied");
  next();
};

module.exports = { admin };
