using System.ComponentModel.DataAnnotations;

namespace SubwatchApi.Models.DTOs
{
    public record CreateSubscriptionCategoryResponse
    (
        int Id,
        string Title,
        string? Description
    );
}