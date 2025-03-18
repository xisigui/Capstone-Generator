from schemas import RequestData
from ai_generate import generate_idea
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate")
def generate(request_data: RequestData):
    request_data = request_data.dict()    
    return generate_idea(request_data["subject_area"], request_data["interest_area"])

