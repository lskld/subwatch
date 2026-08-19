using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionCategoriesController(ISubscriptionCategoryService subscriptionCategoryService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateSubscriptionCategoryRequest req)
        {
            var result = await subscriptionCategoryService.CreateAsync(req, User.GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await subscriptionCategoryService.GetByIdAsync(id, User.GetUserId());
            return category is null ? NotFound() : Ok(category);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await subscriptionCategoryService.GetAllAsync(User.GetUserId());
            return Ok(categories);
        }
    }
}