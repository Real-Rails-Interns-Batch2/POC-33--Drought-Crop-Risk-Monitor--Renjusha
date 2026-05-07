
# 🌍 Drought Crop Risk Monitor (POC-33)

An interactive intelligence dashboard that visualizes global drought conditions and crop risk levels using geospatial data.

---

## 🚀 Overview

The **Drought Crop Risk Monitor** helps analyze climate-driven agricultural risks by mapping drought severity, temperature, and crop vulnerability across regions.

This project is part of the **Real Rails Internship Program**, focused on building data-driven infrastructure intelligence systems.

---

## 🧠 Key Features

* 🌍 Interactive global map (Leaflet)
* 📊 Risk classification (Low / Medium / High)
* 🎯 Dynamic filtering & region selection
* ✈️ Fly-to-region animation on selection
* 🎨 Clean intelligence-style UI dashboard
* 📥 Download dataset feature
* 🧩 Modular and scalable frontend structure

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS
* Leaflet (react-leaflet)

### Backend

* FastAPI (Python)
* REST API

---

## 📡 Data Sources

* Mock dataset (for demo reliability)
* Designed to integrate with:

  * Climate APIs
  * Agricultural risk datasets
  * Satellite-based drought monitoring systems

---

## ⚙️ Setup Instructions

### 1. Clone repository

```bash
git clone https://github.com/Real-Rails-Interns-Batch2/POC-33--Drought-Crop-Risk-Monitor--Renjusha.git
cd POC-33--Drought-Crop-Risk-Monitor--Renjusha
```

---

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

---

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

--

---

## 🧩 Project Structure

```
/backend
  main.py
  mock_data.json

/frontend
  /app
  components
  styles
  public
```

---

## 🛡️ Guardrails Implemented

* ✅ Mock fallback system (ensures demo stability)
* 🔐 API key protection using environment variables
* 🧠 Clear separation of frontend/backend logic

---

## 🌐 Future Enhancements

* Real-time API integration
* Advanced analytics dashboard
* Predictive risk modeling (AI/ML)
* Export reports (PDF/CSV)

---

## 👩‍💻 Author

Renjusha
Real Rails Internship Program

