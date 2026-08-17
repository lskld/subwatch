using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SubwatchApi.Models.Entites;

namespace SubwatchApi.Data
{
    public class SubwatchDbContext : IdentityDbContext<ApplicationUser>
    {
        public SubwatchDbContext(DbContextOptions<SubwatchDbContext> options) : base(options)
        {

        }
        public DbSet<Subscription> Subscriptions { get; set; }
        public DbSet<SubscriptionCategory> SubscriptionCategories { get; set; }
        public DbSet<PriceHistory> PriceHistories { get; set; }
    }
}