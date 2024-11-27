const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1] //expecting "Bearer ..."

  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." })
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret") 
    req.user = decoded // Attach user info to request object
    next()
  } catch (error) {
    console.error(error)
    res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = authenticateUser
