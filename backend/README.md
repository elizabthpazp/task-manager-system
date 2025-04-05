# Task Manager Backend

This is the backend of the Task Manager system using **AWS Lambda**, **API Gateway**, and **MongoDB** as the NoSQL database. The project provides a RESTful API to manage tasks, allowing CRUD operations (Create, Read, Update, Delete).

## Features

- **AWS Lambda**: Serverless functions to handle business logic.
- **API Gateway**: Exposing Lambda functions as RESTful endpoints.
- **MongoDB**: NoSQL database to store tasks.
- **CORS**: Configuration enabled to allow the frontend to access the API from any domain.
- **Authentication**: No authentication required in this basic version, but can be easily added.

## Technologies

- Python 3.x
- AWS Lambda
- AWS API Gateway
- MongoDB
- `pymongo` for MongoDB connection
- `boto3` for interacting with AWS from Python

## Requirements

- An AWS account.
- MongoDB Atlas or a configured MongoDB cluster.
- AWS access key configured.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/task-manager-backend.git
   cd task-manager-backend
   ```

2. **Create a virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Linux/Mac
   venv\Scripts\activate     # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure MongoDB**:
   - If you're using MongoDB Atlas, get the connection URI from your MongoDB cluster.
   - Configure the MongoDB URI in a `.env` file or in the environment variables:
     ```bash
     MONGO_URI="mongodb+srv://username:password@cluster.mongodb.net/db?retryWrites=true&w=majority"
     ```

5. **Upload the code to AWS Lambda**:
   If you're using CI/CD like GitHub Actions, the code will be uploaded automatically. If you're doing it manually:

   - Package your code in a ZIP file:
     ```bash
     zip -r function.zip .
     ```
   
   - Upload the `function.zip` file to an S3 bucket in AWS and then update the Lambda function.

6. **Configure AWS API Gateway**:
   - In **API Gateway**, create a new RESTful API.
   - Create a resource and assign HTTP methods (GET, POST, PUT, DELETE).
   - Associate each method with its corresponding Lambda function.

## Endpoints

### `GET /tasks`

Fetches all tasks stored in MongoDB.

**Response**:
- `200 OK`: List of tasks.
- `500 Internal Server Error`: If an error occurs while fetching tasks.

### `POST /tasks`

Creates a new task in MongoDB.

**Request body**:
```json
{
  "title": "My new task",
  "description": "Task description",
  "status": "Pending"
}
```

**Response**:
- `201 Created`: Task added successfully.
- `400 Bad Request`: If the request is invalid.
- `500 Internal Server Error`: If an error occurs while adding the task.

### `PUT /tasks`

Updates the status of an existing task.

**Request body**:
```json
{
  "_id": "Task_ID",
  "status": "Completed"
}
```

**Response**:
- `200 OK`: Task updated successfully.
- `404 Not Found`: If the task does not exist.
- `500 Internal Server Error`: If an error occurs while updating the task.

### `DELETE /tasks`

Deletes a task by its ID.

**Request body**:
```json
{
  "_id": "Task_ID"
}
```

**Response**:
- `200 OK`: Task deleted successfully.
- `404 Not Found`: If the task does not exist.
- `500 Internal Server Error`: If an error occurs while deleting the task.

## Tests

To run unit tests, you can execute:

```bash
pytest tests/
```

## Deployment

You can deploy the backend to AWS Lambda by following these steps:

1. Package the code:
   ```bash
   zip -r function.zip . 
   ```

2. Upload the `function.zip` file to an S3 bucket.

3. Update the Lambda function in AWS:
   ```bash
   aws lambda update-function-code --function-name task-manager --s3-bucket <bucket-name> --s3-key function.zip
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
