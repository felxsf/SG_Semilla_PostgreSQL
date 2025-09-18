using Application;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System;
using System.Text;
using Api.Middleware;

// Método principal asíncrono
return await Main(args);

async Task<int> Main(string[] args)
{
    var builder = WebApplication.CreateBuilder(args);

// Serilog
builder.Host.UseSerilog((ctx, lc) =>
{
	lc.ReadFrom.Configuration(ctx.Configuration)
	  .Enrich.FromLogContext()
	  .WriteTo.Console();
});

// Registrar servicios de aplicación
builder.Services.AddApplicationServices();

// Registrar servicios de infraestructura
builder.Services.AddInfrastructureServices(builder.Configuration);

// Controllers + Validation
builder.Services.AddControllers();

// Servicios de la API
builder.Services.AddScoped<Api.Services.LdapService>();
builder.Services.AddScoped<Api.Services.UserService>();
builder.Services.AddScoped<Api.Services.RoleService>();
builder.Services.AddScoped<Api.Services.PermissionService>();

// CORS (permitir cualquier origen)
builder.Services.AddCors(opt =>
{
	opt.AddPolicy("Default", p => p
		.AllowAnyOrigin()
		.AllowAnyHeader()
		.AllowAnyMethod());
});

// Auth (JWT con validación de permisos)
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? "dev-secret-key-secure-default-2024"));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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
		
		// Configurar para aceptar tokens sin el prefijo "Bearer"
		o.Events = new JwtBearerEvents
		{
			OnMessageReceived = context =>
			{
				var token = context.Request.Headers["Authorization"].FirstOrDefault();
				if (!string.IsNullOrEmpty(token))
				{
					// Si el token ya tiene el prefijo "Bearer ", lo usamos tal como está
					if (token.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase))
					{
						context.Token = token.Substring("Bearer ".Length).Trim();
					}
					// Si no tiene el prefijo, asumimos que es solo el token
					else
					{
						context.Token = token;
					}
				}
				return Task.CompletedTask;
			}
		};
	});

// Autorización basada en políticas para permisos
builder.Services.AddAuthorization(options =>
{
	// Políticas basadas en permisos para usuarios
	options.AddPolicy("CanReadUsers", policy => policy.RequireClaim("permission", "users.read"));
	options.AddPolicy("CanWriteUsers", policy => policy.RequireClaim("permission", "users.write"));
	options.AddPolicy("CanDeleteUsers", policy => policy.RequireClaim("permission", "users.delete"));
	
	// Políticas basadas en permisos para contenido
	options.AddPolicy("CanReadContent", policy => policy.RequireClaim("permission", "content.read"));
	options.AddPolicy("CanWriteContent", policy => policy.RequireClaim("permission", "content.write"));
	options.AddPolicy("CanDeleteContent", policy => policy.RequireClaim("permission", "content.delete"));
	
	// Políticas basadas en permisos para roles
	options.AddPolicy("CanReadRoles", policy => policy.RequireClaim("permission", "roles.read"));
	options.AddPolicy("CanWriteRoles", policy => policy.RequireClaim("permission", "roles.write"));
	options.AddPolicy("CanDeleteRoles", policy => policy.RequireClaim("permission", "roles.delete"));
	
	// Políticas basadas en permisos para permisos
	options.AddPolicy("CanReadPermissions", policy => policy.RequireClaim("permission", "permissions.read"));
	options.AddPolicy("CanWritePermissions", policy => policy.RequireClaim("permission", "permissions.write"));
	options.AddPolicy("CanDeletePermissions", policy => policy.RequireClaim("permission", "permissions.delete"));
});

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
	c.SwaggerDoc("v1", new OpenApiInfo { 
		Title = "SG_Semilla API", 
		Version = "v1",
		Description = "API de ejemplo con Clean Architecture + CQRS"
	});
	
	// Configuración para JWT en Swagger
	c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
	{
		Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
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
			new string[] { }
		}
	});
});

// Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseSerilogRequestLogging();

// Registrar middleware de manejo global de excepciones
app.UseExceptionHandling();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseCors("Default");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHealthChecks("/health");

// Aplicar migraciones y sembrar datos iniciales al iniciar
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var logger = services.GetRequiredService<ILogger<Program>>();
    
    try
    {
        // Aplicar migraciones
        var dbContext = services.GetRequiredService<Infrastructure.Persistence.AppDbContext>();
        dbContext.Database.Migrate();
        logger.LogInformation("Migraciones aplicadas correctamente");
        
        // Sembrar datos iniciales
        var dataSeeder = services.GetRequiredService<Infrastructure.Persistence.DataSeeder>();
        await dataSeeder.SeedAsync();
        logger.LogInformation("Datos iniciales sembrados correctamente");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error durante la inicialización de la base de datos");
    }
}

app.Run();
    return 0;
}
