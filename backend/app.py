from openai import OpenAI
from pydantic import BaseModel

client = OpenAI(base_url="http://localhost:11434/v1", api_key="ollama")

class ResponseModel(BaseModel):
    title: str
    description: str
    goals: list[str]

completion = client.beta.chat.completions.parse(
  model="llama3.1:8b",
  messages=[
    {"role": "system", "content": "You are a google scholar search engine. You help users generate capstone ideas."},
    {"role": "user", "content": "generate capstone ideas with title and a short description about the idea"},
  ],
  response_format=ResponseModel
)

generated_result = completion.choices[0].message.parsed
print(generated_result)
