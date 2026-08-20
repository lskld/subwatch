namespace SubwatchApi.Models.DTOs
{
    public record PriceHistoryResponse 
    (
        int Id,
        decimal Price,
        DateTime StartDate,
        DateTime? EndDate,
        int SubscriptionId
    );
}