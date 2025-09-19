# SG_Semilla_PostgreSQL — Manual de usuario

Última actualización: hoy

1) Presentación
Plataforma web con backend .NET y frontend Angular con autenticación JWT y, opcionalmente, LDAP.

2) Perfiles de usuario Iniciales
- Administrador: administración completa del sistema (usuarios, roles, permisos y tareas). 
- Usuario: gestión de sus tareas y, según permisos otorgados, lectura/edición limitada de otros módulos. 
- Invitado: acceso de solo lectura a módulos permitidos.

3) Acceso a la plataforma
- URL: proporcionada por TI (p. ej. http://localhost:4200 en desarrollo). 
- Ingreso: usuario y contraseña. En entornos integrados, puede habilitarse autenticación LDAP. 
- Usuarios de ejemplo (solo desarrollo): 
  - admin / Admin123! 
  - usuario / Usuario123!

4) Estructura de la interfaz
- Barra de navegación: acceso a módulos (Usuarios, Roles, Permisos, Tareas) y a tu perfil. 
- Buscador y filtros: presentes en listados para localizar registros. 
- Zona de contenido: tablas y formularios. 
- Notificaciones: mensajes de éxito o error al realizar acciones.

5) Módulos y operaciones
5.1 Usuarios
- Ver listado, buscar, crear, editar y eliminar (según permisos). 
- Ver/editar tu perfil y cambiar contraseña. 
- Buenas prácticas: usa contraseñas fuertes y mantén tu email actualizado.

5.2 Roles
- Ver, crear, editar y eliminar roles (según permisos). 
- Asignar permisos a cada rol. 
- Recomendación: crear roles por función (p. ej., Operaciones, Auditoría) y asignar permisos finos.

5.3 Permisos
- Ver permisos disponibles y su categoría. 
- Asignación: se realiza desde Roles. 
- Nota: permisos definen el acceso real a cada operación de la API.

5.4 Tareas (To-Dos)
- Crear, editar, marcar como completadas y eliminar tareas. 
- Filtrar por estado y buscar por título. 
- Consejo: usa títulos claros y marca completadas para mantener tu panel ordenado.

6) Búsqueda y filtros
- Usa el campo de búsqueda para encontrar por nombre/título. 
- Aplica filtros por estado/categoría/rol según el módulo. 
- Combina filtros para resultados más precisos.

7) Tu cuenta
- Perfil: edita nombre, email y otros datos. 
- Contraseña: cámbiala periódicamente y no la compartas. 
- Cierre de sesión: usa el botón Salir para cerrar tu sesión de forma segura.

8) Mensajes comunes
- Éxito: "Operación realizada correctamente". 
- Error de validación: verifica campos obligatorios y formatos. 
- 401/No autenticado: tu sesión caducó; vuelve a iniciar. 
- 403/Sin permisos: contacta a un administrador para solicitar acceso.

Anexo — Capacidades por rol (por defecto en entorno de desarrollo)
- Administrador: todas las operaciones. 
- Usuario: lectura general y edición sin eliminación en la mayoría de módulos. 
- Invitado: solo lectura.