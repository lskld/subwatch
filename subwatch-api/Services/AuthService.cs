using Microsoft.AspNetCore.Identity;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class AuthService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        ITokenService tokenService,
        ISubscriptionCategoryService subscriptionCategoryService) : IAuthService
    {
        public async Task<AuthResult> LoginAsync(LoginRequest dto)
        {
            var user = await userManager.FindByEmailAsync(dto.Email);

            if (user is null)
                return AuthResult.Failure(["Wrong login credentials"]);

            var result = await signInManager.CheckPasswordSignInAsync(user, dto.Password, true);

            if (!result.Succeeded)
                return AuthResult.Failure(["Wrong login credentials"]);

            return AuthResult.Success(tokenService.GenerateJwtToken(user));
        }
        public async Task<AuthResult> RegisterAsync(RegisterRequest dto)
        {
            var user = new ApplicationUser
            {
                UserName = dto.Username,
                Email = dto.Email,
            };
            var result = await userManager.CreateAsync(user, dto.Password);

            if (!result.Succeeded)
                return AuthResult.Failure(result.Errors.Select(e => e.Description));

            await subscriptionCategoryService.CreateAsync(
                new CreateSubscriptionCategoryRequest("Uncategorized", null), user.Id);

            return AuthResult.Success(tokenService.GenerateJwtToken(user));
        }
        public async Task<ApplicationUser?> GetCurrentUserAsync(string userId)
        {
            return await userManager.FindByIdAsync(userId);
        }
    }
}
