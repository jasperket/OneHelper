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

        public async Task<IEnumerable<IGrouping<DateTime, SleepLog>>> GetSleepPeriod(int numberOfDays, int userId)
        {
            var result = await _dbSet.Where(i => i.UserId == userId)
                                .ToListAsync();
            return result.GroupBy(i => i.StartTime.Date)
                        .OrderByDescending(i => i.Key)
                        .Take(numberOfDays);
        }

        public async Task<IEnumerable<SleepLog>> GetAllUserSleepLogs(int userId) => await _dbSet.Where(i => i.UserId == userId).ToListAsync();
       
    }
}
