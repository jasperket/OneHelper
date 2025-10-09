
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using OneHelper.Dto;
using OneHelper.Enums;
using OneHelper.Models;
using OneHelper.Services.SleepLogService;
using OneHelper.Static;

namespace OneHelper.Services.SleepAnalysisService
{
    public class SleepAnalysisService : ISleepAnalysisService
    {
        private readonly ISleepLogService _sleepService;
        private readonly UserManager<User> _manager;
        private readonly int PERIOD_OF_SLEEP = 7;
        public SleepAnalysisService(ISleepLogService service, UserManager<User> manager)
        {
            _sleepService = service;
            _manager = manager;
        }
        public async Task<SleepAnalysisDto> AnalyzeSleep(int userId)
        {
            var userRecord = await _manager.FindByIdAsync(Convert.ToString(userId)) ?? throw new Exception("User is null");

            Console.WriteLine($"Person age {userRecord.GetAge()}//{userRecord.FirstName}//{userRecord.LastName}");
            Console.WriteLine($"THIS IS A TEST {OneHelperStatic.SleepAgeGroup[OneHelperStatic.GetTitle(userRecord.GetAge())!]}");
            var optimalSleepDuration = OneHelperStatic.SleepAgeGroup[OneHelperStatic.GetTitle(userRecord.GetAge())
                                        ?? throw new Exception("Title is invalid")];
            Console.WriteLine($"Optimal sleep duration {optimalSleepDuration}");
            var sleepRecord = await _sleepService.GetSleepPeriod(PERIOD_OF_SLEEP, userId);
            Console.Write($"Count {sleepRecord.Count()}  ");

            if (sleepRecord == null || !sleepRecord.Any())
            {
                throw new InvalidOperationException("No sleep logs found.");
            }

            // total sleep in minutes for a user
            var totalSleepInMinutes = GetTotalSleepMinutes(sleepRecord);
            Console.WriteLine($"Total minutes {totalSleepInMinutes}");

            // optimal sleep duration total minutes
            var optimalSleepInMinutes = optimalSleepDuration * 60 * sleepRecord.Count();
            Console.WriteLine($"Optimal sleep duration {optimalSleepDuration} / 60 * {sleepRecord.Count()}");
            Console.WriteLine($"Optimal Sleep in minutes {optimalSleepInMinutes} - {totalSleepInMinutes} = {optimalSleepInMinutes - totalSleepInMinutes}");
            var sleepResult = (double)optimalSleepInMinutes - totalSleepInMinutes;
            return new SleepAnalysisDto(sleepResult, sleepResult switch
            {
                <= 60 => SleepThreshold.GREEN,
                <= 150 => SleepThreshold.YELLOW,
                <= 300 => SleepThreshold.ORANGE,
                > 300 => SleepThreshold.RED,
                _ => throw new Exception("Sleep result is null, and cannot be processed")
            });
        }


        private double GetTotalSleepMinutes(IEnumerable<GroupedSleepResponsesDto> sleepRecord)
        {
            var sleepGroupTotal = new List<double>();
            foreach (var group in sleepRecord)
            {
                double? totalMinutes = 0;
                foreach (var sleepLog in group.Items)
                {
                    Console.WriteLine($"{sleepLog.EndTime} - {sleepLog.StartTime} || {sleepLog.EndTime - sleepLog.StartTime}");
                    TimeSpan? time = (sleepLog.EndTime - sleepLog.StartTime);
                    totalMinutes += (time?.TotalMinutes) ?? 0;
                }
                sleepGroupTotal.Add(totalMinutes ?? 0);
            }
            return sleepGroupTotal.Sum();
        }
    }
}
