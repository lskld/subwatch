using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record LoginRequest 
    (
        [Required, EmailAddress] string Email,
        [Required] string Password
    )
    {
        public override string ToString() => $"LoginDto {{ Email = {Email}}}";
    }
}