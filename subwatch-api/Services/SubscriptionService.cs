using Microsoft.EntityFrameworkCore;
using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class SubscriptionService(SubwatchDbContext dbContext) : ISubscriptionService
    {
        public async Task<SubscriptionResponse> CreateAsync(CreateSubscriptionRequest req, string userId)
        {
            var category = await dbContext.SubscriptionCategories
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
            return await dbContext.Subscriptions
                .Where(s => s.Id == id && s.UserId == userId)
                .Select(s => new SubscriptionResponse(
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
                    )
                )).FirstOrDefaultAsync();
        }
        public async Task<List<SubscriptionResponse>> GetAllAsync(string userId)
        {
            return await dbContext.Subscriptions
                .Where(s => s.UserId == userId)
                .Select(s => new SubscriptionResponse(
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
                    )
                )).ToListAsync();
        }
    }
}