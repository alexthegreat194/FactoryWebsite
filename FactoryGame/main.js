console.log("Start...")

var tracking;
var startPort;
var extractors = [];
var factories = [];
var collectors = [];
var connectors = [];

var unlockedIds = [1, 2, 3, 4, 5, 6, 7];

function setup()
{
    var canvas = createCanvas(document.body.clientWidth, document.body.clientHeight);
    canvas.parent = document.body;
    addAllMaterialButtons();
}

function draw()
{
    //logic
    if (tracking != null)
    {
        tracking.x = mouseX - tracking.width/2;
        tracking.y = mouseY - tracking.height/2;
        tracking.draw();
    }

    //drawing
    background(200);

    //draw extractors
    for (var i = 0; i < extractors.length; i++){
        extractors[i].draw();
    }
    //draw extractors
    for (var i = 0; i < factories.length; i++){
        factories[i].draw();
    }
    //draw collectors
    for (var i = 0; i < collectors.length; i++){
        collectors[i].draw();
    }
    //draw connectors
    for (var i = 0; i < connectors.length; i++){
        connectors[i].draw();
    }
    
    if (tracking != null){
        if (tracking.name == "Material")
            tracking.draw(mouseX, mouseY, 25, 25);
        else
            tracking.draw();
    }

    if (startPort != null)
    {
        var inPoint = this.startPort.component.portLocation(this.startPort.port);

        stroke(10);
        strokeWeight(5);
        line(inPoint.x, inPoint.y, mouseX, mouseY);
        stroke(0);
        strokeWeight(1);
    }
}

function mouseReleased()
{
    console.log("released");

    if(mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height != true)
    {
        console.log("off screen click...");
        return;
    }

    if (tracking != null)
    {
        tracking.x = mouseX - tracking.width/2;
        tracking.y = mouseY - tracking.height/2;
        
        switch (tracking.name) {
            case "Extractor":
                extractors.push(tracking);
                console.log(tracking);
                break;
        
            case "Factory":
                factories.push(tracking);
                break;

            case "Collector":
                collectors.push(tracking);
                break;

            case "Material":
                console.log("Material Click...");

                for(var i = 0; i < extractors.length; i++){
                    console.log("Checking extractors...");
                    if (extractors[i].over(mouseX, mouseY))
                    {
                        console.log("in range!...");
                        extractors[i].setMat(tracking);
                        tracking = null;
                        break;
                    }
                    else
                        console.log("Not in range...");
                }

                for(var i = 0; i < factories.length; i++){
                    console.log("Checking Factories...");
                    if (factories[i].over(mouseX, mouseY) == true)
                    {
                        console.log("in range!...");

                        var side = factories[i].overMat(mouseX, mouseY);
                        console.log("Factory Side: " + side + "...");

                        switch (side) {
                            case 1:
                                factories[i].setMat1(tracking);
                                break;
                            
                            case 2:
                                factories[i].setMat2(tracking);
                                break;
                            default:
                                break;
                        }

                        tracking = null;
                        break;
                    }
                    else
                        console.log("Not in range...");
                }

                for(var i = 0; i < collectors.length; i++){
                    console.log("Checking collectors...");
                    if (collectors[i].over(mouseX, mouseY))
                    {
                        console.log("in range!...");
                        collectors[i].setMat(tracking);
                        tracking = null;
                        break;
                    }
                    else
                        console.log("Not in range...");
                }

                break;

            default:
                break;
        }
        
        tracking = null;
        resetComponentRates();
    }
    else if(startPort != null)
    {
        for(var i = 0; i < extractors.length; i++)
        {
            var overPort = extractors[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                var newPort = extractors[i].getPort(overPort);
                console.log("Connecter outputs: ", newPort.output, ":", startPort.output);
                if (newPort.output != startPort.output)
                {
                    var buffer = new Connecter(startPort, newPort);
                    
                    connectors.push(buffer);
                    console.log("New Connecter:", buffer);

                    resetComponentRates();
                    startPort = null;
                    return;
                }
                else
                {
                    return;
                }
            }
        }

        for(var i = 0; i < factories.length; i++)
        {
            var overPort = factories[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                var newPort = factories[i].getPort(overPort);
                console.log("Connecter outputs: ", newPort.output, ":", startPort.output);
                if (newPort.output != startPort.output)
                {
                    var buffer = new Connecter(startPort, newPort);
                   
                    connectors.push(buffer);
                    console.log("New Connecter:", buffer);
                    resetComponentRates();

                    startPort = null;
                    return;
                }
                else
                {
                    return;
                }
            }
        }

        for(var i = 0; i < collectors.length; i++)
        {
            var overPort = collectors[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                var newPort = collectors[i].getPort(overPort);
                console.log("Connecter outputs: ", newPort.output, ":", startPort.output);
                if (newPort.output != startPort.output)
                {
                    var buffer = new Connecter(startPort, newPort);
                   
                    connectors.push(buffer);
                    console.log("New Connecter:", buffer);
                    resetComponentRates();

                    startPort = null;
                    return;
                }
                else
                {
                    return;
                }
            }
        }

        startPort = null;
    }
    else
    {
        //check port clicks
        for(var i = 0; i < extractors.length; i++)
        {
            var overPort = extractors[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                bufferPort = extractors[i].getPort(overPort);
                if (bufferPort.output == true)
                    startPort = bufferPort;
                return;
            }
        }

        for(var i = 0; i < factories.length; i++)
        {
            var overPort = factories[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                bufferPort = factories[i].getPort(overPort);
                if (bufferPort.output == true)
                    startPort = bufferPort;
                return;
            }
        }

        for(var i = 0; i < collectors.length; i++)
        {
            var overPort = collectors[i].overPort(mouseX, mouseY);
            if (overPort != 0)
            {
                bufferPort = collectors[i].getPort(overPort);
                if (bufferPort.output == true)
                    startPort = bufferPort;
                return;
            }
        }

        //check if over components
        for(var i = 0; i < extractors.length; i++)
        {
            if(extractors[i].over(mouseX, mouseY))
            {
                tracking = extractors[i];
                extractors.splice(i, 1);
                disconnectConnecter(tracking);
                resetComponentRates();
                return;
            }
        }

        for(var i = 0; i < factories.length; i++)
        {
            if(factories[i].over(mouseX, mouseY))
            {
                tracking = factories[i];
                factories.splice(i, 1);
                disconnectConnecter(tracking);
                resetComponentRates();
                return;
            }
        }

        for(var i = 0; i < collectors.length; i++)
        {
            if(collectors[i].over(mouseX, mouseY))
            {
                tracking = collectors[i];
                collectors.splice(i, 1);
                disconnectConnecter(tracking);
                resetComponentRates();
                return;
            }
        }

        resetComponentRates();
    }
}

