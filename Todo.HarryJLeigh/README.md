# TodoList

A full-stack To-Do List application demonstrating ASP.NET Core Minimal APIs, Entity Framework Core, and a vanilla
JavaScript front-end.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
    1. [Clone the Repository](#clone-the-repository)
    2. [Configure the Database](#configure-the-database)
    3. [Apply EF Core Migrations](#apply-ef-core-migrations)
    4. [Run the Application](#run-the-application)
6. [Usage](#usage)
    1. [Accessing the Front-End](#accessing-the-front-end)
    2. [API Endpoints](#api-endpoints)
7. [Project Structure](#project-structure)
8. [Challenges Faced](#challenges-faced)
9. [Lessons Learned](#lessons-learned)

---
## Overview

TodoList is a lightweight task management application that allows users to create, read, update, and delete tasks. It's
built using:

- **ASP.NET Core Minimal APIs** for backend routing and request handling
- **Entity Framework Core** for database interactions (SQL Server)
- **Vanilla JavaScript** (Fetch API & DOM manipulation) for a responsive front-end

The application serves both a RESTful JSON API and a static front-end under the **wwwroot** folder.

---
## Requirements

This is a single-page application (SPA) for managing a to-do list. Users should be able to perform all CRUD operations
without page redirects.

- Add, Delete, Update, and Read to-dos stored in a database.
- Front-end must use the JS Fetch API to call a minimal API backend.
- Back-end must use ASP.NET Core Minimal APIs; no MVC controllers required.
- Entity Framework Core must be used for data access; raw SQL is not allowed.
- No navigation bar or additional pages: all functionality on one page.
- After any operation, the to-do list updates automatically.
- Single data model: one table for to-dos.
- Deleting a to-do requires a confirmation prompt ("Are you sure?").
- When editing, display a message until the user submits the form to confirm the update.

---

## Features

- Create new to-do items
- Mark to-dos as complete/incomplete
- Edit existing to-dos
- Delete to-dos with confirmation
- Client-side form validation with error/success messages
- Responsive single-page experience without full reloads

---

## Architecture

```
┌──────────────────────────────────────────┐
│              Front-End                  │
│  (wwwroot/js/site.js & dom.js)          │
│  - Fetches API endpoints                │
│  - Renders task table and forms         │
└──────────────────────────────────────────┘
                  ▲
                  │ HTTP (JSON)
                  ▼
┌──────────────────────────────────────────┐
│             Minimal API Layer          │
│  (Program.cs & ApiEndpoints.cs)         │
│  - Defines routes: GET, POST, PUT, etc. │
└──────────────────────────────────────────┘
                  ▲
                  │ EF Core
                  ▼
┌──────────────────────────────────────────┐
│        Data Access Layer (EF Core)     │
│  (TodoContext, Migrations)              │
└──────────────────────────────────────────┘
```

---

## Prerequisites

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- SQL Server instance (local or remote)
- IDE (Visual Studio, VS Code, Rider)

---

## Installation & Setup

### Clone the Repository

```bash
git clone <repository-url>
cd TodoList
```

### Configure the Database

Update the `DefaultConnection` string in `appsettings.json` or `appsettings.Development.json`:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER;Database=TodoListDb;Trusted_Connection=True;"
}
```

### Apply EF Core Migrations

Install the EF Core CLI tool if you haven’t already:

```bash
dotnet tool install --global dotnet-ef
```

Create and apply the initial migration:

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### Run the Application

Start the application via CLI:

```bash
dotnet run
```

---

## Usage

### API Endpoints

| Method | Endpoint              | Description             | Request Body                                  | Response            |
|--------|-----------------------|-------------------------|-----------------------------------------------|---------------------|
| GET    | `/api/todoItems`      | List all todos          | —                                             | JSON array of todos |
| POST   | `/api/todoItems`      | Create a new todo       | `{ name: string, isComplete: bool }`          | Created todo object |
| PUT    | `/api/todoItems/{id}` | Update an existing todo | `{ id: int, name: string, isComplete: bool }` | No Content (204)    |
| DELETE | `/api/todoItems/{id}` | Delete a todo by ID     | —                                             | No Content (204)    |

---

## Project Structure

```
TodoList/
├─ Controllers/       # Minimal API endpoint definitions
├─ Data/              # EF Core DbContext & Migrations
├─ Models/            # Domain models (TodoItem)
├─ wwwroot/           # Static front-end (HTML, CSS, JS)
├─ Program.cs         # App startup and middleware
├─ ApiEndpoints.cs    # Route mappings
├─ appsettings*.json  # Configuration files
└─ TodoList.sln       # Solution file
```

---

## Challenges Faced

- **Database Migrations**: Aligning the EF Core model with the SQL schema, handling nullability and default values.
- **Minimal API Conventions**: Transitioning from MVC controllers to minimal APIs and mastering route grouping.
- **Asynchronous State**: Ensuring UI refresh after async operations without flicker or race conditions.

---

## Lessons Learned

- **Fluent Bootstrap**: Minimal APIs provide a concise, readable way to define endpoints directly in `Program.cs`.
- **Separation of Concerns**: Clear division between data access (EF Core), API layer, and front-end simplifies
  maintenance.
- **Vanilla JS Viability**: For small apps, plain JS remains performant and easy to debug without heavy frameworks.

---