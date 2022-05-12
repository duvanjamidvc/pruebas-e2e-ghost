# RESEMBLEJS

## 1. Configurar para la ejecución

 Se deben condigurar las rutas de las evidencias en el archivo `config.json`

```json
     "basePath": [
        {
            "path": "./evidencias/kraken",
            "name": "kraken"
        },
        {
            "path": "./evidencias/cypress",
            "name": "cypress"
        }
    ],
```

se debe cambiar los paramtros `path` para que apunte a cada una de las carpetas de las herramientas

NOTA: tenga en cuenta que el arbol de carpetas dentro de cada uno de los path debe ser `${path}/[v3|v4/escenario/screnshot.png`
ejemplo: `./evidencias/kraken/v4/login_in_app/navigate_to_login_page.png`

NOTA2: Debe existir la imagen tanto en la carpta v3 como v4, ejemplo:

- `./evidencias/kraken/v3/login_in_app/navigate_to_login_page.png`
- `./evidencias/kraken/v4/login_in_app/navigate_to_login_page.png`

## 2. Instalar paquetes

```bash
npm install
```

## 3. Ejecutar las pruebas

```bash
node index.js
```

## 4. Ver los resultados

En cada una de las carpetas configuradas en  el paso #1 se debe encontrar un archivo report.html
el cual contiene el informe de la ejecución.
