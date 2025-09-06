const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET; // use .env for this

// Signup function
const signup = async (req, res) => {
  const { displayName, email, password, confirmPassword } = req.body;
  
  try {
    // Validation
    if (!displayName || !email || !password || !confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ 
        success: false,
        message: "Passwords do not match" 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: "Password must be at least 6 characters long" 
      });
    }

    // Check if user already exists
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ 
        success: false,
        message: "User with this email already exists" 
      });
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await pool.query(
      "INSERT INTO users (display_name, email, password_hash, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, display_name, email, role, created_at",
      [displayName, email, passwordHash, 'user']
    );

    const newUser = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: {
          id: newUser.id,
          displayName: newUser.display_name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.created_at
        },
        token
      }
    });

  } catch (error) {
    console.error("Signup Error:", error);
    
    if (error.code === '23505') { // PostgreSQL unique violation
      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "Email and password are required" 
      });
    }

    // 1) Query user by email  
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }
    
    const user = result.rows[0];

    // 2) Compare password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // 3) Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // 4) Send response with both cookie and JSON
    res
      .status(200)
      .cookie("accessToken", token, { 
        httpOnly: true, 
        sameSite: 'lax',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      })
      .json({ 
        success: true,
        message: "User logged in successfully", 
        data: {
          user: {
            id: user.id,
            displayName: user.display_name,
            email: user.email,
            role: user.role
          },
          token
        }
      });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ 
      success: false,
      message: "Server Error" 
    });
  }
};

const checkAuth =  (req,res) => {
  // before this verify jwt is called
  const user = req.user;
  if(!user){
    return res.status(401).json({
      message: "No User Found"
    });
  }
  else{
   return res.status(200).json({
      message: "Authorised"
    })
  }

}

module.exports = {
  signup,
  login,
  checkAuth
}
