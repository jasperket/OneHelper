using OneHelper.Dto;
using OneHelper.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OneHelper.Services.ToDoService
{
    public interface IToDoService
    {

        public Task<IEnumerable<ToDoResponse>> GetAllToDosAsync(int userId);

        public Task<ToDoResponse?> GetToDoByIdAsync(int id);

        public Task AddToDoAsync(ToDoRequest item, int userId);
        public Task UpdateToDoAsync(int id,ToDoRequest item);
        public Task DeleteToDoAsync(int id);
        public Task<IEnumerable<ToDoResponse>> GetUpcomingToDosAsync(int userId, DateTime? startDate = null);
    }
}
