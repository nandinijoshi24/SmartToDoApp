using System.ComponentModel.DataAnnotations;

namespace SmartTodoAPI.Models.DTOs
{
    public class CreateTaskDto
    {
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Priority { get; set; } = "Medium";
        
        [Required]
        public DateTime Deadline { get; set; }
    }
}
