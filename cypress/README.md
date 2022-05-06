## Prerequsisitos

- [Repositorio](https://github.com/duvanjamidvc/pruebas-e2e-ghost.git) `git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git` o descargué el zip y descomprímalo.
- [NodeJS (Version ≥ 12)](https://nodejs.org)

## Ejecutar pruebas

- Abra una terminar y ubíquese en el folder del proyecto descargado y acceda a la carpeta cypress `cd /cypress`
- Ejecute el siguiente comando para instalar los paquetes necesarios
  `npm install`
- Configure los siguientes parametros de ghost en el archivo fixtures/users.json en admins

```json
{
  "username": "xxxxxxx",
  "password": "xxxxxxx"
}
```

- Ejecute el comando `npm start` para ejecutar las pruebas end to end con cypress
