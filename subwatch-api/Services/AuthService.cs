using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class AuthService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ITokenService tokenService) : IAuthService
    {
        public async Task<AuthResult> LoginAsync(LoginDto dto)
        {
            throw new NotImplementedException();
        }
        public async Task<AuthResult> RegisterAsync(RegisterDto dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Username,
                Email = dto.Email,
            };
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return AuthResult.Failure(result.Errors.Select(e => e.Description));

            return AuthResult.Success(tokenService.GenerateJwtToken(user));
        }
    }
}
