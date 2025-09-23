namespace OneHelper.Dto
{
    public sealed record GroupedSleepResponsesDto(DateTime Key, IEnumerable<SleepResponse> Items);
}
