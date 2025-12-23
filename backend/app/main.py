from fastapi import FastAPI

app = FastAPI(title="AI Habit Coach API")

@app.get("/")
def root():
    return {"status": "API running"}