function disconnectConnecter(component)
{
    console.log(connectors.length);
    var newConnecters = [];

    for(var i = 0; i < connectors.length; i++)
    {
        console.log(i);
        var buffer = connectors[i];
        var inComp = buffer.inputPort.component;
        var outComp = buffer.outputPort.component;
        console.log(inComp == component, outComp == component);

        if(inComp != component && outComp != component)
        {
            newConnecters.push(connectors[i]);
        }
    }

    connectors = newConnecters;
}

function resetComponentRates()
{
    for (var i = 0; i < factories.length; i++)
    {
        factories[i].rate = 0;
        factories[i].setMat1(null)
        factories[i].setMat2(null)
    }
    for (var i = 0; i < collectors.length; i++)
    {
        collectors[i].rate = 0;
        collectors[i].setMat(null);
    }

    for (var i = 0; i < connectors.length; i++)
    {
        var buffer = connectors[i];
        var rate = buffer.inputPort.component.rate;

        console.log(buffer)
        console.log(buffer.inputPort)
        console.log(buffer.outputPort)

        buffer.rate = rate;
        buffer.outputPort.component.rate = rate;

        var mat = buffer.mat;
        var comp = buffer.outputPort.component
        if (comp.name == "Factory")
            comp.setMat(buffer.outputPort.port, mat);
        else
            comp.setMat(mat);
        
    }
}

function addMaterialButton(id)
{
    var mat = ids[id];
    if(mat != null)
    {
        var button = document.createElement("button");
        button.innerHTML = mat["name"];
        button.className = "uk-button uk-button-primary";
        button.onclick = function(){addMaterial(id);}; 
        document.getElementById("materials").appendChild(button);
    }
}

function addAllMaterialButtons()
{
    for (var i = 0; i < unlockedIds.length; i++)
    {
        addMaterialButton(unlockedIds[i]);
    }
}

function addExtractor()
{
    tracking = new Extractor(mouseX, mouseY);
}

function addFactory()
{
    tracking = new Factory(mouseX, mouseY);
}

function addCollector()
{
    tracking = new Collector(mouseX, mouseY);
}

function addMaterial(id)
{
    tracking = new Material(id);
}

//admin commands
function wipeBoard()
{
    tracking = null;
    startPort = null;
    extractors = [];
    factories = [];
    collectors = [];
    connectors = [];
}

function addMat()
{
    var button = document.createElement("button");
    button.innerHTML = "Test";
    button.className = "uk-button uk-button-primary";
    button.onclick = function(){addMaterial(1);}; 
    document.getElementById("materials").appendChild(button);
}