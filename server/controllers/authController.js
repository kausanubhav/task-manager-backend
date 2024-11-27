const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")

// Sign up user
const signup = [
  // Validation and Sanitization
  body("email").isEmail().withMessage("Please enter a valid email address").normalizeEmail(),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      })

      // Generate a JWT token
      const token = jwt.sign({ userId: newUser.id, email: newUser.email }, "your_jwt_secret", {
        expiresIn: "1h",
      })

      res.status(201).json({ message: "User created successfully", token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error creating user" })
    }
  },
]

//Sign in user
const login = [
  // Validation and Sanitization
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("Password is required"),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the password with the hashed one in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, "your_jwt_secret", { expiresIn: "1h" });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error logging in" });
    }
  },
];

module.exports = { signup, login };

