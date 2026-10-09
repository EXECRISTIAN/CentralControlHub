# Instrucciones para Claude

## Política de repositorios (regla permanente)

Pedido del usuario (2026-10-09): mantiene un *pool* de repositorios vacíos en
GitHub para que Claude los use en proyectos nuevos.

Antes de empezar cualquier proyecto nuevo:

1. **Revisar el pool** en `REPOS.md` y verificar contra GitHub
   (`list_repos` + `search_repositories user:EXECRISTIAN`) qué repos están
   realmente vacíos / sin usar.
2. **Tomar uno libre** y, si hace falta, renombrarlo con un nombre acorde al
   proyecto. Está autorizado a renombrar los repos del pool.
3. **No mezclar proyectos**: un proyecto = un repositorio. Nunca agregar un
   proyecto nuevo dentro de un repo que ya tiene otro proyecto.
4. **Actualizar `REPOS.md`** marcando el repo como ocupado y con qué proyecto.
5. **Si no queda ninguno libre**: no crear repos por cuenta propia ni reutilizar
   uno ocupado. Pedirle al usuario que cree repos nuevos y esperar.

Nota: el repo debe tener instalada la Claude GitHub App para que Claude pueda
verlo. Si el usuario dice que creó repos que Claude no ve, el problema es de
permisos, no de que falten.
