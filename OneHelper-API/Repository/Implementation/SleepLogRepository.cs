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

        public async Task<IEnumerable<SleepLog>> GetSleepPeriod(int numberOfDays)
        {
            return (await _dbSet.ToListAsync()).OrderByDescending(i => i.StartTime)
                .Skip(1)
                .Take(numberOfDays)
                .ToList();
        }

        public async Task<IEnumerable<SleepLog>> GetAllUserSleepLogs(int userId) => await _dbSet.Where(i => i.UserId == userId).ToListAsync();
       
    }
}
