using System.Security.Claims;

namespace SubwatchApi.Services
{
    public static class ClaimsPrincipalExtensions
    {
        public static string GetUserId(this ClaimsPrincipal user)
        {
            return user.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? throw new InvalidOperationException("User is not authenticated");
        }
    }
}