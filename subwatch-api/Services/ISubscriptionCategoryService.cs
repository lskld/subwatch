using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface ISubscriptionCategoryService
    {
        Task<SubscriptionCategoryResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId);
        Task<SubscriptionCategoryResponse?> GetByIdAsync(int id, string userId);
        Task<List<SubscriptionCategoryResponse>> GetAllAsync(string userId);
        Task<SubscriptionCategoryResponse?> UpdateAsync(int id, UpdateSubscriptionCategoryRequest req, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }
}