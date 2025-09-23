using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OneHelper.Services.SleepAnalysisService;
using System.Security.Claims;

namespace OneHelper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SleepAnalysisController : ControllerBase
    {
        private readonly ISleepAnalysisService _sleepAnalysisService;
        public SleepAnalysisController(ISleepAnalysisService service)
        {
            _sleepAnalysisService = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetSleepSleepAnalysisResult()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var result = await _sleepAnalysisService.AnalyzeSleep(Convert.ToInt32(userId));
                return Ok(new {result});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
