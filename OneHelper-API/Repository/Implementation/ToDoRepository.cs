using Microsoft.EntityFrameworkCore;
using OneHelper.Models;
using OneHelper.Repository.Interfaces;

namespace OneHelper.Repository.UserRepository
{
    public class ToDoRepository : GenericRepository<ToDo>, ITodoRepository
    {
        public ToDoRepository(OneHelperContext context) : base(context)
        {

        }

        public async Task<IEnumerable<ToDo>> GetAllUserToDos(int userId) => await _dbSet.Where(i => i.UserId == userId).ToListAsync();
    }
}
