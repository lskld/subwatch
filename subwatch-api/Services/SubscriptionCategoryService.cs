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
        public async Task<List<SubscriptionCategoryResponse>> GetAllAsync(string userId)
        {
            return await dbContext.SubscriptionCategories
                .Where(c => c.UserId == userId)
                .Select(c => new SubscriptionCategoryResponse(c.Id, c.Title, c.Description))
                .ToListAsync();
        }

        public async Task<SubscriptionCategoryResponse?> UpdateAsync(int id, UpdateSubscriptionCategoryRequest req, string userId)
        {
            var category = await dbContext.SubscriptionCategories
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (category is null) return null;

            category.Title = req.Title;
            category.Description = req.Description;

            await dbContext.SaveChangesAsync();

            return new SubscriptionCategoryResponse(category.Id, category.Title, category.Description);
        }

        public async Task<bool> DeleteAsync(int id, string userId)
        {
            var category = await dbContext.SubscriptionCategories
                .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);

            if (category is null) return false;

            dbContext.SubscriptionCategories.Remove(category);
            await dbContext.SaveChangesAsync();
            return true;
        }
    }
}