using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;

namespace OneHelper.Models
{
    public class User : IdentityUser<int>
    {
        public string Gender { get; set; } = string.Empty;
        public DateOnly DateOfBirth { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;

        public decimal Height { get; set; }  // this should be in meters
        public decimal Weight { get; set; }  // this should be in kg

        public ICollection<SleepLog>? SleepLogs { get; set; }
        public ICollection<ToDo>? Todos { get; set; } 


        public int GetAge()
        {
            Console.WriteLine($"{DateOfBirth}// {DateTime.Now} HELLO");
            Console.WriteLine($"CURRENT AGE: {DateTime.Now.Year - DateOfBirth.Year}");
            if (DateTime.Now.Year - DateOfBirth.Year is int age && DateOfBirth <= DateOnly.FromDateTime(DateTime.Today.AddYears(-age)))
            {
                return age;
            }
            return age - 1;
        } 
    }
}
