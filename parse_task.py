import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def parse_task(user_input):
    prompt = f"""
You are an intelligent assistant. Extract the following task into structured format:
"{user_input}"

Return a JSON object with:
- title (string)
- due_date (in format YYYY-MM-DD HH:MM or null)
- duration_minutes (integer)
- priority (low, medium, high)

Example input: "Finish the report by Friday 3pm, high priority"

Expected JSON format:
{{
  "title": "Finish the report",
  "due_date": "2025-06-21 15:00",
  "duration_minutes": 60,
  "priority": "high"
}}
"""
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )
    return response['choices'][0]['message']['content']
