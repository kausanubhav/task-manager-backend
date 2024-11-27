const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")
const { connectToDB } = require("./db/postgres") // Database connection

dotenv.config()
const app = express()

// Middleware
app.use(bodyParser.json())

// Connect to the database
connectToDB()

// Use Routes
app.use("/api", taskRoutes)
app.use("/api", userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
