using SubwatchApi.Models.Enums;

namespace SubwatchApi.Models.DTOs
{
    public record SubscriptionResponse
    (
        int Id,
        string Title,
        string? Description,
        decimal Price,
        BillingInterval BillingInterval,
        DateTime NextBillingDate,
        SubscriptionCategoryResponse SubscriptionCategoryResponse
    );
}