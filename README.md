# Project Title
“A full-stack sweet shop management app with role-based dashboards, authentication, and CRUD features for sweets.”

## Table of Contents

* [Project Overview](#project-overview)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Backend Setup](#backend-setup)
  * [Frontend Setup](#frontend-setup)
  * [Run Locally](#run-locally)
* [Tests & Test Report](#tests--test-report)
* [Screenshots](#screenshots)
* [My AI Usage](#my-ai-usage)
* [Repository & Deliverables Checklist](#repository--deliverables-checklist)


---

## Project Overview

This repository contains **<Sweet Shop>**, a full-stack application that allows users to browse, add, and manage sweets (or your actual domain). The backend is built with Node.js/Express and MongoDB, while the frontend is a React application styled with Tailwind CSS. The web app supports authentication, role-based access (admin/user), and real-time updates for certain actions.


## Features

* User authentication (signup/login)
* Role-based dashboards (admin & user)
* CRUD operations for resources (e.g., sweets, orders)
* Filter & search functionality (example: filter by price)
* Unit & integration tests

## Tech Stack

* Frontend: React, React Router, Tailwind CSS
* Backend: Node.js, Express
* Database: MongoDB (mongoose)
* Authentication: JWT / bcrypt
* Testing: Jest, Supertest (or React Testing Library )

## Architecture

Briefly explain your architecture (monorepo or two repos, folder layout):

```
/root
  /backend
    /controllers
    /models
    /routes
    server.js
  /frontend
    /src
      /components
      /pages
    package.json
  README.md
  .gitignore
```

## Getting Started

### Prerequisites

* Node.js >= 18.x
* npm 
* MongoDB (local) 

### Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` with the following variables (example):

```
PORT=5000
MONGO_URI=<your_mongo_connection_string>
JWT_SECRET=<your_jwt_secret>
```



4. Start the backend (development):

```bash
npm run dev
```

> The backend should now be running at `http://localhost:5000` (or the port you chose).

### Frontend Setup

1. Open a terminal and go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file for the frontend if needed (e.g., `VITE_API_URL`):

``
VITE_API_URL=http://localhost:5173
```

4. Start the frontend:

```bash
npm start
# or
npm run dev
```

> Frontend will open at `http://localhost:5173` or the port set by your dev server.

### Run Locally (end-to-end)

1. Ensure MongoDB is running or your connection string is set.
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm start`
4. Open `http://localhost:5173` and test the app.

## Tests & Test Report

**How to run tests**

* Backend tests:

```bash
cd backend
npm test
```

* Frontend tests (unit):

```bash
cd frontend
npm test
```

* E2E tests (if using Cypress):

```bash
npx cypress open
```

### Sample Test Report (replace with your real results)



**How I produced the report**


## Screenshots

Including screenshot of testing and checking configuration

```
/frontend/public/apicheck.png
/frontend/public/backendapicheck2.png
/frontend/public/backendapicheck.png
/frontend/public/consolecheck.png
/frontend/public/importmiddlewareprotecttion
```

Placeholders (replace with real images):

![Login screen](/frontend/public/login.png)

![register screen](/frontend/public/register.png)

![Admin dashboard](/frontend/public/admindashboard.png)

![User dashboard](/frontend/public/userdashboard.png)

## protal for frontend and backend

* Frontend: [https://frontend.example.com](https://localhost5173)
* Backend: [https://api.example.com](https://localhost5000)


## My AI Usage

**This section is mandatory. Be honest and specific.**

I used the following AI tools in this project (edit to accurately reflect your usage):

* **ChatGPT (OpenAI)** — Used to:

  * Brainstorm API endpoint structure and naming conventions.
  * Generate example unit test templates and Jest configuration.
  * Draft README sections and `README.md` structure.
  * Produce example shell commands and `.env` templates.

* **GitHub Copilot** — Used to:
  * Suggest helper functions and small utility code snippets.

* **Other (optional)** — e.g. Claude for ui imporvement , thunder cleint for api status check

**How I used AI responsibly**

* I used AI primarily for brainstorming, scaffolding, and writing non-sensitive boilerplate code.
* I validated and tested all AI-generated code before adding it to the repository.
* I avoided copying long code snippets verbatim from AI outputs without adapting and understanding them.
* I documented any AI assistance in this README to be transparent during interviews.

**Reflection on impact**

* AI sped up scaffolding and documentation, letting me focus on the core business logic and tests.
* It improved consistency in naming and helped me generate test templates, saving time.
* The main risk was over-reliance; to mitigate that I always reviewed and refactored AI-suggested code.



## Repository & Deliverables Checklist

* [ ] Public Git repo link (GitHub)
* [ ] README.md (this file)
* [ ] Screenshots in `/frontend/public`
* [ ] Clear setup instructions for both frontend & backend

---
