from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
def home():
    return {"message": "Drought Crop Risk Monitor API is running"}

@app.get("/data")
def get_data():
    with open("mock_data.json") as f:
        data = json.load(f)
    
    # Add intelligence layer
    for item in data:
        drought = item["drought_level"]
        crop = item["crop_risk"]

        # Calculate combined risk score
        risk_score = (drought + crop) / 2

        # Add insight label
        if risk_score > 0.75:
            risk_level = "High Risk"
        elif risk_score > 0.5:
            risk_level = "Medium Risk"
        else:
            risk_level = "Low Risk"

        item["risk_score"] = round(risk_score, 2)
        item["risk_level"] = risk_level
         # Add map-friendly structure
    item["coordinates"] = [item["lon"], item["lat"]]

    return data