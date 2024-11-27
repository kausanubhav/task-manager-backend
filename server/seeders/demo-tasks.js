module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tasks", [
      {
        title: "Complete project documentation",
        description: "Write the project documentation for the new feature.",
        status: "pending",
        userId: 1, // Assign this task to user with ID 1 (John Doe)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Fix login bug",
        description: "Investigate and fix the login issue reported by users.",
        status: "pending",
        userId: 2, // Assign this task to user with ID 2 (Jane Smith)
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },
  down: async (queryInterface) => {
    await queryInterface.bulkDelete("Tasks", null, {})
  },
}
