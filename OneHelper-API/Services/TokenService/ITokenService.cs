using OneHelper.Models;

namespace OneHelper.Services.TokenService
{
    public interface ITokenService
    {
        Task<string?> GenerateToken(User user);
    }
}
