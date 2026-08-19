using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SubwatchApi.Models.Entities;

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Subscription
            builder.Entity<Subscription>()
                .HasIndex(s => new { s.UserId, s.NextBillingDate });

            builder.Entity<Subscription>()
                .Property(s => s.BillingInterval)
                .HasConversion<string>();

            builder.Entity<Subscription>()
                .Property(s => s.Title)
                .HasMaxLength(100);

            builder.Entity<Subscription>()
                .Property(s => s.Price)
                .HasPrecision(18, 2);

            builder.Entity<Subscription>()
                .HasOne(s => s.User)
                .WithMany(u => u.Subscriptions)
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Subscription>()
                .HasOne(s => s.SubscriptionCategory)
                .WithMany(sc => sc.Subscriptions)
                .HasForeignKey(s => s.SubscriptionCategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<SubscriptionCategory>()
                .HasIndex(sc => new { sc.UserId, sc.Title })
                .IsUnique();

            // Subscription Category
            builder.Entity<SubscriptionCategory>()
                .Property(sc => sc.Title)
                .HasMaxLength(100);

            builder.Entity<SubscriptionCategory>()
                .HasOne(sc => sc.User)
                .WithMany(u => u.SubscriptionCategories)
                .HasForeignKey(sc => sc.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Price History
            builder.Entity<PriceHistory>()
                .Property(ph => ph.Price)
                .HasPrecision(18, 2);

            builder.Entity<PriceHistory>()
                .HasOne(ph => ph.Subscription)
                .WithMany(s => s.PriceHistories)
                .HasForeignKey(ph => ph.SubscriptionId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}