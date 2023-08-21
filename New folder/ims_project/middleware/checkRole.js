
 // Middleware function to check if the user has a specific role
module.exports = function checkRole(role) {
  return (req, res, next) => {
    const userRole = req.session.userDetail?.role; // Assuming the role is stored in the user object after authentication
    if (userRole === role) {
      return next(); // Role is allowed, continue to the next middleware or route handler
    } else {
      return res.status(403).json({ message: "you have no permission to access this page" });
    }
  };
}
  
