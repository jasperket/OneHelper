using Microsoft.EntityFrameworkCore;
using OneHelper.Models;
using OneHelper.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OneHelper.Repository.UserRepository
{
    public class ToDoRepository : GenericRepository<ToDo>, ITodoRepository
    {
        public ToDoRepository(OneHelperContext context) : base(context)
        {

        }


        public async Task<IEnumerable<ToDo>> GetUpcomingAsync(int userId, DateTime startDate, DateTime endDate)
        {
            return await _dbSet
                .Where(todo => todo.UserId == userId && todo.StartTime >= startDate && todo.StartTime < endDate)
                .OrderBy(todo => todo.StartTime)
                .ToListAsync();
        }
        
        public async Task<IEnumerable<ToDo>> GetAllUserToDos(int userId) => await _dbSet.Where(i => i.UserId == userId).ToListAsync();

    }
}
