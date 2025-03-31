from schemas import RequestData, Feedback
from ai_generate import save_response, genai_generate
from fastapi import FastAPI, HTTPException
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
    return genai_generate(request_data["subject_area"], request_data["interest_area"])

@app.post("/feedback")
def idea_helpfull(feedback: Feedback):
    if feedback.feedback not in ["helpful", "notHelpful"]:
        raise HTTPException(status_code=400, detail="Invalid feedback value")
    if feedback.feedback == "helpful":
        save_response()
    return {"message": "Thanks for the feedback!"}
