using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public class PriceHistoryService : IPriceHistoryService
    {
        public Task<PriceHistoryResponse> CreateAsync(CreatePriceHistoryRequest req, string userId)
        {
            throw new NotImplementedException();
        }
        public Task<PriceHistoryResponse?> GetByIdAsync(int id, string userId)
        {
            throw new NotImplementedException();
        }
        public Task<List<PriceHistoryResponse>> GetAllBySubscriptionIdAsync(string subscriptionId, string userId)
        {
            throw new NotImplementedException();
        }
        public Task<PriceHistoryResponse?> UpdateAsync(int id, UpdatePriceHistoryRequest req, string userId)
        {
            throw new NotImplementedException();
        }
        public Task<bool> DeleteAsync(int id, string userId)
        {
            throw new NotImplementedException();
        }
    }
}