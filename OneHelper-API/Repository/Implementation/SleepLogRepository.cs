using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using OneHelper.Dto;
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

        public async Task<SleepLog?> GetActiveSleepLog(int userId)
        {
            var result = await _dbSet.Where(i => i.UserId == userId && i.EndTime == null).FirstOrDefaultAsync();
            return result;
        }

        public async Task<IEnumerable<SleepHoursDto>> GetSleepHoursForPeriod(int numberOfDays, int userId)
        {
            // Step 1: Limit by user + EndTime, and only select recent days (optimization)
            var recentLogs = await _dbSet
                .Where(i => i.UserId == userId && i.EndTime != null)
                .OrderByDescending(i => i.StartTime)
                .Take(numberOfDays * 2) // fetch a bit more in case of multiple logs per day
                .ToListAsync();

            // Step 2: Perform the grouping and time difference in memory
            var grouped = recentLogs
                .GroupBy(i => i.StartTime.Date)
                .Select(g => new SleepHoursDto(
                    g.Key,
                    g.Sum(x => (x.EndTime!.Value - x.StartTime).TotalMinutes) / 60.0
                ))
                .OrderByDescending(x => x.Date)
                .Take(numberOfDays)
                .OrderBy(x => x.Date); // final order chronological for the chart

            return grouped;
        }



    }
}
