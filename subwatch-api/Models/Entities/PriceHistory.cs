namespace SubwatchApi.Models.Entities
{
    public class PriceHistory
    {
        public int Id { get; set; }
        public decimal Price { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public int SubscriptionId { get; set; }
        public Subscription Subscription { get; set; } = null!;
    }
}
