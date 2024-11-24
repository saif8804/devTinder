const adminAuth =  (req, res, next) => {
    // Authorise a token
  
    const token = "xyz";
    const isAdminAuthorize = token === "xyz";
  
    if (!isAdminAuthorize) {
      res.status(401).send("unauthorized token");
    } else {
      next();
    }
  }

  module.exports = {adminAuth};