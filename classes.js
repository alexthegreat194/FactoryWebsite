
const portRadius = 15;
const materialSize = 25;
const maxMats = 0;

class Point
{
    x;
    y;
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }
}

class Material
{
    name = "Material";
    id;
    idName;
    extractionRate;
    produtionRate;
    buyCost;
    sellCost;

    constructor(id)
    {
        var mat = ids[id];
        if (mat == null)
            this.idName = "Invalid";
        else
        {
            this.id = id;
            this.idName = mat["name"];
            this.extractionRate = mat["extractionRate"];
            this.produtionRate = mat["produtionRate"];
            this.sellCost = mat["sellCost"];
            this.buyCost = mat["buyCost"];
        }
    }

    get width(){
        return 25;
    }

    get height(){
        return 25;
    }

    draw(x, y, w, h)
    {
        if (this.idName == "Invalid")
        {
            fill(200, 0, 0);
            rect(x, y, w, h);
        }
        else 
        {
            var mat = ids[this.id];
            var color = mat["color"];

            fill(color[0], color[1], color[2]);
            rect(x, y, w, h);
        }
    }
}

class Port
{
    component;
    port;
    output;

    constructor(comp, port, output)
    {
        this.component = comp;
        this.port = port;
        this.output = output;
    }
}

class Connecter
{
    inputPort;
    outputPort;
    rate;
    mat;
    
    constructor(input, output)
    {
        this.inputPort = input;
        this.outputPort = output;
        this.rate = 0;
        this.mat = input.component.mat;
    }

    draw()
    {
        var inPoint = this.inputPort.component.portLocation(this.inputPort.port);
        var outPoint = this.outputPort.component.portLocation(this.outputPort.port);

        stroke(10);
        strokeWeight(5);
        line(inPoint.x, inPoint.y, outPoint.x, outPoint.y);
        stroke(0);
        strokeWeight(1);

        var textX = (inPoint.x + outPoint.x) / 2;
        var textY = (inPoint.y + outPoint.y) / 2;

        textSize(15);
        stroke(150);
        text("Rate: " + this.rate, textX, textY);
        stroke(0);
    }
}