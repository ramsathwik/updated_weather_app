# 🌦️ Updated Weather App

The **Updated Weather App** is a full-stack weather application that provides **real-time weather updates**, **AI-powered insights**, and **historical weather analysis** for any city in the world.  
It is built using **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **MongoDB** for data storage.  
The app integrates multiple APIs — including **Geoapify**, **OpenAI**, and a **custom ML API** — to deliver an intelligent and seamless weather experience.

---

## 🚀 Live Demo

- 🌐 **Frontend:** [https://updated-weather-app-2.onrender.com/](https://updated-weather-app-2.onrender.com/)
- ⚙️ **Backend API:** [https://updated-weather-app-1.onrender.com/](https://updated-weather-app-1.onrender.com/)

---

## 🧭 Overview

This project demonstrates **frontend-backend integration**, **API communication**, and **AI-based prediction** in a single platform.

### Users can:

- Search for any city to get live weather data
- View temperature, humidity, and wind speed
- Get AI-generated weather insights using OpenAI
- Analyze trends through an integrated ML API
- Store and view weather history from MongoDB

---

## ✨ Features

✅ Smart city search using **Geoapify API**  
✅ Real-time weather updates with clean UI  
✅ AI-based weather analysis via **OpenAI API**  
✅ Weather prediction through **ML model (ngrok API)**  
✅ Historical weather data stored in **MongoDB**  
✅ Responsive and mobile-friendly design  
✅ Secure environment variable management

---

## 🛠️ Tech Stack

### **Frontend**

- React (Vite)
- Tailwind CSS
- React Router DOM
- Fetch API

### **Backend**

- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv, cors, and Winston Logger

### **APIs Used**

- 🌎 Geoapify — City autocomplete & geocoding
- ☁️ ML API (ngrok) — Predictive weather insights

---

## ⚙️ Environment Variables

Create a `.env` file inside the backend folder and add:

```bash
PORT=*****
SEARCH_API_KEY=******
SEARCH_URL=https://api.geoapify.com/v1/geocode/autocomplete
ML_API_URL=******
OPENAI_API_KEY=your_openai_api_key
MONGO_URI=*****

```
