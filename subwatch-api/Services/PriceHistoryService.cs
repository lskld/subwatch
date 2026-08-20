using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class PriceHistoryService(SubwatchDbContext dbContext) : IPriceHistoryService
    {
        public async Task<PriceHistoryResponse> CreateAsync(CreatePriceHistoryRequest req, string userId)
        {
            if (!await dbContext.Subscriptions.AnyAsync(s => s.Id == req.SubscriptionId && s.UserId == userId))
                throw new UnauthorizedAccessException();

            var priceHistory = new PriceHistory
            {
                Price = req.Price,
                StartDate = req.StartDate,
                EndDate = req.EndDate,
                SubscriptionId = req.SubscriptionId
            };

            dbContext.PriceHistories.Add(priceHistory);
            await dbContext.SaveChangesAsync();

            return new PriceHistoryResponse(priceHistory.Id, priceHistory.Price, priceHistory.StartDate, priceHistory.EndDate, priceHistory.SubscriptionId);
        }
        public async Task<PriceHistoryResponse?> GetByIdAsync(int id, string userId)
        {
            return await dbContext.PriceHistories
                .Where(ph => ph.Id == id && ph.Subscription.UserId == userId)
                .Select(ph => new PriceHistoryResponse(ph.Id, ph.Price, ph.StartDate, ph.EndDate, ph.SubscriptionId))
                .FirstOrDefaultAsync();
        }
        public async Task<List<PriceHistoryResponse>> GetAllBySubscriptionIdAsync(int subscriptionId, string userId)
        {
            return await dbContext.PriceHistories
                .Where(ph => ph.SubscriptionId == subscriptionId && ph.Subscription.UserId == userId)
                .Select(ph => new PriceHistoryResponse(ph.Id, ph.Price, ph.StartDate, ph.EndDate, ph.SubscriptionId))
                .ToListAsync();
        }
        public async Task<PriceHistoryResponse?> UpdateAsync(int id, UpdatePriceHistoryRequest req, string userId)
        {
            var priceHistory = await dbContext.PriceHistories
                .FirstOrDefaultAsync(ph => ph.Id == id && ph.Subscription.UserId == userId);

            if (priceHistory is null) return null;

            priceHistory.Price = req.Price;
            priceHistory.StartDate = req.StartDate;
            priceHistory.EndDate = req.EndDate;

            await dbContext.SaveChangesAsync();

            return new PriceHistoryResponse(priceHistory.Id, priceHistory.Price, priceHistory.StartDate, priceHistory.EndDate, priceHistory.SubscriptionId);
        }
        public async Task<bool> DeleteAsync(int id, string userId)
        {
            throw new NotImplementedException();
        }
    }
}