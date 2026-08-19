using SubwatchApi.Data;
using SubwatchApi.Models.DTOs;
using SubwatchApi.Models.Entities;

namespace SubwatchApi.Services
{
    public class SubscriptionCategoryService(SubwatchDbContext dbContext) : ISubscriptionCategoryService
    {
        public async Task<CreateSubscriptionCategoryResponse> CreateAsync(CreateSubscriptionCategoryRequest req, string userId)
        {
            var newCategory = new SubscriptionCategory { Title = req.Title, Description = req.Description, UserId = userId };

            dbContext.SubscriptionCategories.Add(newCategory);
            await dbContext.SaveChangesAsync();

            return new CreateSubscriptionCategoryResponse(newCategory.Id, newCategory.Title, newCategory.Description);
        }
    }
}