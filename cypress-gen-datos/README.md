## Prerequsisitos

- [Repositorio](https://github.com/duvanjamidvc/pruebas-e2e-ghost.git) `git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git` o descargué el zip y descomprímalo.
- [NodeJS (Version ≥ 12)](https://nodejs.org)

## Ejecutar pruebas

- Abra una terminar y ubíquese en el folder del proyecto descargado y acceda a la carpeta cypress `cd /cypress-gen-datos`
- Ejecute el siguiente comando para instalar los paquetes necesarios
  `npm install`
- Verifique que puede acceder al sitio  [https://ghost-e2e-miso.herokuapp.com/ghost/](https://ghost-e2e-miso.herokuapp.com/ghost/) con las credenciales:


  - Email address: dj.vargasc1@uniandes.edu.co
  - Password: bonita1809


- Ejecute el comando `npm start` para ejecutar las pruebas con las diferentes estrategias de generación de datos

- Mockaroo tiene un límite de ejecuciones gratuitas por cuenta, en el caso de que la ejecución de los escenarios del archivo `scenarios_tag_edit_seudo_ale_dinamico.spec.js` fallen actualice la llave con una de las siguientes opciones `"d0fd5d70" "a9b59a40" "59d82e30"` en archivo `cypress.env.json` variable `"apiKey"`
