using OneHelper.Models;

namespace OneHelper.Repository.Interfaces
{
    public interface ITodoRepository : IGenericRepository<ToDo>
    {
        Task<IEnumerable<ToDo>> GetAllUserToDos(int userId);
    }
}
