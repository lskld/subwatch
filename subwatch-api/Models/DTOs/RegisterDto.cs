using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record RegisterDto
    (
        [property: Required] string Username,
        [property: Required, EmailAddress] string Email,
        [property: Required, MinLength(8)] string Password
    )
    {
        public override string ToString() => $"RegisterDto {{ Email = {Email}}}";
    }
}