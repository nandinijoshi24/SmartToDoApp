using Microsoft.AspNetCore.Mvc;
using SmartTodoAPI.Models.DTOs;
using SmartTodoAPI.Services;

namespace SmartTodoAPI.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_taskService.GetAllTasks());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(string id)
        {
            var task = _taskService.GetTaskById(id);
            if (task == null) return NotFound();
            return Ok(task);
        }

        [HttpPost]
        public IActionResult Add([FromBody] CreateTaskDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = _taskService.CreateTask(dto);
            return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromBody] UpdateTaskDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var updatedTask = _taskService.UpdateTask(id, dto);
            if (updatedTask == null) return NotFound();

            return Ok(updatedTask);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var success = _taskService.DeleteTask(id);
            if (!success) return NotFound();

            return NoContent();
        }
    }
}
