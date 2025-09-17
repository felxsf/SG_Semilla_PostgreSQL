using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using Api.Services;

namespace Api.Authorization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true)]
    public class RequirePermissionAttribute : TypeFilterAttribute
    {
        public RequirePermissionAttribute(string permission) : base(typeof(PermissionAuthorizationFilter))
        {
            Arguments = new object[] { permission };
        }
    }

    public class PermissionAuthorizationFilter : IAuthorizationFilter
    {
        private readonly string _permission;
        private readonly UserService _userService;

        public PermissionAuthorizationFilter(string permission, UserService userService)
        {
            _permission = permission;
            _userService = userService;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // Verificar si el usuario está autenticado
            if (!context.HttpContext.User.Identity?.IsAuthenticated ?? true)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            // Obtener el rol del usuario
            var role = context.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value;

            if (string.IsNullOrEmpty(role))
            {
                context.Result = new ForbidResult();
                return;
            }

            // Obtener los permisos del rol
            var permissions = _userService.GetPermissionsByRole(role);

            // Verificar si el usuario tiene el permiso requerido
            if (!permissions.Contains(_permission))
            {
                context.Result = new ForbidResult();
            }
        }
    }
}