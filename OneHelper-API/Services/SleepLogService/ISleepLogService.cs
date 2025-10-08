using OneHelper.Dto;
using OneHelper.Models;

namespace OneHelper.Services.SleepLogService
{
    public interface ISleepLogService
    {
        Task<IEnumerable<SleepResponse>> GetAllSleepLogAsync(int userId);
        Task<SleepResponse?> GetSleepLogByIdAsync(int id);
        Task AddSleepLogAsync(SleepRequest item, int userId);
        Task UpdateSleepLogAsync(int id, SleepRequest item);
        Task DeleteSleepLogAsync(int id);
        Task<IEnumerable<GroupedSleepResponsesDto>> GetSleepPeriod(int numberOfDays, int userId);
        Task<SleepResponse?> GetActiveSleepLog(int userId);
    }
}