using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionCategoriesController(ISubscriptionCategoryService subscriptionCategoryService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateSubscriptionCategoryRequest req)
        {
            var result = await subscriptionCategoryService.CreateAsync(req, User.GetUserId());
            return Created($"api/subscriptioncategories/{result.Id}", result);
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var category = await subscriptionCategoryService.GetByIdAsync(id, User.GetUserId());
            return category is null ? NotFound() : Ok(category);
        }
    }
}