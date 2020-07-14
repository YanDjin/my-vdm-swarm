const jwt = require("jsonwebtoken");

const authorization = () => {
  return (req, res, next) => {
    let token = req.header('Authorization');
    console.log(token);
    if (token) {
      jwt.verify(token, process.env.NODE_JWT_SECRET, function (err, decoded) {
        if (err || decoded === undefined) {
          res.status(401).json({message: 'unauthorized'})
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({message: 'unauthorized'})
    }
  }
}

module.exports = authorization;