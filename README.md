# pruebas-e2e-ghost
Para la ejecución de las pruebas, por favor siga las instrucciones
- clone el repositorio con ```git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git``` o descargue el zip y descomprímalo.
- para la ejecución de las pruebas con la herramienta kraken siga el siguiente tutorial [kraken-e2e-ghost](kraken-e2e-ghost/README.md).
- - para la ejecución de las pruebas con la herramienta cypress siga el siguiente tutorial [cypress](cypress/README.md).

## Funcionalidades

-   Crear post: El sistema debe permitir la creación de un post ingresando un título y contenido relacionado mediante un editor.

-   Editar post: El sistema debe permitir la edición de un post pudiendo agregar nuevo contenido y eliminando el que ya no se requiera.

-   Crear página: El sistema debe permitir la creación de una página ingresando título de la página y contenido relacionado mediante un editor.

-   Editar página: El sistema debe permitir la edición de una página pudiendo agregar nuevo contenido o eliminando el que ya no se requiera.

-   Crear tags: El sistema debe permitir crear tags con el fin de poder clasificar los posts y páginas creadas en la aplicación

-   Editar tags: El sistema debe permitir editar un tag permitiendo agregar nueva información o eliminar la información que se requiera.

-   Crear miembros: El sistema debe permitir crear un miembro permitiendo que contenga información como nombre y correo.

-   Editar miembros: El sistema debe permitir editar un miembro permitiendo agregar nueva información o eliminar la información que se requiera.

-   Configuración general: El sistema debe permitir editar información general del aplicativo o eliminar información en caso de que se requiera.

-   Configuración del perfil: El sistema debe permitir editar información del perfil o eliminar información en caso de que se requiera.

## Escenarios de prueba

| ID | Funcionalidad                | Descripción                                                                                                                                                                                 |
| -- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1  | Crear post                   | Como usuario inicio sesion, creo un post, lo público y validó la publicación                                                                                                                |
| 2  | Crear post - Editar post     | Como usuario inicio sesion, creo un post lo publico y luego lo edito y lo vuelvo a publicar                                                                                                 |
| 3  | Crear post                   | Como usuario inicio sesion, creo un post, lo publico y validó la publicación, luego lo edito, cambio el estado a no publicado y válido en la lista de post que el estado sea borrador       |
| 4  | Crear post                   | Como usuario creo un tag y luego creo un filtro de los post publicados por ese tag, y valido que el filtro quede accesible                                                                  |
| 5  | Crear página                 | Como usuario inicio sesion, creó una página, la público y validó la publicación a traves del link generado en el las configuraciones de la pagina                                           |
| 6  | Crear página - Editar página | Como usuario inicio sesion, creó una página, la publico y luego la edito y la vuelvo a publicar                                                                                             |
| 7  | Crear página                 | Como usuario inicio sesion, creo una pagina, la publico y validó la publicación, luego la edito, cambio el estado a no publicado y válido en la lista de paginas que el estado sea borrador |
| 8  | Crear página                 | Como usuario quiere Crear una pagina ,publicarla con link verificar que esta publica y luego eliminar el link y la pagina,                                                                  |
| 9  | Crear página                 | Crear una pagina y publicarla y valido que se haya publicado                                                                                                                                |
| 10 | Crear página                 | Como usuario inicio sesion, creó una página, creo el link, y valido que este publica                                                                                                        |
| 11 | Crear tags                   | Como usuario de la aplicación quiero crear un tag y verificar que se haya creado.                                                                                                           |
| 12 | Editar tags                  | Como usuario de la aplicación quiero editar un tag y verificar que se haya editado.                                                                                                         |
| 13 | Crear Post - Crear tags      | Como usuario quiero crear un tag y asignarselo a la publicación                                                                                                                             |
| 14 | Crear página- Crear tags     | Como usuario quiero crear un tag y asignarselo a la pagina                                                                                                                                  |
| 15 | Crear miembros               | Crear un miembro verificar que esté en la lista de miembros y eliminarlo                                                                                                                    |
| 16 | Editar miembros              | Crear un miembro, verificar que este en la lista de miembros editarlo y eliminarlo                                                                                                          |
| 17 | Configuración general        | Como usuario quiero poder asignarle una contraseña a un sitio y verificar que la valide                                                                                                     |
| 18 | Configuración general        | Como usuario quiero cambiar el titulo y subtitulo del sitio y visualizar esto                                                                                                               |
| 19 | Configuración perfil         | Como usuario quiero cambiar mi contraseña                                                                                                                                                   |
| 20 | Configuración perfil         | Como usuario quiero cambiar mi nombre de usuario                                                                                                                                            |
