using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public interface IAuthService
    {
        Task<AuthResult> LoginAsync(LoginDto dto);
        Task<AuthResult> RegisterAsync(RegisterDto dto);
        Task<ApplicationUser?> GetCurrentUserAsync(string userId);
    }
}