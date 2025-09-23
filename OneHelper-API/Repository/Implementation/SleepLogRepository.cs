using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using OneHelper.Models;
using OneHelper.Repository.Interfaces;

namespace OneHelper.Repository.UserRepository
{
    public class SleepLogRepository : GenericRepository<SleepLog>, ISleepLogRepository
    {
        public SleepLogRepository(OneHelperContext context) : base(context)
        {
        }

        public async Task<IEnumerable<IGrouping<int,SleepLog>>> GetSleepPeriod(int numberOfDays)
        {
            var result = await _dbSet.AsQueryable()
                                    .OrderByDescending(i => i.StartTime)
                                    .GroupBy(i => i.StartTime.Day)
                                    .ToListAsync();
            return result.Take(numberOfDays);
        }

        public async Task<IEnumerable<SleepLog>> GetAllUserSleepLogs(int userId) => await _dbSet.Where(i => i.UserId == userId).ToListAsync();
       
    }
}
