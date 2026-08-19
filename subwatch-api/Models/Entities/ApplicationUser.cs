using Microsoft.AspNetCore.Identity;

namespace SubwatchApi.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
        public ICollection<SubscriptionCategory> SubscriptionCategories { get; set; } = new List<SubscriptionCategory>();
    }
}