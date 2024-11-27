const express = require("express")
const router = express.Router()

const authenticateUser = require("../middlewares/authenticateUser") // Import the authentication middleware
const {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
} = require("../controllers/taskController.js")

// Apply the authentication middleware to the routes that need it
// Create a new task
router.post("/tasks", authenticateUser, createTask)

// Get all tasks for a user
router.get("/tasks/user/:userId", authenticateUser, getTasksByUser)

// Get a specific task by ID
router.get("/tasks/:id", authenticateUser, getTaskById)

// Update task details
router.put("/tasks/:id", authenticateUser, updateTask)

// Delete a task
router.delete("/tasks/:id", authenticateUser, deleteTask)

// Update task status (e.g., mark as completed)
router.patch("/tasks/:id/status", authenticateUser, updateTaskStatus)

module.exports = router
