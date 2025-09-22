
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
        private readonly int PERIOD_OF_SLEEP = 14;
        public SleepAnalysisService(ISleepLogService service, UserManager<User> manager)
        {
            _sleepService = service;
            _manager = manager;
        }
        public async Task<SleepAnalysisDto> AnalyzeSleep(int userId)
        {
            var userRecord = await _manager.FindByIdAsync(Convert.ToString(userId)) ?? throw new Exception("User is null");

            Console.WriteLine($"Person age {userRecord.GetAge()}//{userRecord.FirstName}//{userRecord.LastName}");
            Console.WriteLine($"THIS IS A TEST {OneHelperStatic.SleepAgeGroup[OneHelperStatic.GetTitle(userRecord.GetAge())]}");
            var optimalSleepDuration = OneHelperStatic.SleepAgeGroup[OneHelperStatic.GetTitle(userRecord.GetAge()) 
                                        ?? throw new Exception("Title is invalid")];
            Console.WriteLine($"Optimal sleep duration {optimalSleepDuration}");
            var sleepRecord = await _sleepService.GetSleepPeriod(PERIOD_OF_SLEEP);
            Console.Write($"Count {sleepRecord.Count()}  ");
            
            // total sleep in minutes for a user
            var totalSleepInMinutes = (sleepRecord.Select(i => new { TotalMinutes = (i.EndTime - i.StartTime) })
                                                 .Sum(i => i.TotalMinutes?.TotalMinutes)) ?? throw new Exception("Total sleep is null");
            Console.WriteLine($"Total minutes {totalSleepInMinutes}");

            // optimal sleep duration total minutes
            var optimalSleepInMinutes = optimalSleepDuration / 60 * sleepRecord.Count();
            Console.WriteLine($"Optimal Sleep in minutes {optimalSleepInMinutes}");
            var sleepResult = optimalSleepInMinutes - totalSleepInMinutes;

            return new SleepAnalysisDto(sleepResult, sleepResult switch
            {
                <= 60 => SleepThreshold.GREEN,
                <= 150 => SleepThreshold.YELLOW,
                <= 300 => SleepThreshold.ORANGE,
                > 300 => SleepThreshold.RED,
                _ => throw new Exception("Sleep result is null, and cannot be processed")
            });
        }

    }
}
