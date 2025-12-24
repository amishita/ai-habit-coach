from fastapi import FastAPI, HTTPException
# import HabitLog schema
from app.schemas.habit import HabitLog
# database client and db instance
from app.core.database import client, db

habit_store = []

# creates the FastAPI application object receive HTTP requests, route them, validate data, send responses.
app = FastAPI(title="AI Habit Coach API")

habits_collection = db["habits"]

@app.get("/") # route for the root endpoint
def root():
    return {"status": "API running"}

@app.post("/log-habit")
# async instead of def for non-blocking operations
async def log_habit(habit: HabitLog):
    # check if habit for the date already exists
    existing = await habits_collection.find_one({"date": habit.date})
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Habit for this date already exists"
        )

    # insert the new habit log into the database
    await habits_collection.insert_one(habit.model_dump())

    return {
        "message": "Habit logged successfully"
    }

# Get habit by date
@app.get("/habit/{date}")
async def get_habit_by_date(date: str):
    habit = await habits_collection.find_one({"date": date})

    if not habit:
        raise HTTPException(
            status_code=404,
            detail="Habit not found for this date"
        )

    # convert ObjectId to string for JSON serialization
    habit["_id"] = str(habit["_id"]) 
    return habit



@app.get("/db-check")
async def db_check():
    await client.admin.command("ping")
    return {"status": "MongoDB connected"}