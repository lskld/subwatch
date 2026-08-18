using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public interface ITokenService
    {
        public string GenerateJwtToken(ApplicationUser user);
    }
}