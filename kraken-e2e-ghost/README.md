## Prerequsisitos
- [Repositorio](https://github.com/duvanjamidvc/pruebas-e2e-ghost.git) ```git clone https://github.com/duvanjamidvc/pruebas-e2e-ghost.git``` o descargué el zip y descomprímalo. 
- [NodeJS (Version ≥ 12)](https://nodejs.org)
- [Android SDK (ADB and AAPT configured)](https://developer.android.com/studio/releases/platform-tools#downloads)
    - Instrucciones de instalación para diferentes sistemas operativos
        - windows https://www.youtube.com/watch?v=tYY7FTV31vM
        - linux
            ```sh
            sudo apt-get update
            sudo apt-get install android-tools-adb
            ```
        - mac https://www.youtube.com/watch?v=daVygBAm1zs o https://stackoverflow.com/a/32314718
## Ejecutar pruebas
- Abra una terminar y ubíquese en el folder del proyecto descargado y acceda a la carpeta kraken-e2e-ghost ```cd /kraken-e2e-ghost```
- Ejecute el siguiente comando para instalar los paquetes necesarios 
```npm install```
- Ejecute el comando ```npm start``` para ejecutar las pruebas end to end con kraken
