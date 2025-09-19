# SG_Semilla_PostgreSQL — Manual técnico

1) Resumen y alcance
- Monorepo con API REST en .NET 8 + PostgreSQL y frontend Angular (sg-semilla-ui). 
- Autenticación JWT, autorización por permisos, opción de autenticación LDAP. 
- Describamos arquitectura, configuración, servicios, controladores, ejecución y despliegue.

2) Arquitectura
- Capas backend: Domain (entidades), Application (DTOs, validaciones, mapeos, casos de uso), Infrastructure (EF Core, repositorios, seeding), Api (controladores, middleware). 
- Frontend Angular con SSR opcional, Tailwind y proxy al backend en desarrollo. 
- Persistencia: EF Core con migraciones y seeding automático.

3) Backend (.NET)
3.1 Entidades principales (Domain/Entities)
- User: Id, Username, Email, PasswordHash, Salt, RoleId, Role. 
- Role: Id, Name, IsActive, Users, RolePermissions. 
- Permission: Id, Name, Code, Category, IsActive, RolePermissions. 
- RolePermission: RoleId, PermissionId (clave compuesta). 
- Todo: Id, Title, IsCompleted, CreatedAt.

3.2 Capa Application
- DTOs: Users, Roles, Permissions, Todo (Create/Update y lecturas). 
- Validadores: FluentValidation para entrada (crear/actualizar usuarios, roles, permisos, todos, login). 
- Mapeos: AutoMapper (MappingProfile). 
- Features/Todos: patrón CQRS (Commands/Queries/Handlers) para crear/actualizar/eliminar y listar.

3.3 Repositorios (Domain/Repositories e Infrastructure/Repositories)
- Interfaces: IUserRepository, IRoleRepository, IPermissionRepository, ITodoRepository. 
- Implementación EF Core: consultas, paginación y persistencia en AppDbContext.

3.4 Servicios de negocio (Api/Services)
- UserService: gestión de usuarios, hashing de contraseñas (SHA256 + salt), verificación, perfil. 
- RoleService: CRUD de roles, activación/inactivación, asignación de permisos. 
- PermissionService: CRUD de permisos. 
- LdapService: autenticación contra LDAP (si está habilitado), verificación de pertenencia a grupo.

3.5 Controladores (Api/Controllers) y contratos
- Convenciones: prefijo /api/v1, JSON, validación de modelo, middleware de errores consistente. 
- AuthController: 
  - POST /api/v1/auth/login (credenciales locales o LDAP si está activo). 
  - POST /api/v1/auth/register (alta básica; restringir en producción). 
  - GET  /api/v1/auth/validate (valida JWT actual). 
  - GET  /api/v1/auth/refresh (refresca token si corresponde). 
  - GET  /api/v1/auth/dev-token (solo desarrollo, AllowAnonymous). 
- UsersController: CRUD de usuarios + endpoints de perfil (GetProfile/UpdateProfile/ChangePassword). Políticas como CanReadUsers/CanWriteUsers/IsSelf. 
- RolesController y PermissionsController: CRUD con políticas (p.ej. CanReadRoles, CanWriteRoles). 
- TodosController: CRUD de tareas (Create/Update/Delete/Get).

3.6 Autenticación y autorización
- JWT: firmado con Jwt:Key, incluye claims sub (userId), name, role y permissions (lista de códigos). 
- Autorización por políticas: cada política mapea a un código de permiso (ej.: "users.read", "roles.write"). 
- LDAP (opcional): si Ldap:Enabled=true, se intenta autenticar en servidor configurado; puede exigirse pertenencia a Ldap:Group.

3.7 Configuración (Api/appsettings*.json)
- ConnectionStrings: DefaultConnection (PostgreSQL). 
- Jwt: Key, Issuer, Audience, AccessTokenMinutes, RefreshTokenMinutes. 
- Ldap: Enabled, Server, BaseDn, Domain, Group. 
- Logging/Serilog, AllowedHosts, CORS (orígenes en Program.cs si aplica).

3.8 Seeding y migraciones
- Al iniciar, se aplican migraciones y se crean datos iniciales (Infrastructure/Persistence/DataSeeder). 
- Roles: Administrador, Usuario, Invitado. 
- Permisos: agrupados por categoría (users.*, roles.*, permissions.*, todos.*). 
- Asignaciones: Administrador = todos; Usuario = sin delete; Invitado = solo lectura. 
- Usuarios demo (solo desarrollo): 
  - admin / Admin123! (rol Administrador) 
  - usuario / Usuario123! (rol Usuario)

3.9 Logging y manejo de errores
- Serilog configurado por appsettings. 
- Middleware de excepciones devuelve errores JSON uniformes con correlación y detalle en desarrollo.

4) Frontend (sg-semilla-ui)
- Scripts npm: start (dev), build (prod), test. 
- angular.json define targets de build/serve; proxy.conf.json redirige /api hacia la API. 
- Interceptor JWT: agrega Authorization: Bearer y maneja 401/403; guards por permisos. 
- Estilos: Tailwind configurado; SSR opcional (main.server.ts, server.ts).

5) Ejecución local
- Prerrequisitos: .NET SDK 8, Node 18+, PostgreSQL. 
- Backend: configurar ConnectionStrings en appsettings.Development.json; ejecutar: dotnet restore; dotnet run en carpeta Api (migraciones + seeding automáticos). 
- Frontend: cd sg-semilla-ui; npm install; npm start (usa proxy a la API). 
- Acceso: http(s)://localhost:{puertos según launchSettings}; login con admin/Admin123! (cambiar en cuanto sea posible).
