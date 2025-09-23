using OneHelper.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OneHelper.Repository.Interfaces
{
    public interface ITodoRepository : IGenericRepository<ToDo>
    {
        Task<IEnumerable<ToDo>> GetUpcomingAsync(int userId, DateTime startDate, DateTime endDate);
        Task<IEnumerable<ToDo>> GetAllUserToDos(int userId);

    }
}
