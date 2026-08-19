using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface ISubscriptionCategoryService
    {
        Task<SubscriptionCategoryResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId);
        Task<SubscriptionCategoryResponse?> GetByIdAsync(int id, string userId);
    }
}