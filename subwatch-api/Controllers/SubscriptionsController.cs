using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionsController(ISubscriptionService subscriptionService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create(CreateSubscriptionRequest req)
        {
            throw new NotImplementedException();
        }
        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            throw new NotImplementedException();
        }
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}