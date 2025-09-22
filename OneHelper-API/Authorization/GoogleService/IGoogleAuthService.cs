using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.Identity.Client;
using OneHelper.Authorization;
using OneHelper.Authorization.Interface;

namespace OneHelper.Authorization.GoogleService
{
    public interface IGoogleAuthService : IAuthService<AuthenticateResult, ExternalLoginInfo>
    {
    }
}
