using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface ISubscriptionCategoryService
    {
        Task<CreateSubscriptionCategoryResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId);
    }
}