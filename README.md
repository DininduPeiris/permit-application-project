# Permit App

A full-stack application for permit management, featuring an Express backend and a React frontend.

## Project Structure

- `permit-app-be/`: Express.js backend with TypeScript and PostgreSQL.
- `permit-app-fe/`: React frontend with TypeScript, Vite, and Tailwind CSS.

---

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [PostgreSQL](https://www.postgresql.org/) (Ensure it is running)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

---

## Getting Started

### 1. Clone the repository
```bash
git clone <repository-url>
cd "Permit App"
```

### 2. Backend Setup (`permit-app-be`)

1. Navigate to the backend directory:
   ```bash
   cd permit-app-be
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file in the `permit-app-be` directory (or use the existing one if provided) and update the database credentials:
   ```env
   PORT=5001
   DB_USER="postgres"
   DB_HOST="localhost"
   DB_NAME="permit-db"
   DB_PORT=5432
   DB_PASSWORD="your_password_here"
   ```
4. **Database Setup**:
   - Ensure PostgreSQL is running.
   - Create a database named `permit-db`.
   - (Optional) Run any necessary migration scripts if available.

### 3. Frontend Setup (`permit-app-fe`)

1. Navigate to the frontend directory:
   ```bash
   cd ../permit-app-fe
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the Application

For the best experience, run both the backend and frontend simultaneously in separate terminals.

### Run the Backend
```bash
cd permit-app-be
npm run dev
```
The backend will start on `http://localhost:5001`.

### Run the Frontend
```bash
cd permit-app-fe
npm run dev
```
The frontend will start on `http://localhost:5173` (or the port specified by Vite). It is configured to communicate with the backend at `http://localhost:5001/api`.

---

## Assumptions Made

1. **Local Development**: The project is assumed to be running in a local development environment.
2. **PostgreSQL Credentials**: Default PostgreSQL settings (user `postgres`, port `5432`) are used in the documentation; users may need to adjust these in their `.env`.
3. **Database Schema**: It is assumed that the `permit-db` database is created manually before running the backend.
4. **Port Availability**: It is assumed that ports `5001` (backend) and `5173` (frontend) are available.
5. **Node Environment**: The backend uses `tsx` for execution, which is handled via `npm run dev`.
