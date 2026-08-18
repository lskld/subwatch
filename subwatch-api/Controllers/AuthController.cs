using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration) => _configuration = configuration;

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            throw new NotImplementedException();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {
            throw new NotImplementedException();
        }
    }
}