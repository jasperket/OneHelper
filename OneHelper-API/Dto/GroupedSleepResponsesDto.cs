namespace OneHelper.Dto
{
    public sealed record GroupedSleepResponsesDto(int Key, IEnumerable<SleepResponse> Items);
}
