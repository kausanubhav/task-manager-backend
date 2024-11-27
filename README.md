
# Task Management API
This is a Task Management API that allows users to create, update, retrieve, and delete tasks. The API is designed to be used by authenticated users, where tasks are associated with specific users. The project is built using Express.js, Sequelize, PostgreSQL, and uses JWT for authentication.



- **User Authentication**: Secure API endpoints using JSON Web Tokens (JWT).
- **CRUD Operations on Tasks**:
  - Create tasks
  - Read tasks (by user and by task ID)
  - Update tasks (details and status)
  - Delete tasks
- **Data Validation & Sanitization**: Input data is validated using `express-validator` to ensure that only valid data is stored in the database.
- **Error Handling**: Proper error handling is implemented to return descriptive error messages when things go wrong.
- **User-Specific Data**: Tasks are linked to specific users using `userId`, ensuring that users can only interact with their own tasks.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for Node.js.
- **Sequelize**: ORM for interacting with the PostgreSQL database.
- **PostgreSQL**: Relational database management system.
- **JWT (JSON Web Tokens)**: For user authentication and session management.
- **Express-Validator**: For validating and sanitizing input data.

## Project Setup

### Prerequisites

Before running this project, ensure that you have the following installed:

- Node.js
- PostgreSQL
- A code editor like VS Code (optional)



## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kausanubhav/task-manager-backend.git
   ```

2. Navigate into the project folder:
    ```bash  
    cd task-manager
    ```
3. Install the required dependencies:

    ```bash  
    npm install
    ```

4. Create a .env file in the root directory with the following environment variables:

    ```
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    DB_PORT=your_database_port
    JWT_SECRET=your_jwt_secret_key
    ```
5. Run the database migrations to set up the database schema (optional, if you’ve set up migrations):

    ```bash
    npm run migrate
    ```

6. Start the server:

    ```bash
    npm start
    ```

 Once the server is running, your API should be accessible at the configured port (default is `http://localhost:3000`).

## API Endpoints

The following are the available API endpoints in this Task Management API:

### 1. **Create Task**

- **URL**: `/tasks`
- **Method**: `POST`
- **Description**: Allows users to create a new task.
- **Request Body**:
  ```
  {
    "title": "Task Title",
    "description": "Task Description",
    "status": "pending",
    "userId": 1
  }
  ```
- **Response**: Returns the created task object with its ID and timestamp.
  
  
### 2. **Get Tasks by user**
 -  **URL**: `/tasks/user/:userId`
-   **Method**: `GET`
- **Description**: Retrieves all tasks associated with a specific user.
- **Parameters**:
`userId` (integer) - The ID of the user.
- **Response**: Returns a list of tasks belonging to the user.

### 3. **Get Task by ID**
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific task by its ID.
- **Parameters**:
`id` (integer) - The ID of the task.
- **Response**: Returns the task with the specified ID.

### 4. **Update Task**
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Description**: Updates an existing task.
 - **Parameters**:
`id` (integer) - The ID of the task to be updated.
- **Request Body**:

```
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed"
}
```
- **Response**: Returns the updated task object.

### 5. **Delete Task**
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a task by its ID.
- **Parameters**:
`id` (integer) - The ID of the task to be deleted.
- **Response**: Returns a confirmation message indicating the task has been deleted.

### 6. **Update Task Status**
- **URL**: `/tasks/:id/status`
- **Method**: `PATCH`
- **Description**: Updates the status of a specific task.
- **Parameters**:
`id` (integer) - The ID of the task.
- **Request Body**:
```
{
  "status": "completed"
}
```

- **Response**: Returns the updated task object with the new status.

## Authentication

The API uses JWT for authentication. To authenticate, send the Authorization header with the token in the following format:

```
Authorization: Bearer <your_jwt_token>
```
The token is required for all endpoints that interact with user-specific data (e.g., creating, updating, or deleting tasks).

## Error Handling
The API returns detailed error messages for invalid input, missing data, or database errors.
Common error response formats include:
```
{
  "message": "Error message here",
  "errors": [
    {
      "param": "field_name",
      "msg": "Validation message"
    }
  ]
}
```



    
