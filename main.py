from fastapi import FastAPI
from pydantic import BaseModel
from parse_task import parse_task

app = FastAPI()

class TaskInput(BaseModel):
    text: str

@app.post("/parse-task/")
def parse_task_endpoint(task: TaskInput):
    parsed = parse_task(task.text)
    return {"parsed": parsed}
