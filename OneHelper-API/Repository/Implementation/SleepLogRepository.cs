using System.Text.Json;
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
            var startDate = DateTime.Today.AddDays(-numberOfDays);
            var result = await _dbSet.Where(i => i.UserId == userId
            && i.EndTime != null
            && i.StartTime >= startDate
            && i.StartTime <= DateTime.Today
            ).ToListAsync();

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
            var startDate = DateTime.Today.AddDays(-numberOfDays);
            var recentLogs = await _dbSet
                .Where(i => i.UserId == userId
                            && i.EndTime != null
                            && i.StartTime >= startDate)
                .ToListAsync();

            // Group and calculate hours client-side
            var grouped = recentLogs
                .GroupBy(i => i.StartTime.Date)
                .Select(g => new SleepHoursDto(
                    g.Key,
                    Math.Round(g.Sum(x => (x.EndTime!.Value - x.StartTime).TotalMinutes) / 60.0, 2)
                ))
                .OrderBy(x => x.Date); // chronological order

            return grouped;
        }
    }
}
