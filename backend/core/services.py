from datetime import datetime
from core.mongodb import get_db

def log_activity(user_id, action, metadata=None):
    db = get_db()
    collection = db.user_activity

    collection.insert_one({
        "user_id": user_id,
        "action": action,
        "metadata": metadata or {},
        "created_at": datetime.utcnow()
    })

def get_user_activity(user_id, limit=10):
    db = get_db()
    collection = db.user_activity

    cursor = (
        collection
        .find({"user_id": user_id})
        .sort("created_at", -1)
        .limit(limit)
    )

    result = []
    for doc in cursor:
        doc["_id"] = str(doc["_id"])
        result.append(doc)

    return result
