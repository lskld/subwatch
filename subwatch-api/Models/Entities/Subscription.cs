using SubwatchApi.Models.Enums;

namespace SubwatchApi.Models.Entities
{
    public class Subscription
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public BillingInterval BillingInterval { get; set; }
        public DateTime NextBillingDate { get; set; }

        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;

        public int SubscriptionCategoryId { get; set; }
        public SubscriptionCategory SubscriptionCategory { get; set; } = null!;

        public ICollection<PriceHistory> PriceHistories { get; set; } = new List<PriceHistory>();
    }
}
