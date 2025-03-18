from pydantic import BaseModel

class AiResponseModel(BaseModel):
    title: str
    description: str
    summary: str
    expected_outcome: list[str]
    methodology: list[str]
    potential_impact: list[str]
    
class RequestData(BaseModel):
    subject_area: str
    interest_area: str