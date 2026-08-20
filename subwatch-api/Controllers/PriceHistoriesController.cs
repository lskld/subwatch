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
            throw new NotImplementedException();
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            throw new NotImplementedException();
        }
        [HttpGet("/subscription/{subscriptionId}")]
        public async Task<IActionResult> GetAllBySubscriptionId(int subscriptionId)
        {
            throw new NotImplementedException();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, UpdatePriceHistoryRequest req)
        {
            throw new NotImplementedException();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            throw new NotImplementedException();
        }
    }
}