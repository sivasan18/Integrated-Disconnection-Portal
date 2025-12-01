# 📡 Integrated Mobile, Broadband & DTH Disconnection Portal (Demo – 2025)

This is a **demo portal** designed to simplify the process of **disconnecting**:
- Mobile connections  
- Broadband / Fiber Internet connections  
- DTH television services  

The goal is to provide a **single portal** where users can request termination of services that normally require visiting a physical store or navigating complex provider-specific websites.

> ⚠️ **Note:** This is NOT an official TRAI or provider website.  
> All features are implemented in demo mode for conceptual and educational purposes only.

---

## ⭐ Inspiration

This project was inspired by an idea shared on Twitter/X that highlighted how **opening** a mobile/DTH/broadband connection takes **seconds**, but **closing** it is extremely difficult.

🔗 Credit: Inspired by this concept shared by **@sanket**  
Link: https://x.com/sanket/status/1995100399389536570  

This idea motivated the creation of a unified termination portal in demo format.

---

## 🚀 Key Features (Demo)

### 🔹 1. Multi-Service Termination
Supports closure requests for:
- Mobile (Airtel, Jio, Vi, BSNL)
- Broadband (Airtel Xstream, JioFiber, ACT, BSNL FTTH)
- DTH (Tata Play, Sun Direct, Dish TV, Airtel DTH)

---

### 🔹 2. Aadhaar-Based Identity Verification
To prevent unauthorized disconnection:
- User completes Aadhaar verification  
- If successful → Request processed in **24 hours**  
- If verification fails → May take up to **7 working days**

---

### 🔹 3. Proof Upload System
User must submit **proof documents**, such as:
- Bill copy  
- Customer copy  
- Original connection/trade proof submitted during activation  

---

### 🔹 4. OTP Verification
Before processing the request:
- OTP is sent to the registered mobile number  
- Termination proceeds only after OTP verification  

---

### 🔹 5. Request Status Tracking
Users can track:
```
Submitted → In Review → Verified → Disconnected
```

Each stage includes timestamps for transparency.

---

### 🔹 6. Multi-Language Support
Supports:
- English
- Hindi
- Tamil
- Telugu

---

### 🔹 7. Dark / Light Mode Toggle
- User can switch between both  
- Theme is saved in local preferences  

---

### 🔹 8. PDF Confirmation Receipt
After a successful disconnection request:
- A downloadable PDF receipt is generated  
- Includes request ID, service, provider, and verification status  

---

## 🛠️ Tech Overview (Demo Structure)

```
HTML + CSS + Vanilla JavaScript
Aadhaar/OTP placeholders
Excel file generator (demo)
PDF generator (demo)
Mock API endpoints
```

No real telecom/Broadband/DTH provider APIs are connected.

---

## ⚠️ Disclaimer
This is a **demo prototype**.  
It does NOT perform real disconnections and does NOT connect to any official provider or TRAI system.

---
