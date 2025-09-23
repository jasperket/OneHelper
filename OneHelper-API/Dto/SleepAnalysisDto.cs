using OneHelper.Enums;

namespace OneHelper.Dto
{
    public sealed record SleepAnalysisDto(double SleepDebt, SleepThreshold Status);
}
