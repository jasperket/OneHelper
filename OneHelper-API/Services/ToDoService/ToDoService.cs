using OneHelper.Repository.Interfaces;
using OneHelper.Models;
using OneHelper.Services.ToDoService;
using AutoMapper;
using OneHelper.Dto;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace OneHelper.Services.ToDoService;

public class ToDoService : IToDoService
{
    private readonly ITodoRepository _toDoRepository;
    private readonly IMapper _mapper;

    public ToDoService(ITodoRepository toDoRepository, IMapper mapper)
    {
        _toDoRepository = toDoRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ToDoResponse>> GetAllToDosAsync(int userId)
    {
        return _mapper.Map<IEnumerable<ToDoResponse>>(await _toDoRepository.GetAllUserToDos(userId));
    }

    public async Task<ToDoResponse?> GetToDoByIdAsync(int id)
    {
        var entity = _mapper.Map<ToDoResponse>(await _toDoRepository.GetByIdAsync(id));
        if (entity is null)
        {
            throw new Exception("User not found....");
        }
        return entity;
    }

    public async Task AddToDoAsync(ToDoRequest item, int userId)
    {
        var validatedDto = _mapper.Map<ValidatedToDoDto>(item);
        var moveDtoWithId = validatedDto with { UserId = userId };
        await _toDoRepository.AddAsync(_mapper.Map<ToDo>(moveDtoWithId));
    }

    public async Task UpdateToDoAsync(int id, ToDoRequest item)
    {
        var entity = await _toDoRepository.GetByIdAsync(id);
        if (entity is not null)
        {
            _mapper.Map(item, entity);
            await _toDoRepository.UpdateAsync(entity);
            return;
        }
        throw new Exception($"User {id} is not found in the database....");
    }

    public async Task DeleteToDoAsync(int id)
    {
        await _toDoRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<ToDoResponse>> GetUpcomingToDosAsync(int userId, DateTime? startDate = null)
    {
        var normalizedStart = (startDate ?? DateTime.UtcNow).Date;
        var endDate = normalizedStart.AddDays(6);
        var entities = await _toDoRepository.GetUpcomingAsync(userId, normalizedStart, endDate);
        return _mapper.Map<IEnumerable<ToDoResponse>>(entities);
    }

    public async Task<IEnumerable<ToDoWithScoresResponse>> GetSortedToDoAsync(int userId)
    {
        var todos = await _toDoRepository.GetSortedToDoAsync(userId, DateTime.Now);
        return todos.OrderByDescending(i => (i.ComplexityScore * 0.4) + ((i.PriorityLevel / 3 * 10) * 0.6))
            .Select(b => 
             new ToDoWithScoresResponse(b.Id, b.Title, b.Description, b.ToDoType, b.ComplexityScore, b.StartTime, b.EndTime, b.PriorityLevel, b.IsCompleted,
            (double)(b.ComplexityScore * 0.4) + ((b.PriorityLevel / 3 * 10) * 0.6)))
            .ToList();

    }
}
