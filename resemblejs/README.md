# Reporte comparación visual con RESEMBLEJS

## 1. Prerequisitos
1.1. [Repositorio](https://github.com/duvanjamidvc/pruebas-e2e-ghost) git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git o descargué el zip y descomprímalo.

1.2. Antes de ejecutar la generación el reporte de comparación visual, se debe ejecutar los escenarios para las pruebas de regresión visual siguiendo los tutoriales correspondientes a cada proyecto:
- [5 Escenarios con kraken para  Ghost v4.41.3](kraken-e2e-ghost-v4.41.3/README.md)
- [5 Escenarios con kraken para  Ghost v3.42](kraken-e2e-ghost-v3.42/README.md)
- [5 Escenarios con cypress para  Ghost v4.41.3](cypress-v4.41.3/README.md)
- [5 Escenarios con cypress para  Ghost v3.42](cypress-v3/README.md)

1.3. Abra una terminal y ubiquese en el folder del proyecto descargado y acceda a la carpeta resemblejs `cd resemplejs`

## 2. Instalar paquetes
En la terminal ejecute el siguiente comando:
```bash
npm install
```

## 3. Ejecutar las pruebas
Una vez instalados los paquetes, en la terminal ejecute el siguiente comando:
```bash
node index.js
```

## 4. Ver los resultados
Al finalizar el proceso se generaran 2 reportes uno para los escenarios ejecutados con kraken y otro con los escenarios de cypress, estos los podra encontrar en el folder `/evidencias/kraken` y `/evidencias/cypress`. Para ver el reporte abra el archivo `reporte.html` con el navegador de su preferencia.
