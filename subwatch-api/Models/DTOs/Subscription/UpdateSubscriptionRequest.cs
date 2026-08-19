using System.ComponentModel.DataAnnotations;
using SubwatchApi.Models.Enums;


namespace SubwatchApi.Models.DTOs
{
    public record UpdateSubscriptionRequest
    (
        [Required, MaxLength(100)] string Title,
        [MaxLength(300)] string? Description,
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")] decimal Price,
        [Required] BillingInterval BillingInterval,
        [Required] DateTime NextBillingDate,
        [Required] int SubscriptionCategoryId
    );
}