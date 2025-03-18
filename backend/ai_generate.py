from openai import OpenAI
from schemas import AiResponseModel
import json

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def read_sample_json():
  with open("response.json", "r") as f:
    data = json.load(f)
    return data

def generate_idea(subject_area, area_of_interest):
  sample_data = read_sample_json()
  completion = client.beta.chat.completions.parse(
      model="llama3.1:8b",
      messages = [
      {"role": "system", "content": "You are a creative AI assistant. Your task is to generate unique, innovative, and feasible capstone project ideas based on the user's provided subject area and area of interest. The idea should be relevant to current trends and address real-world challenges."},
      {"role": "user", "content": f"I am interested in a capstone project for the subject area {subject_area} with a focus on {area_of_interest}. Can you suggest a project idea?"},
      {"role": "system", "content": f"Your reponse should strictly follow the provided JSON format with the following details: {sample_data}. Do not include any formating styles keep everything as a normal text response like the sample data. And make sure that everything has data and the description must be atleast 2-3 sentence." }
    ],
      response_format=AiResponseModel
    ) 
    
  data = completion.choices[0].message.parsed
  
  with open("response.json", "w") as f:
      json.dump(data.dict(), f, indent=2)
      
  return data 

# generate_idea("Computer Science", "Machine Learning")
# read_sample_json()