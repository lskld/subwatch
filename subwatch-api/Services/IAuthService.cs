using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface IAuthService
    {
        Task<string> LoginAsync(LoginDto dto);
        Task<string> RegisterAsync(RegisterDto dto);
    }
}