using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public class SubscriptionService(SubwatchDbContext dbContext) : ISubscriptionService
    {
        public async Task<SubscriptionResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<SubscriptionResponse>> GetAllAsync(string userId)
        {
            throw new NotImplementedException();
        }

        public async Task<SubscriptionResponse?> GetByIdAsync(int id, string userId)
        {
            throw new NotImplementedException();
        }
    }
}