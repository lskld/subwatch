using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace SubwatchApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionCategoriesController : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Create()
        {
            throw new NotImplementedException();
        }
    }    
}