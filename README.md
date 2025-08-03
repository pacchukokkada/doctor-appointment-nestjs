# 🩺 Doctor Appointment Booking API

A simple RESTful API built with **NestJS**, **TypeORM**, and **PostgreSQL** for managing doctors, shifts, and appointments — with robust API key authentication, validation, and paginated responses.

---

## 🚀 Features

- 🧑‍⚕️ CRUD for doctors
- 🕒 Doctor slot generation
- 📅 Book appointments with conflict detection
- 🔐 API key security
- 📃 Paginated and standardized responses
- 📘 Swagger docs at `/api/docs`

---

## ⚙️ Setup

```bash
git clone <your-repo-url>
cd doctor-appointment-nestjs
npm install


DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_username
DB_PASSWORD=your_pg_password
DB_DATABASE=doctors_appointment

API_KEY=your-secure-api-key
SLOT_DURATION_MIN=30

CREATE DATABASE doctors_appointment;

npm run start:dev
