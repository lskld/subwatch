using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record LoginDto 
    (
        [property: Required, EmailAddress] string Email,
        [property: Required] string Password
    )
    {
        public override string ToString() => $"LoginDto {{ Email = {Email}}}";
    }
}