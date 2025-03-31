import json
import os
from schemas import AiResponseModel
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client(api_key=os.getenv("API_KEY"))

def read_sample_json():
  with open("sample_response.json", "r") as f:
    data = json.load(f)
    return data

def genai_generate(subject_area, area_of_interest):
  sample_data = read_sample_json()
  
  prompt = f"""
  You are a creative AI assistant. Your task is to generate unique, innovative, and feasible capstone project ideas based on the user's subject area and area of interest. The project idea should be relevant to current trends and address real-world challenges.
  The user has requested a capstone project idea for the subject area {subject_area}, with a focus on {area_of_interest}. Can you suggest a project idea?
  Please respond with a project idea that includes a 2-3 sentence description, just like the example: {sample_data}. Keep the response plain text, without any formatting or special characters. The idea should be practical and tackle a real-world problem.
  """
  response = client.models.generate_content(
    model = 'gemini-2.0-flash-lite',
    contents=prompt,
    config={
      'response_mime_type': 'application/json',
      'response_schema': AiResponseModel,
    }
  )
  data: AiResponseModel = response.parsed
  with open("response.json", "w") as f:
    json.dump(data.dict(), f, indent=2)
      
  return data

def save_response():
  existing_data = read_sample_json()
  
  with open("response.json", "r") as f:
    new_data_from_file = json.load(f)

  existing_data.append(new_data_from_file)

  with open("sample_response.json", "w") as f:
    json.dump(existing_data, f, indent=2)
      
# genai_generate("Computer Science", "Machine Learning")
# read_sample_json()