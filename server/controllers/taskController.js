const Task = require("../models/task")
const { body, param, validationResult } = require("express-validator")

// Create Task
const createTask = [
  // Validation and Sanitization
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("status")
    .trim()
    .isIn(["pending", "completed"])
    .withMessage('Status must be either "pending" or "completed"'),

  body("userId")
    .isInt()
    .withMessage("User ID must be an integer")
    .notEmpty()
    .withMessage("User ID is required"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { title, description, status, userId } = req.body

    try {
      const newTask = await Task.create({
        title,
        description,
        status,
        userId,
      })
      res.status(201).json(newTask)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error creating task" })
    }
  },
]

//Get tasks by user
const getTasksByUser = [
  param("userId").isInt().withMessage("User ID must be an integer"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { userId } = req.params
    try {
      const tasks = await Task.findAll({ where: { userId } })
      if (tasks.length === 0) {
        return res.status(404).json({ message: "No tasks found for this user." })
      }
      res.status(200).json(tasks)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error retrieving tasks" })
    }
  },
]

//Get tasks by Id
const getTaskById = [
  param("id").isInt().withMessage("Task ID must be an integer"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    try {
      const task = await Task.findOne({ where: { id } })
      if (!task) {
        return res.status(404).json({ message: "Task not found." })
      }
      res.status(200).json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error retrieving task" })
    }
  },
]

// Update a task
const updateTask = [
  param("id").isInt().withMessage("Task ID must be an integer"),

  body("title")
    .trim()
    .optional()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .trim()
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage('Status must be either "pending" or "completed"'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { title, description, status } = req.body

    try {
      const task = await Task.findOne({ where: { id } })
      if (!task) {
        return res.status(404).json({ message: "Task not found." })
      }

      // Update task with validated fields
      task.title = title || task.title
      task.description = description || task.description
      task.status = status || task.status

      await task.save()
      res.status(200).json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error updating task" })
    }
  },
]

// Delete a task
const deleteTask = [
  param("id").isInt().withMessage("Task ID must be an integer"),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    try {
      const task = await Task.findOne({ where: { id } })
      if (!task) {
        return res.status(404).json({ message: "Task not found." })
      }

      await task.destroy()
      res.status(200).json({ message: "Task deleted successfully." })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error deleting task" })
    }
  },
]

// Update task status
const updateTaskStatus = [
  param("id").isInt().withMessage("Task ID must be an integer"),

  body("status")
    .isIn(["pending", "completed"])
    .withMessage('Status must be either "pending" or "completed"'),

  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { id } = req.params
    const { status } = req.body

    try {
      const task = await Task.findOne({ where: { id } })
      if (!task) {
        return res.status(404).json({ message: "Task not found." })
      }

      task.status = status
      await task.save()
      res.status(200).json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error updating task status" })
    }
  },
]

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
  updateTaskStatus,
}
