using Microsoft.AspNetCore.Authorization;

namespace Api.Authorization
{
    public static class AuthorizationPolicies
    {
        public static void Configure(AuthorizationOptions options)
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
        }
    }
}