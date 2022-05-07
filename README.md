# pruebas-e2e-ghost
Para la ejecución de las pruebas, por favor siga las instrucciones:
1. Clone el repositorio con ```git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git``` o descargue el zip y descomprímalo.
2. Para la ejecución de las pruebas con la herramienta kraken siga el siguiente tutorial [kraken-e2e-ghost](kraken-e2e-ghost/README.md).
3. Para la ejecución de las pruebas con la herramienta cypress siga el siguiente tutorial [cypress](cypress/README.md).

## Funcionalidades
-   Iniciar sesión: El sistema debe permitir iniciar sesión en el módulo administrador de la aplicación mediante usuario y contraseña para poder administrar el contenido de la plataforma.

-   Cerrar sesión: El sistema debe permitir cerrar sesión del módulo administrador de la aplicación.

-   Crear post: El sistema debe permitir la creación de un post ingresando un título y contenido relacionado mediante un editor.

-   Editar post: El sistema debe permitir la edición de un post pudiendo agregar nuevo contenido y eliminando el que ya no se requiera.

-   Publicar post: El sistema debe permitir publicar un post para poder visualizarlo en la pagina principal.

-   Publicar post: El sistema debe permitir publicar un post para poder visualizarlo en la pagina principal.

-   Crear página: El sistema debe permitir la creación de una página ingresando título de la página y contenido relacionado mediante un editor.

-   Editar página: El sistema debe permitir la edición de una página pudiendo agregar nuevo contenido o eliminando el que ya no se requiera.

-   Publicar página: El sistema debe permitir publicar una página para poder configurarla en la navegación.

-   Crear tags: El sistema debe permitir crear tags con el fin de poder clasificar los posts y páginas creadas en la aplicación

-   Editar tags: El sistema debe permitir editar un tag permitiendo agregar nueva información o eliminar la información que se requiera.

-   Crear miembros: El sistema debe permitir crear un miembro permitiendo que contenga información como nombre y correo.

-   Editar miembros: El sistema debe permitir editar un miembro permitiendo agregar nueva información o eliminar la información que se requiera.

-   Configuración general: El sistema debe permitir editar información general del aplicativo o eliminar información en caso de que se requiera.

-   Configuración del perfil: El sistema debe permitir editar información del perfil o eliminar información en caso de que se requiera.

## Escenarios de prueba

| Funcionalidades          | Descripción escenario                                                                                                                          |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Crear post               | Crear post, publicarlo y ver el post desde el link generado en las configuraciones de la página                                                |
| Editar post              | Crear post, Editar post, publicarlo y ver el post desde el link generado en las configuraciones de la página                                   |
| Editar post              | Crear post, publicarlo, cambiar el estado de post previamente publicado a borrador y ver el post en la lista de posts con estado borrador      |
| Crear tags               | Crear tag, filtrar listado de post por tag y validar que se listen los post relacionados al tag                                                |
| Crear página             | Crear página, publicarla y ver la página desde el link generado en las configuraciones de la página                                            |
| Editar página            | Crear página, Editar página, publicarla y ver la página desde el link generado en las configuraciones de la página                             |
| Editar página            | Crear página, publicarla y ver la página desde el link generado en las configuraciones de la página                                            |
| Crear página             | Crear página, publicarla, cambiar el estado de página previamente publicada a borrador y ver la página en la lista de post con estado borrador |
| Crear página             | Crear página, publicarla y ver la página ingresando al link de la página                                                                       |
| Crear página             | Crear página, publicarla, crear link de navegación, cerrar sesión y ver la página ingresando al link de la página                              |
| Crear tags               | Crear tag y verificar que haya sido creado exitosamente                                                                                        |
| Editar tags              | Crear tag, editar el tag verificar que haya sido editado exitosamente                                                                          |
| Crear Post - Crear tags  | Crear post, crear tag, asignarlo a un post y verificar que haya sido asignado correctamente                                                    |
| Crear página- Crear tags | Crear post, crear tag, asignarlo a una página y verificar que haya sido asignado correctamente                                                 |
| Crear miembros           | Crear miembro y verificar que haya sido creado exitosamente                                                                                    |
| Editar miembros          | Crear miembro, validar que haya sido creado. editarlo y eliminarlo.                                                                            |
| Configuración general    | Configuración general, cambia contraseña y verifica que el cambio sea exitoso                                                                  |
| Configuración general    | Configuración general, cambiar título y subtitulo y verifica que el cambio sea exitoso                                                         |
| Configuración perfil     | Cambiar la contraseña y validar que el inicio de sesión sea exitoso con la nueva contraseña                                                    |
| Configuración perfil     | Cambiar el nombre de usuario y validar que en el menú del usuario se vea el nuevo nombre                                                       |                                                                                                                                           |

## Integrantes
- Plinio José Grijalba Ramirez, Código: 202214358
- Natalie Carolina Santiago Torres, Código: 202214374
- Duvan Jamid Vargas Castillo, Código: 202210190
- Magda Viviana Ojeda Niño, Código: 202210187

