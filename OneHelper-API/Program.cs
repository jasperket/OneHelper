using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using OneHelper.Authorization.AccountService;
using OneHelper.Authorization.GoogleService;
using OneHelper.Authorization.Interface;
using OneHelper.Dto;
using OneHelper.Mapper;
using OneHelper.Models;
using OneHelper.Repository.Interfaces;
using OneHelper.Repository.UserRepository;
using OneHelper.Services;
using OneHelper.Services.SleepLogService;
using OneHelper.Services.ToDoService;
using OneHelper.Services.TokenService;
using OneHelper.Validators;
using System.Text;

string ViteDevelopmentName = "Onehelper Frontend Development";
string ViteDevelopmentOrigin = "http://localhost:5173";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: ViteDevelopmentName,
                      policy =>
                      {
                          policy.WithOrigins(ViteDevelopmentOrigin).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
                      });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen(c =>
{
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the bearer scheme. Example: \"Authorization: Bearer {token}\"",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddDbContext<OneHelperContext>(options =>
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<ITodoRepository, ToDoRepository>();
builder.Services.AddScoped<ISleepLogRepository, SleepLogRepository>();
builder.Services.AddScoped<IToDoService, ToDoService>();
builder.Services.AddScoped<ISleepLogService, SleepLogService>();
builder.Services.AddScoped<IAuthService<LoginDto, RegisterDto>, AccountService>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IGoogleAuthService, GoogleAuthService>();
builder.Services.AddValidatorsFromAssemblyContaining<ToDoDtoValidator>();

builder.Services.AddIdentityCore<User>(i =>
{
    i.User.RequireUniqueEmail = true;
    i.Password.RequireNonAlphanumeric = false;
})
    .AddEntityFrameworkStores<OneHelperContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    var secret = builder.Configuration["JwtConfig:Secret"];
    var issuer = builder.Configuration["JwtConfig:ValidIssuer"];
    var audience = builder.Configuration["JwtConfig:ValidAudiences"];

    if (secret is null || issuer is null || audience is null)
    {
        throw new ApplicationException("Jwt is not set in the configuration");
    }
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = audience,
        ValidIssuer = issuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret))
    };
    options.Events = new JwtBearerEvents
    {
        OnMessageReceived = context =>
        {
            if ( context.Request.Cookies.ContainsKey("jwtauth"))
            {
                context.Token = context.Request.Cookies["jwtauth"];
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAutoMapper(i =>
{
    i.AddProfile<ToDoProfile>();
    i.AddProfile<SleepLogProfile>();
    i.AddProfile<UserProfile>();
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<OneHelperContext>();
    db.Database.EnsureCreated(); // or db.Database.Migrate() if using EF migrations
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(ViteDevelopmentName);

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

