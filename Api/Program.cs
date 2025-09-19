using Application;
using Infrastructure;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using System;
using System.Text;
using Api.Middleware;
using Api.Authentication;
using Api.Swagger;

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
builder.Services.AddJwtAuthentication(builder.Configuration);

// Autorización basada en políticas para permisos
builder.Services.AddAuthorization(options =>
{
    Api.Authorization.AuthorizationPolicies.Configure(options);
});

// Swagger
builder.Services.AddSwaggerDocumentation();

// Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

app.UseSerilogRequestLogging();

// Registrar middleware de manejo global de excepciones
app.UseExceptionHandling();

if (app.Environment.IsDevelopment())
{
    app.UseSwaggerDocumentation(app.Environment);
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
