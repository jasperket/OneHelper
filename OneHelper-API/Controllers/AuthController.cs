﻿using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OneHelper.Models;
using OneHelper.Dto;
using FluentValidation;
using OneHelper.Validators;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using OneHelper.Services;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using OneHelper.Authorization.Interface;
using OneHelper.Authorization.GoogleService;
using Microsoft.AspNetCore.Authorization;

namespace OneHelper.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(ILogger<AuthController> logger, IValidator<RegisterDto> validator,
        IAuthService<LoginDto, RegisterDto> service, IValidator<LoginDto> validatorLogin, IGoogleAuthService googleAuth) : ControllerBase
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IValidator<RegisterDto> _validator = validator;
        private readonly IAuthService<LoginDto, RegisterDto> _accountService = service;
        private readonly IGoogleAuthService _googleAuth = googleAuth;
        private readonly IValidator<LoginDto> _validatorLogin = validatorLogin;

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser(RegisterDto dto)
        {
            try
            {

                var validation = await _validator.ValidateAsync(dto);
                if (!validation.IsValid)
                {
                    return BadRequest(new { validation.Errors });
                }
                var result = await _accountService.Register(dto);
                return Ok(result.Succeeded ? new { result.Succeeded } : new { result.Errors });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            try
            {
                var validation = await _validatorLogin.ValidateAsync(dto);
                if (!validation.IsValid)
                {
                    return BadRequest(new { validation.Errors });
                }
                var token = await _accountService.Login(dto) ?? throw new Exception("Token is invalid");
                Response.Cookies.Append("jwtauth", token, new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true
                });
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }
        }

        [HttpGet("Check")]
        [Authorize]
        public IActionResult Check()
        {
            return Ok(new { authenticated = true, user = User.Identity?.Name });
        }

        [HttpPost("Logout")]
        [Authorize]
        public IActionResult Logout()
        {
            // read token from cookie
            if (!Request.Cookies.TryGetValue("jwtauth", out var token) || string.IsNullOrWhiteSpace(token))
                return BadRequest(new { message = "No valid JWT found" });

            // delete cookie so JwtBearer cannot read it
            Response.Cookies.Delete("jwtauth", new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict // optional, matches login cookie settings
            });

            return Ok(new { message = "Logged out successfully" });
        }

    }
}
