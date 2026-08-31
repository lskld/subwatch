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
        public async Task<ActionResult<SubscriptionResponse>> Create(CreateSubscriptionRequest req)
        {
            var result = await subscriptionService.CreateAsync(req, User.GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<SubscriptionResponse>> GetById(int id)
        {
            var subscription = await subscriptionService.GetByIdAsync(id, User.GetUserId());
            return subscription is null ? NotFound() : Ok(subscription);
        }
        [HttpGet]
        public async Task<ActionResult<List<SubscriptionResponse>>> GetAll()
        {
            var subscriptionList = await subscriptionService.GetAllAsync(User.GetUserId());
            return Ok(subscriptionList);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<SubscriptionResponse>> Update(int id, UpdateSubscriptionRequest req)
        {
            var result = await subscriptionService.UpdateAsync(id, req, User.GetUserId());
            return result is null ? NotFound() : Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await subscriptionService.DeleteAsync(id, User.GetUserId());
            return deleted ? NoContent() : NotFound();
        }
    }
}