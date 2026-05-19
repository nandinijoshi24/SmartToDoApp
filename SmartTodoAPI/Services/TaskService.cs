using Microsoft.Extensions.Options;
using MongoDB.Driver;
using SmartTodoAPI.Models;
using SmartTodoAPI.Models.DTOs;

namespace SmartTodoAPI.Services
{
    public class TaskService : ITaskService
    {
        private readonly IMongoCollection<TaskItem> _tasksCollection;

        public TaskService(IOptions<MongoDbSettings> mongoDbSettings, IMongoClient mongoClient)
        {
            var mongoDatabase = mongoClient.GetDatabase(mongoDbSettings.Value.DatabaseName);
            _tasksCollection = mongoDatabase.GetCollection<TaskItem>(mongoDbSettings.Value.CollectionName);
        }

        public IEnumerable<TaskItemDto> GetAllTasks()
        {
            return _tasksCollection.Find(_ => true).ToList().Select(MapToDto);
        }

        public TaskItemDto? GetTaskById(string id)
        {
            var task = _tasksCollection.Find(x => x.Id == id).FirstOrDefault();
            return task != null ? MapToDto(task) : null;
        }

        public TaskItemDto CreateTask(CreateTaskDto dto)
        {
            var task = new TaskItem
            {
                Title = dto.Title,
                Priority = dto.Priority,
                Deadline = dto.Deadline,
                IsCompleted = false
            };

            _tasksCollection.InsertOne(task);
            return MapToDto(task);
        }

        public TaskItemDto? UpdateTask(string id, UpdateTaskDto dto)
        {
            var task = _tasksCollection.Find(x => x.Id == id).FirstOrDefault();
            if (task == null) return null;

            task.Title = dto.Title;
            task.Priority = dto.Priority;
            task.Deadline = dto.Deadline;
            task.IsCompleted = dto.IsCompleted;

            _tasksCollection.ReplaceOne(x => x.Id == id, task);
            return MapToDto(task);
        }

        public bool DeleteTask(string id)
        {
            var result = _tasksCollection.DeleteOne(x => x.Id == id);
            return result.DeletedCount > 0;
        }

        private static TaskItemDto MapToDto(TaskItem item)
        {
            return new TaskItemDto
            {
                Id = item.Id ?? string.Empty,
                Title = item.Title,
                Priority = item.Priority,
                Deadline = item.Deadline,
                IsCompleted = item.IsCompleted
            };
        }
    }
}
