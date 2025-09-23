using OneHelper.Models;

namespace OneHelper.Repository.Interfaces
{
    public interface ISleepLogRepository : IGenericRepository<SleepLog>
    {
        Task<IEnumerable<IGrouping<DateTime, SleepLog>>> GetSleepPeriod(int numberOfDays, int userId);
        Task<IEnumerable<SleepLog>> GetAllUserSleepLogs(int userId);
    }
}
