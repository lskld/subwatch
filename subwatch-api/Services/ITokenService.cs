using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public interface ITokenService
    {
        string GenerateJwtToken(ApplicationUser user);
    }
}