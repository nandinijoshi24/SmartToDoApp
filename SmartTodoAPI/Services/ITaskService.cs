using SmartTodoAPI.Models.DTOs;

namespace SmartTodoAPI.Services
{
    public interface ITaskService
    {
        IEnumerable<TaskItemDto> GetAllTasks();
        TaskItemDto? GetTaskById(string id);
        TaskItemDto CreateTask(CreateTaskDto dto);
        TaskItemDto? UpdateTask(string id, UpdateTaskDto dto);
        bool DeleteTask(string id);
    }
}
