using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
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
        public async Task<ActionResult<AuthResult>> Login(LoginRequest login)
        {
            var result = await authService.LoginAsync(login);

            if (!result.Succeeded)
                return BadRequest(result);

            return Ok(result);
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResult>> Register(RegisterRequest register)
        {
            var result = await authService.RegisterAsync(register);

            if (!result.Succeeded)
                return BadRequest(result);

            return Ok(result);
        }

        [Authorize]
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Successfully logged out " });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<ActionResult<UserResponse>> Me()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var user = await authService.GetCurrentUserAsync(userId!);

            if (user is null)
                return NotFound();

            return Ok(new UserResponse(user.Id, user.UserName!, user.Email!));
        }
    }
}