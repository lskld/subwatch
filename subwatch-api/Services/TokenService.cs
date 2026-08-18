using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class TokenService(IConfiguration configuration) : ITokenService
    {
        public string GenerateJwtToken(ApplicationUser user)
        {
            var claims = new List<Claim>
            {
                new(ClaimTypes.NameIdentifier, user.Id),
                new(ClaimTypes.Email, user.Email ?? string.Empty)
            };

            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration["Jwt:SigningKey"] ?? throw new InvalidOperationException("Jwt:SigningKey config missing.")));
            var credentials = new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha256);
            var duration = configuration.GetValue("Jwt:DurationInMinutes", 60);

            var token = new JwtSecurityToken(
                issuer: configuration["Jwt:Issuer"] ?? throw new InvalidOperationException("Jwt:Issuer config missing."),
                audience: configuration["Jwt:Audience"] ?? throw new InvalidOperationException("Jwt:Audience config missing."),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(duration),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}