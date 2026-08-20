using SubwatchApi.Models.DTOs;

namespace SubwatchApi.Services
{
    public interface IPriceHistoryService
    {
        Task<PriceHistoryResponse> CreateAsync(CreatePriceHistoryRequest req, string userId);
        Task<PriceHistoryResponse?> GetByIdAsync(int id, string userId);
        Task<List<PriceHistoryResponse>> GetAllBySubscriptionIdAsync(int subscriptionId, string userId);
        Task<PriceHistoryResponse?> UpdateAsync(int id, UpdatePriceHistoryRequest req, string userId);
        Task<bool> DeleteAsync(int id, string userId);
    }
}