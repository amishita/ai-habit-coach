# NOTE:
# Current storage is in-memory (habit_store list).
# Next step: replace with MongoDB for persistence.

from fastapi import FastAPI, HTTPException
from app.schemas.habit import HabitLog

habit_store = []

# creates the FastAPI application object receive HTTP requests, route them, validate data, send responses.
app = FastAPI(title="AI Habit Coach API")

@app.get("/") # route for the root endpoint
def root():
    return {"status": "API running"}

@app.post("/log-habit") # route for logging habit data
def log_habit(habit: HabitLog):
    # Check if this date already exists
    for existing_habit in habit_store:
        if existing_habit.date == habit.date:
            raise HTTPException(
                status_code=400,
                detail="Habit for this date already exists"
            )

    habit_store.append(habit)
    return {
        "message": "Habit logged",
        "total_logs": len(habit_store)
    }

@app.get("/habits/{date}") # route for retrieving habit data by date
def get_habits_by_date(date: str):
    for habit in habit_store:
        if habit.date == date:
            return habit
        
    raise HTTPException(
        status_code=404,
        detail="Habit not found for the given date"
    )