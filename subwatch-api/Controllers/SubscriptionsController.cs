using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController(ISubscriptionService subscriptionService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreateSubscriptionRequest req)
        {
            var result = await subscriptionService.CreateAsync(req, User.GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subscription = await subscriptionService.GetByIdAsync(id, User.GetUserId());
            return subscription is null ? NotFound() : Ok(subscription);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subscriptionList = await subscriptionService.GetAllAsync(User.GetUserId());
            return Ok(subscriptionList);
        }
    }
}