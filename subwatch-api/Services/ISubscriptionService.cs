using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface ISubscriptionService
    {
        Task<SubscriptionResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId);
        Task<SubscriptionResponse?> GetByIdAsync(int id, string userId);
        Task<List<SubscriptionResponse>> GetAllAsync(string userId);
    }
}