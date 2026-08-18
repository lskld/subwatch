using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface IAuthService
    {
        Task<AuthResult> LoginAsync(LoginDto dto);
        Task<AuthResult> RegisterAsync(RegisterDto dto);
    }
}