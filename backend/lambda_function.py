import json
from db import tasks_collection
from bson import ObjectId
from datetime import datetime

def lambda_handler(event, context):
    http_method = event.get("httpMethod")

    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization"
    }

    if http_method == "GET":
        return get_tasks(headers)
    elif http_method == "POST":
        return add_task(json.loads(event["body"]), headers)
    elif http_method == "PUT":
        return update_task(json.loads(event["body"]), headers)
    elif http_method == "DELETE":
        return delete_task(json.loads(event["body"]), headers)
    elif http_method == "OPTIONS":
        return {
            "statusCode": 200,
            "body": json.dumps({}),
            "headers": headers
        }
    else:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Unsupported method"}),
            "headers": headers
        }

def get_tasks(headers):
    tasks = list(tasks_collection.find({}, {"_id": 0}))
    return {
        "statusCode": 200,
        "body": json.dumps(tasks),
        "headers": headers
    }

def add_task(task, headers): 
    if "title" not in task or not task["title"].strip():
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Title is required and cannot be empty."}),
            "headers": headers
        }

    if "description" not in task or not task["description"].strip():
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Description is required and cannot be empty."}),
            "headers": headers
        }
 
    if len(task["title"]) > 100:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Title cannot exceed 100 characters."}),
            "headers": headers
        }
 
    if "due_date" in task:
        try: 
            datetime.strptime(task["due_date"], "%Y-%m-%d")
        except ValueError:
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Due date must be in YYYY-MM-DD format."}),
                "headers": headers
            }
 
    result = tasks_collection.insert_one(task)
    return {
        "statusCode": 201,
        "body": json.dumps({"message": "Task added", "task_id": str(result.inserted_id)}),
        "headers": headers
    }

def update_task(task, headers):
    task_id = task.get("id")
     
    if not task_id:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Task ID is required for update."}),
            "headers": headers
        }

    try: 
        task["id"] = task["id"]
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid task ID."}),
            "headers": headers
        }
 
    if "title" in task and not task["title"].strip():
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Title cannot be empty."}),
            "headers": headers
        }

    if "description" in task and not task["description"].strip():
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Description cannot be empty."}),
            "headers": headers
        }

    result = tasks_collection.update_one({"id": task["id"]}, {"$set": task})

    if result.matched_count > 0:
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Task updated successfully"}),
            "headers": headers
        }
    else:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "Task not found"}),
            "headers": headers
        }

def delete_task(task, headers):
    task_id = task.get("id")
 
    if not task_id:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Task ID is required to delete."}),
            "headers": headers
        }

    try: 
        task["id"] = task["id"]
    except Exception as e:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid task ID."}),
            "headers": headers
        }
 
    result = tasks_collection.delete_one({"id": task["id"]})

    if result.deleted_count > 0:
        return {
            "statusCode": 200,
            "body": json.dumps({"message": "Task deleted successfully"}),
            "headers": headers
        }
    else:
        return {
            "statusCode": 404,
            "body": json.dumps({"error": "Task not found"}),
            "headers": headers
        }