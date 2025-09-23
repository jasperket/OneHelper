using OneHelper.Models;

namespace OneHelper.Repository.Interfaces
{
    public interface ISleepLogRepository : IGenericRepository<SleepLog>
    {
        Task<IEnumerable<IGrouping<int, SleepLog>>> GetSleepPeriod(int numberOfDays);
        Task<IEnumerable<SleepLog>> GetAllUserSleepLogs(int userId);
    }
}
