using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record RegisterDto
    (
        [Required] string Username,
        [Required, EmailAddress] string Email,
        [Required, MinLength(8)] string Password
    )
    {
        public override string ToString() => $"RegisterDto {{ Email = {Email}}}";
    }
}