const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const  pool =  require("../config/db");

const verifyJWT = async (req, res, next) => {

  // check if the token reside in the headers 
   const authHeader = req.header("Authorization");

    let token = req.cookies.accessToken;

    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      console.log("token not found");
      return res.status(401).json({
        message: "token not found"
      })
    }

  // extract the token from the header
  
  // verify the token
  // here the jwt token will return a payload that was given during the sign if the token is verified successfully
  // if not then it throws an error 
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    
    console.log("Decoded payload: ", decoded);
    // here we have to check if the user exists in the db or not 
    const email = decoded.email;
    console.log("Logging email here: ",email)
    //query to db
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    // if no rows found then send response user not found
    if (result.rows.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }
    // user is in result.row[0]
    const user = result.rows[0];
    req.user = user;
    next();
  } catch (err) {
    console.log("Error state here logging it just for looking in the verify token middleware",err)
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  
  }
};

module.exports={
  verifyJWT
};



// right now i am jsut using the verify token and db checkup for that user but later for security purposes i will
// add a refresh token rotation that will genereate a new token evrytime a user refreshes the page 