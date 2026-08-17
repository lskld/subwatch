namespace SubwatchApi.Models.Entities
{
    public class SubscriptionCategory
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }

        public string UserId { get; set; } = string.Empty;
        public ApplicationUser User { get; set; } = null!;

        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
    }
}