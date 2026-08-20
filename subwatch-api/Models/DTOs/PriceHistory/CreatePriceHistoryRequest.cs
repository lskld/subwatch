using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record CreatePriceHistoryRequest
    (
        [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0.")] decimal Price,
        [Required] DateTime StartDate,
        DateTime? EndDate,
        [Required] int SubscriptionId
    );
}  