from openai import OpenAI
from schemas import AiResponseModel
import json

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

def read_sample_json():
  with open("sample_response.json", "r") as f:
    data = json.load(f)
    return data

def generate_idea(subject_area, area_of_interest):
  sample_data = read_sample_json()
  completion = client.beta.chat.completions.parse(
      model="llama3.1:8b",
      messages = [
      {"role": "system", "content": "You are a creative AI assistant. Your task is to generate unique, innovative, and feasible capstone project ideas based on the user's provided subject area and area of interest. The idea should be relevant to current trends and address real-world challenges."},
      {"role": "user", "content": f"I am interested in a capstone project for the subject area {subject_area} with a focus on {area_of_interest}. Can you suggest a project idea?"},
      {"role": "system", "content": f"Use this as an example of what the response should look like: {sample_data}. Do not include any formatting or special styles—keep everything as plain text, like the sample data. Ensure that the response contains complete data, and that the description is at least 2-3 sentences long."}
    ],
      response_format=AiResponseModel
    ) 
    
  data = completion.choices[0].message.parsed
  
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
      
# generate_idea("Computer Science", "Machine Learning")
# read_sample_json()