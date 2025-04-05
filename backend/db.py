from pymongo import MongoClient
import os 
from datetime import datetime

MONGO_URI = os.getenv('MONGO_URI')

client = MongoClient(MONGO_URI)
db = client.get_database("task-manager")
tasks_collection = db.get_collection("tasks")
 
def add_task(task):
    task["createdAt"] = datetime.utcnow()
    result = tasks_collection.insert_one(task)
    return str(result.inserted_id)

def get_tasks():
    return list(tasks_collection.find({}, {"_id": 0}))

def update_task(task):
    task_id = task.get("_id")
    if not task_id:
        return {"statusCode": 400, "body": json.dumps({"error": "Task ID is required"})}
 
    task["_id"] = ObjectId(task["_id"])

    result = tasks_collection.update_one({"_id": task["_id"]}, {"$set": task})

    if result.matched_count > 0:
        return {"statusCode": 200, "body": json.dumps({"message": "Task updated successfully"})}
    else:
        return {"statusCode": 404, "body": json.dumps({"error": "Task not found"})}

def delete_task(task):
    task_id = task.get("_id")
    if not task_id:
        return {"statusCode": 400, "body": json.dumps({"error": "Task ID is required"})}

    task["_id"] = ObjectId(task["_id"])

    result = tasks_collection.delete_one({"_id": task["_id"]})

    if result.deleted_count > 0:
        return {"statusCode": 200, "body": json.dumps({"message": "Task deleted successfully"})}
    else:
        return {"statusCode": 404, "body": json.dumps({"error": "Task not found"})}

