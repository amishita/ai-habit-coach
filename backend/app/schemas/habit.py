from pydantic import BaseModel

# Schema for logging habit data
class HabitLog(BaseModel):
    date: str
    sleep_hours: float
    steps: int
    mood: int
