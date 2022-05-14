# Pruebas E2E con toma de Screenshots en Ghost v4.41.3

Para la ejecución de los 20 escenarios de pruebas con captura de screenshots, por favor siga las instrucciones:
1. Clone el repositorio con ```git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git``` o descargue el zip y descomprímalo.
2. Para la ejecución de las pruebas con la herramienta kraken siga el siguiente tutorial [kraken-e2e-ghost](kraken-e2e-ghost/README.md).
3. Para la ejecución de las pruebas con la herramienta cypress siga el siguiente tutorial [cypress](cypress/README.md).

# Pruebas de regresión visual usando Ghost v4.41.3 y Ghost v3.42
Para estas pruebas se utilizo la herramienta resemble para comparar los screenshots tomados de la ejecución de los 5 escenarios de pruebas planteados en las herramientas kraken y cypress.



Para la ejecución de las pruebas, por favor siga las instrucciones:
1. Clone el repositorio con ```git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git``` o descargue el zip y descomprímalo.
2. Abra una terminal y ubíquese en el folder del proyecto descargado ```cd pruebas-e2e-ghost```
3. Ejecute el siguiente comando para instalar los paquetes necesarios `npm install`
4. Ejecute el comando `npm start` para ejecutar las pruebas end to end con kraken y cypres diseñadas para ghost en las 2 versiones seleccionadas, y generar el reporte de pruebas VRT
5. Al finalizar el proceso se generaran 2 reportes uno para los escenarios ejecutados con kraken y otro con los escenarios de cypress, estos los podra encontrar en el folder ```/resemblejs/evidencias/kraken``` y ```/resemblejs/evidencias/cypress```
6. Para ver el reporte abra el archivo ```reporte.html``` con el navegador de su preferencia

### Proyectos con los escenarios para regresión visual 
- [5 Escenarios con kraken para  Ghost v4.41.3](kraken-e2e-ghost-v4.41.3/README.md)
- [5 Escenarios con kraken para  Ghost v3.42](kraken-e2e-ghost-v3.42/README.md)
- [5 Escenarios con cypress para  Ghost v4.41.3](cypress-v4.41.3/README.md)
- [5 Escenarios con cypress para  Ghost v3.42](cypress-v3/README.md)


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

| ID | Funcionalidades          | Descripción escenario                                                                                                                          |
| -- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Crear post               | Crear post, publicarlo y ver el post desde el link generado en las configuraciones de la página                                                |
| 2  | Editar post              | Crear post, Edtitar post, publicarlo y ver el post desde el link generado en las configuraciones de la página                                  |
| 3  | Editar post              | Crear post, publicarlo, cambiar el estado de post previamente publicado a borrador y ver el post en la lista de posts con estado borrador      |
| 4  | Crear tags               | Crear tag, filtrar listado de post por tag y validar que se listen los post relacionados al tag                                                |
| 5  | Crear página             | Crear página, publicarla y ver la página desde el link generado en las configuraciones de la página                                            |
| 6  | Editar página            | Crear página, Editar página, publicarla y ver la página desde el link generado en las configuraciones de la página                             |
| 7  | Editar página            | Crear página, publicarla y ver la página desde el link generado en las configuraciones de la página                                            |
| 8  | Crear página             | Crear página, publicarla, cambiar el estado de página previamente publicada a borrador y ver la página en la lista de post con estado borrador |
| 9  | Crear página             | Crear página, publicarla y ver la página ingresando al link de la página                                                                       |
| 10 | Crear página             | Crear página, publicarla, crear link de navegación, cerrar sesión y ver la página ingresando al link de la página                              |
| 11 | Crear tags               | Crear tag y verificar que haya sido creado exitosamente                                                                                        |
| 12 | Editar tags              | Crear tag, editar el tag verificar que haya sido editado exitosamente                                                                          |
| 13 | Crear Post - Crear tags  | Crear post, crear tag, asignarlo a un post y verificar que haya sido asignado correctamente                                                    |
| 14 | Crear página- Crear tags | Crear post, crear tag, asignarlo a una página y verificar que haya sido asignado correctamente                                                 |
| 15 | Crear miembros           | Crear miembro y verificar que haya sido creado exitosamente                                                                                    |
| 16 | Editar miembros          | Crear miembro, validar que haya sido creado. editarlo y eliminarlo.                                                                            |
| 17 | Configuración general    | Configuración general, cambia contraseña y verifica que el cambio sea exitoso                                                                  |
| 18 | Configuración general    | Configuración general,cambiar título y subtitulo y verifica que el cambio sea exitoso                                                          |
| 19 | Configuración perfil     | Cambiar la contraseña y validar que el inicio de sesion sea exitoso con la nueva contraseña                                                    |
| 20 | Configuración perfil     | Cambiar el nombre de usuario y validar que en el menu del usuario se vea el nuevo nombre                                                       |

## Integrantes
- Plinio José Grijalba Ramirez, Correo: p.grijalbar@uniandes.edu.co
- Natalie Carolina Santiago Torres, Correo: n.santiago@uniandes.edu.co
- Duvan Jamid Vargas Castillo, Correo: dj.vargasc1@uniandes.edu.co
- Magda Viviana Ojeda Niño, Correo: m.ojedan@uniandes.edu.co

