using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record UpdateSubscriptionCategoryRequest
    (
        [Required, MaxLength(100)] string Title,
        [MaxLength(300)] string? Description
    );
}