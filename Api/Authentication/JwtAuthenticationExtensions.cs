using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Api.Authentication
{
    public static class JwtAuthenticationExtensions
    {
        public static IServiceCollection AddJwtAuthentication(this IServiceCollection services, IConfiguration configuration)
        {
            var keyString = configuration["Jwt:Key"] ?? "dev-secret-key-secure-default-2024";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(keyString));

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(o =>
                {
                    o.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
                        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
                    };

                    // Aceptar tokens con o sin prefijo "Bearer"
                    o.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var token = context.Request.Headers["Authorization"].FirstOrDefault();
                            if (!string.IsNullOrEmpty(token))
                            {
                                if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
                                {
                                    context.Token = token.Substring("Bearer ".Length).Trim();
                                }
                                else
                                {
                                    context.Token = token;
                                }
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            return services;
        }
    }
}