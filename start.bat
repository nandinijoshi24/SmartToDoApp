@echo off
echo =========================================
echo      Starting Smart Todo App Services
echo =========================================

echo.
echo [1/2] Starting Backend API (SmartTodoAPI)...
start "SmartTodo Backend" cmd /k "cd SmartTodoAPI && dotnet run"

echo.
echo [2/2] Starting Frontend UI (smart-todo-ui)...
start "SmartTodo Frontend" cmd /k "cd smart-todo-ui && npm install && npm run dev"

echo.
echo Both services are booting up in separate terminals!
echo NOTE: Ensure you have Node.js and the .NET SDK installed.
echo.
pause
