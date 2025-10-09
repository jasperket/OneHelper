using OneHelper.Dto;

namespace OneHelper.Services.SleepAnalysisService
{
    public interface ISleepAnalysisService
    {
        Task<SleepAnalysisDto> AnalyzeSleep(int userId);
        Task<IEnumerable<SleepHoursDto>> GetSleepHoursForPeriod(int numberOfDays, int userId);
    }
}
