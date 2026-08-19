using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public interface IAuthService
    {
        Task<AuthResult> LoginAsync(LoginRequest dto);
        Task<AuthResult> RegisterAsync(RegisterRequest dto);
        Task<ApplicationUser?> GetCurrentUserAsync(string userId);
    }
}