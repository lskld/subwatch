using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;
using SubwatchApi.Services;

namespace SubwatchApi.Controllers 
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest login)
        {
            var result = await authService.LoginAsync(login);

            if (!result.Succeeded)
                return BadRequest(new { errors = result.Errors });

            return Ok(new { result.Token });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest register)
        {
            var result = await authService.RegisterAsync(register);

            if (!result.Succeeded)
                return BadRequest(new { errors = result.Errors });

            return Ok(new { result.Token });
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Successfully logged out " });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await authService.GetCurrentUserAsync(userId!);

            if (user is null)
                return NotFound();

            return Ok(new { user.Id, user.Email, user.UserName });
        }
    }
}