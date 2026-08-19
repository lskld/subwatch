using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record SubscriptionCategoryResponse
    (
        int Id,
        string Title,
        string? Description
    );
}