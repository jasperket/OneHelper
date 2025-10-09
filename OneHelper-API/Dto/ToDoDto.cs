namespace OneHelper.Dto
{
    public sealed record ToDoRequest(
        string Title, string? Description, string ToDoType, int ComplexityScore,
        DateTime StartTime, DateTime EndTime,
        int PriorityLevel, bool IsCompleted
     );
        
    public sealed record ToDoResponse(
        int Id, string Title, string? Description, string ToDoType, int ComplexityScore,
        DateTime StartTime, DateTime EndTime, int PriorityLevel, bool? IsCompleted
     );

    public sealed record ToDoWithScoresResponse(
    int Id, string Title, string? Description, string ToDoType, int ComplexityScore,
    DateTime StartTime, DateTime EndTime, int PriorityLevel, bool? IsCompleted, double? PriorityScore
 );
}
