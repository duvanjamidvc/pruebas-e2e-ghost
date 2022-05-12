const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { options } = config;

async function executeTest() {
    let resultInfo = [];

    for (let tool of config.basePath) {
        let basePath = tool.path;
        let versionPathV3 = basePath + "/v3";
        let versionPathV4 = basePath + "/v4";

        let folders = await fs.promises.readdir(versionPathV3);
        for (let escenarioFolder of folders) {
            let imagenes = await fs.promises.readdir(versionPathV3 + "/" + escenarioFolder);
            for (let imagen of imagenes) {
                console.log("imagen: " + imagen);
                const imageV3 = versionPathV3 + "/" + escenarioFolder + "/" + imagen;
                const imageV4 = versionPathV4 + "/" + escenarioFolder + "/" + imagen;

                // compara las imagenes
                const diffData = await compareImages(
                    fs.readFileSync(imageV3),
                    fs.readFileSync(imageV4),
                    options
                );

                if (!fs.existsSync(`${basePath}/diff/${escenarioFolder}`)) {
                    fs.mkdirSync(`${basePath}/diff/${escenarioFolder}`, { recursive: true });
                }
                const imageDiff = `${basePath}/diff/${escenarioFolder}/diff-${imagen}`;
                // guarda la imagen de comparacion
                fs.writeFileSync(imageDiff, diffData.getBuffer());

                let info = {
                    escenario: escenarioFolder,
                    step: imagen.split('.')[0],
                    rawMisMatchPercentage: diffData.rawMisMatchPercentage,
                    misMatchPercentage: diffData.misMatchPercentage,
                    data: {
                        isSameDimensions: diffData.isSameDimensions,
                        dimensionDifference: diffData.dimensionDifference,
                        rawMisMatchPercentage: diffData.rawMisMatchPercentage,
                        misMatchPercentage: diffData.misMatchPercentage,
                        diffBounds: diffData.diffBounds,
                        analysisTime: diffData.analysisTime
                    },
                    images: {
                        imageV3: imageV3.replace(basePath + "/", ""),
                        imageV4: imageV4.replace(basePath + "/", ""),
                        imageDiff: imageDiff.replace(basePath + "/", ""),
                    }
                };
                resultInfo.push(info);
            }

        }
        fs.writeFileSync(`${basePath}/report.html`, createReport(tool.name, resultInfo));
        fs.copyFileSync('./index.css', `${basePath}/index.css`);
    }

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the ${basePath} folder in index.html")
    return resultInfo;
}

function printItem(item) {
    return `
    <div class="escenario" >

    <div class="title">
        <h2>Escenario: ${item.escenario}</h2>
       
    </div>
    <div class="row">
    <div class="col">
    
    <div class="card">
    <div class="card-body">
        <h5 class="card-title">Ghost V3</h5>
        </div>
        <img class="card-img-top" src="${item.images.imageV3}" id="refImage" label="Reference">
      </div>
      </div>
     <div class="col">
     <div class="card">
    <div class="card-body">
        <h5 class="card-title">Ghost V4</h5>
        <img class="card-img-top" src="${item.images.imageV4}" id="testImage" label="Test">
      </div>
    </div>
    </div>
    </div>
      <div class="row  mt-2">
    <div class="col">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Diff</h5>
        <img class="img-fluid" src="${item.images.imageDiff}" id="diffImage" label="Diff">
      </div>
      </div>
      </div>
    <div class="col">
  <div class="card">
      <div class="card-body">
        <h5 class="card-title">Data-Diff</h5>
        <p>
        <pre>
       <code class="language-json" data-lang="json">${JSON.stringify(item.data, null, 2)}</code>
       </pre></p>
    </div>
    </div>
    </div>
  </div>`
}

function createReport(toolName, resultInfo) {
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>
        <body>
        <nav class="navbar navbar-expand-md ${toolName} bg-primary navbar-dark bold" role="navigation">
  <div class="container">
    <a class="navbar-brand text-dark">
      <h3 class="text-left float-start d-inline">Reporte para testing E2E con ${toolName} Ghost 3.42 vrs 4.41 y regresión visual con Resemblejs</h3>
    </a>
   
  </div>
</nav>
         <div class="container">
            <div id="visualizer">
            <ol>
            ${resultInfo.map(item => { return printItem(item); })}
</ol>
</div>
</div>
</body>
    </html>
               `
}


(async () => console.table(await executeTest()))();
