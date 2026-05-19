using System.ComponentModel.DataAnnotations;

namespace SmartTodoAPI.Models.DTOs
{
    public class UpdateTaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Priority { get; set; } = string.Empty;
        
        [Required]
        public DateTime Deadline { get; set; }
        
        public bool IsCompleted { get; set; }
    }
}
