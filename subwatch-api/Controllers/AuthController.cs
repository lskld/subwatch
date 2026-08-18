using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            var result = await authService.LoginAsync(login);
            return Ok(new { result.Token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto register)
        {
            var result = await authService.RegisterAsync(register);

            if (!result.Succeeded)
                return BadRequest(new { errors = result.Errors });

            return Ok(new { result.Token });
        }
    }
}