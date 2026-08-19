using Microsoft.EntityFrameworkCore;
using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class SubscriptionCategoryService(SubwatchDbContext dbContext) : ISubscriptionCategoryService
    {
        public async Task<SubscriptionCategoryResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId)
        {
            var newCategory = new SubscriptionCategory { Title = req.Title, Description = req.Description, UserId = userId };

            dbContext.SubscriptionCategories.Add(newCategory);
            await dbContext.SaveChangesAsync();

            return new SubscriptionCategoryResponse(newCategory.Id, newCategory.Title, newCategory.Description);
        }

        public async Task<SubscriptionCategoryResponse?> GetByIdAsync(int id, string userId)
        {
            return await dbContext.SubscriptionCategories
                .Where(c => c.Id == id && c.UserId == userId)
                .Select(c => new SubscriptionCategoryResponse(c.Id, c.Title, c.Description))
                .FirstOrDefaultAsync();
        }
    }
}