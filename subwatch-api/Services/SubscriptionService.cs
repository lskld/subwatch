using Microsoft.EntityFrameworkCore;
using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;
using SubwatchApi.Models.Enums;

namespace SubwatchApi.Services
{
    public class SubscriptionService(SubwatchDbContext dbContext) : ISubscriptionService
    {
        public async Task<SubscriptionResponse> CreateAsync(CreateSubscriptionRequest req, string userId)
        {
            var category = await dbContext.SubscriptionCategories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == req.SubscriptionCategoryId && c.UserId == userId)
                ?? throw new UnauthorizedAccessException();

            var subscription = new Subscription
            {
                Title = req.Title,
                Description = req.Description,
                Price = req.Price,
                BillingInterval = req.BillingInterval,
                NextBillingDate = req.NextBillingDate,
                SubscriptionCategoryId = req.SubscriptionCategoryId,
                UserId = userId
            };

            var priceHistory = new PriceHistory
            {
                Price = subscription.Price,
                StartDate = DateTime.UtcNow,
                EndDate = null,
                Subscription = subscription
            };

            dbContext.PriceHistories.Add(priceHistory);
            dbContext.Subscriptions.Add(subscription);
            await dbContext.SaveChangesAsync();

            return new SubscriptionResponse(
                subscription.Id,
                subscription.Title,
                subscription.Description,
                subscription.Price,
                subscription.BillingInterval,
                subscription.NextBillingDate,
                new SubscriptionCategoryResponse(
                        category.Id,
                        category.Title,
                        category.Description
                    )
            );
        }
        public async Task<SubscriptionResponse?> GetByIdAsync(int id, string userId)
        {
            var subscription = await dbContext.Subscriptions
                .Include(s => s.SubscriptionCategory)
                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);

            if (subscription is null)
                return null;

            if (AdvanceIfOverdue(subscription))
                await dbContext.SaveChangesAsync();

            return new SubscriptionResponse(
                subscription.Id,
                subscription.Title,
                subscription.Description,
                subscription.Price,
                subscription.BillingInterval,
                subscription.NextBillingDate,
                new SubscriptionCategoryResponse(
                    subscription.SubscriptionCategory.Id,
                    subscription.SubscriptionCategory.Title,
                    subscription.SubscriptionCategory.Description
                )
            );
        }
        public async Task<List<SubscriptionResponse>> GetAllAsync(string userId)
        {
            var subscriptions = await dbContext.Subscriptions
                .Include(s => s.SubscriptionCategory)
                .Where(s => s.UserId == userId)
                .ToListAsync();

            var anyUpdated = false;
            foreach (var subscription in subscriptions)
            {
                if (AdvanceIfOverdue(subscription))
                    anyUpdated = true;
            }

            if (anyUpdated)
                await dbContext.SaveChangesAsync();

            return subscriptions.Select(s => new SubscriptionResponse(
                    s.Id,
                    s.Title,
                    s.Description,
                    s.Price,
                    s.BillingInterval,
                    s.NextBillingDate,
                    new SubscriptionCategoryResponse(
                        s.SubscriptionCategory.Id,
                        s.SubscriptionCategory.Title,
                        s.SubscriptionCategory.Description
                    ))).ToList();
        }

        public async Task<SubscriptionResponse?> UpdateAsync(int id, UpdateSubscriptionRequest req, string userId)
        {
            var subscription = await dbContext.Subscriptions
                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);

            if (subscription is null) return null;

            var category = await dbContext.SubscriptionCategories
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == req.SubscriptionCategoryId && c.UserId == userId)
                ?? throw new UnauthorizedAccessException();

            subscription.Title = req.Title;
            subscription.Description = req.Description;
            subscription.Price = req.Price;
            subscription.BillingInterval = req.BillingInterval;
            subscription.NextBillingDate = req.NextBillingDate;
            subscription.SubscriptionCategoryId = req.SubscriptionCategoryId;

            await dbContext.SaveChangesAsync();

            return new SubscriptionResponse(
                subscription.Id,
                subscription.Title,
                subscription.Description,
                subscription.Price,
                subscription.BillingInterval,
                subscription.NextBillingDate,
                new SubscriptionCategoryResponse(
                    category.Id,
                    category.Title,
                    category.Description
                )
            );
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var subscription = await dbContext.Subscriptions
                .FirstOrDefaultAsync(s => s.Id == id && s.UserId == userId);

            if (subscription is null) return false;

            dbContext.Subscriptions.Remove(subscription);
            await dbContext.SaveChangesAsync();
            return true;
        }

        private static bool AdvanceIfOverdue(Subscription subscription)
        {
            var advanced = false;
            while (subscription.NextBillingDate <= DateTime.UtcNow)
            {
                subscription.NextBillingDate = subscription.BillingInterval switch
                {
                    BillingInterval.Weekly => subscription.NextBillingDate.AddDays(7),
                    BillingInterval.BiWeekly => subscription.NextBillingDate.AddDays(14),
                    BillingInterval.Monthly => subscription.NextBillingDate.AddMonths(1),
                    BillingInterval.Quarterly => subscription.NextBillingDate.AddMonths(3),
                    BillingInterval.Yearly => subscription.NextBillingDate.AddYears(1),
                    _ => subscription.NextBillingDate
                };
                advanced = true;
            }
            return advanced;
        }
    }
}