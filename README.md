# Smart Todo App 🚀

A modern, full-stack Task Management application designed with a sleek Glassmorphism aesthetic. It allows users to quickly add, prioritize, track, and complete their daily tasks.

## 🏗️ Architecture

The project is split into two main sections:

### 1. Backend API (`SmartTodoAPI`)
- **Tech Stack**: C# / .NET 8 Web API
- **Database**: Entity Framework Core (In-Memory Database)
- **Architecture**: Service Layer Pattern (`Controller` → `Service` → `Database`).
- **Features**: RESTful API utilizing DTOs (Data Transfer Objects) for robust request validation and Swagger for built-in API testing/documentation.

### 2. Frontend UI (`smart-todo-ui`)
- **Tech Stack**: React.js / Vite
- **Styling**: Pure CSS with premium modern Glassmorphism aesthetics, dynamic Badges, and CSS Toast notifications.
- **Features**: Interactive priority dropdowns, native date-pickers for deadlines, responsive UI, dynamic sorting (by deadline urgency), and active task filtering.

---

## 🚀 How to Run Locally

You must have **[Node.js](https://nodejs.org/en/)** and the **[.NET SDK 8.0+](https://dotnet.microsoft.com/en-us/download)** installed on your machine.

### The "One-Click" Method (Windows)
We've included a handy launch script in the root directory! Simply double-click the `start.bat` file.
1. It will open two separate terminal windows.
2. It will automatically start the Backend server.
3. It will install NPM dependencies for the frontend and launch the React development server.

### The Manual Method
If you wish to run the services individually across multiple terminals:

**1. Start the Backend API**
```bash
cd SmartTodoAPI
dotnet run
```
_Wait until you see it listening on port `5000` or `5001`. You can view the API Documentation at `https://localhost:5001/swagger/index.html`_

**2. Start the Frontend React App**
Open a new terminal window:
```bash
cd smart-todo-ui
npm install
npm run dev
```
_Open your browser and navigate to `http://localhost:5173` to see the app!_

---

## 🎨 Features
- **Clean Architecture:** Fully scalable backend ready to be hooked into SQL Server if needed.
- **Form Validation:** Sturdy backend validation ensuring title names and priorities are entered correctly.
- **Clean UX:** A beautiful dark-theme interface with satisfying hover states and non-blocking layout grids.
- **Sorting & Filtering:** Organize your headspace by hiding completed tasks, ensuring critical deadlines bubble up to the top.
