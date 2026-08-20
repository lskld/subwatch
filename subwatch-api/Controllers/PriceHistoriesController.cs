using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PriceHistoriesController(IPriceHistoryService priceHistoryService) : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Create(CreatePriceHistoryRequest req)
        {
            var result = await priceHistoryService.CreateAsync(req, User.GetUserId());
            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var priceHistory = await priceHistoryService.GetByIdAsync(id, User.GetUserId());
            return priceHistory is null ? NotFound() : Ok(priceHistory);
        }
        [HttpGet("subscription/{subscriptionId}")]
        public async Task<IActionResult> GetAllBySubscriptionId(int subscriptionId)
        {
            var priceHistories = await priceHistoryService.GetAllBySubscriptionIdAsync(subscriptionId, User.GetUserId());
            return Ok(priceHistories);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePriceHistoryRequest req)
        {
            var priceHistory = await priceHistoryService.UpdateAsync(id, req, User.GetUserId());
            return priceHistory is null ? NotFound() : Ok(priceHistory);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await priceHistoryService.DeleteAsync(id, User.GetUserId());
            return deleted ? NoContent() : NotFound();
        }
    }
}