Doctor Appointment Booking API
A simple RESTful API built with NestJS, TypeORM, and PostgreSQL that allows you to manage doctors, view available time slots, and book appointments. It implements robust API key authentication, input validation, and generic response formatting.

Features
Doctor Management: Create, update, get, delete doctors (CRUD) with validation.

Doctor Shifts: Each doctor can have a configurable shift (start and end time) for flexible slot generation.

Appointment System: View available appointment slots (respecting the doctor’s working hours and existing bookings), and book appointments with conflict/overlap detection.

Paginated Listings: Paginated endpoints for efficient data retrieval.

Environment-based Config: Appointment duration, database credentials, and API key are all configurable via .env.

Consistent API Responses: All responses standardized with utilities (successResponse, paginatedSuccessResponse).

API Key Security: All endpoints require a valid API key via the x-api-key HTTP header.

Getting Started
1. Clone & Install
bash
git clone <your-repo-url>
cd doctor-appointment-nestjs
npm install
2. ENV Configuration
Create a .env file in your project root and set the following variables:

text
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_pg_username
DB_PASSWORD=your_pg_password
DB_DATABASE=doctors_appointment

API_KEY=your-secure-api-key

SLOT_DURATION_MIN=30
3. Database
Ensure you have a PostgreSQL database named doctors_appointment (or as per your .env). The app will auto-create tables if synchronize: true is set.

4. Run the app
bash
npm run start:dev
API accessible at:

text
http://localhost:3000/


5. API Documentation

Go to http://localhost:3000/api/docs