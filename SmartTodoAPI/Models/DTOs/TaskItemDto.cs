namespace SmartTodoAPI.Models.DTOs
{
    public class TaskItemDto
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Priority { get; set; } = string.Empty;
        public DateTime Deadline { get; set; }
        public bool IsCompleted { get; set; }
    }
}
