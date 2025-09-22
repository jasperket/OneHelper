namespace OneHelper.Static
{
    public static class OneHelperStatic
    {
        public static string? GetTitle(int age) => age switch
        {
            >= 18 => "Adult",
            >= 13 => "Teenager",
            >= 6 => "Children",
            >= 3 => "Children-5-Below",
            >= 1 => "Children-2-Below",
            >= 0 => "Newbord",
            _ => throw new Exception("Age is invalid")
        };

        public static readonly Dictionary<string, int> SleepAgeGroup = new()
        {
            { "Adult", 8 }, {"Teenager", 9}, {"Children", 10}, {"Children-5-Below", 11}, {"Children-2-Below", 12}, {"Newborn", 14}
        };

    }
}
