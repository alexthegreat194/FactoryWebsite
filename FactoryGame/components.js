class Extractor
{
    name = "Extractor";

    x;
    y;

    mat;
    rate;

    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.mat = null;
        this.rate = 1;
    }

    get width(){
        return 70;
    }

    get height(){
        return 50;
    }

    getPort(port)
    {
        switch (port) {
            case 1:
                return new Port(this, port, true);
        
            default:
                break;
        }
    }

    portLocation(port)
    {
        switch (port) {
            case 1:
                return new Point(this.x + this.width, this.y + this.height/2);
        
            default:
                break;
        }
    }

    over(x, y)
    {
        var distX = abs(x - (this.x + this.width/2));
        var distY = abs(y - (this.y + this.height/2));
        console.log(distX + ":" + distY);

        if (distX < this.width/2 && distY < this.width/2)
            return true;
        else
            return false;
    }

    overPort(x, y)
    {
        var distX;
        var distY;
        var portX;
        var portY;

        portX = this.x + this.width;
        portY = this.y + this.height/2;
        distX = abs(portX - x);
        distY = abs(portY - y);

        if(distX < portRadius && distY < portRadius)
            return 1;
        else
            return 0;
    }

    setMat(mat)
    {
        this.mat = mat;
    }

    draw()
    {
        var boxWidth = 25;
        var boxHeight = 25;
        var boxX = this.x + this.width/2 - boxWidth/2;
        var boxY = this.y + this.height/2 - boxHeight/2;

        fill(76, 79, 92);
        rect(this.x, this.y, this.width, this.height);

        fill(163, 7, 155);
        circle(this.x + this.width, this.y + this.height/2, portRadius);

        fill(100);
        rect(boxX, boxY, 25, 25);

        textSize(10);
        text("Rate: " + this.rate, this.x + this.width/2 - 10 + 20, this.y + this.height*1.25); 

        if (this.mat != null)
        {
            this.mat.draw(boxX, boxY, 25, 25);
            textSize(10);
            text(this.mat.idName, this.x + 10, this.y - this.height*.25); 
        }
    }
}

class Factory
{
    name = "Factory";
    x;
    y;
    mat1;
    mat2;
    mat;
    rate;

    constructor(x, y)
    {
        this.x = x;
        this.y = y;
        this.mat1 = null;
        this.mat2 = null;
        this.mat = null;
        this.rate = 0;
    }

    get width(){
        return 100;
    }

    get height(){
        return 50;
    }

    getPort(port)
    {
        switch (port) 
        {
            case 1:
                return new Port(this, port, true);
            
            case 2:
                return new Port(this, port, false);

            case 3:
                return new Port(this, port, false);
        
            default:
                break;
       
        }
    }

    portLocation(port)
    {
        switch (port) {
            case 1:
                return new Point(this.x + this.width, this.y + this.height/2);
            
            case 2:
                return new Point(this.x, this.y + this.height * .25);
        
            case 3:
                return new Point(this.x, this.y + this.height * .75);
        
            default:
                break;
        }
    }

    over(x, y)
    {
        var distX = abs(x - (this.x + this.width/2));
        var distY = abs(y - (this.y + this.height/2));
        console.log(distX + ":" + distY);

        if (distX < this.width/2 && distY < this.width/2)
            return true;
        else
            return false;
    }

    overMat(x, y)
    {
        if (this.over(x, y))
        {
            var distX = x - this.x -this.width/2;
            console.log("Side distance: ", distX, "...");
            if (distX > 0)
                return 2;
            else
                return 1;
        }
        else
            return 0;
    }

    overPort(x, y)
    {
        var distX;
        var distY;
        var portX;
        var portY;
        
        console.log("Port Checking!...");

        portX = this.x + this.width;
        portY = this.y + this.height/2;
        distX = abs(portX - x);
        distY = abs(portY - y);

        console.log("\tDistance: ",distX,":",distY);
        if(distX < portRadius && distY < portRadius)
            return 1;
        
        portX = this.x;
        portY = this.y + this.height * .25;
        distX = abs(portX - x);
        distY = abs(portY - y);

        console.log("\tDistance: ",distX,":",distY);
        if(distX < portRadius && distY < portRadius)
            return 2;

        portX = this.x;
        portY = this.y + this.height * .75;
        distX = abs(portX - x);
        distY = abs(portY - y);

        console.log("\tDistance: ",distX,":",distY);
        if(distX < portRadius && distY < portRadius)
            return 3;
        
        return 0;
    }

    setMat(index, mat)
    {
        console.log(index)
        switch (index) {
            case 3:
                this.setMat1(mat)
                break;

            case 2:
                this.setMat2(mat)
                break;
        
            default:
                break;
        }

        if (this.mat1 != null && this.mat2 != null)
        {
            mat = craft(this.mat1, this.mat2);
        }
    }
    setMat1(mat)
    {
        this.mat1 = mat;
    }
    setMat2(mat)
    {
        this.mat2 = mat;
    }

    draw()
    {
        var boxWidth = 25;
        var boxHeight = 25;
        var box1X = this.width/2 - boxWidth/2 + this.x - 25;
        var box1Y = this.height/2 - boxHeight/2 + this.y;
        var box2X = this.width/2 - boxWidth/2 + this.x + 25;
        var box2Y = this.height/2 - boxHeight/2 + this.y;

        fill(76, 79, 92);
        rect(this.x, this.y, this.width, this.height);

        //left ports
        fill(255, 120, 120);
        circle(this.x, this.y + this.height * .25, portRadius);
        fill(255, 120, 120);
        circle(this.x, this.y + this.height * .75, portRadius);

        //right port
        fill(163, 7, 155);
        circle(this.x + this.width, this.y + this.height/2, portRadius);

        textSize(10)
        text("Rate: " + this.rate, this.x + this.width/2 - 10 + 20, this.y + this.height* 1.25);  

        fill(200, 50, 50);
        rect(box1X, box1Y, 25, 25);
        if (this.mat1 != null)
        {
            this.mat1.draw(box1X, box1Y, 25, 25);
            textSize(10);
            text(this.mat1.idName, this.x + this.width * .25 - 10, this.y - this.height*.25); 
        }

        fill(200, 50, 50);
        rect(box2X, box2Y, 25, 25);
        if (this.mat2 != null)
        {
            this.mat2.draw(box2X, box2Y, 25, 25);
            textSize(10);
            text(this.mat2.idName, this.x + this.width * .75 - 10, this.y - this.height*.25); 
        }
    }
}

class Collector
{
    name = "Collector";

    x;
    y;

    mat;
    rate;

    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.mat = null;
        this.rate = 0;
    }

    get width(){
        return 70;
    }

    get height(){
        return 50;
    }

    getPort(port)
    {
        switch (port) {
            case 1:
                return new Port(this, port, false);
        
            default:
                break;
        }
    }

    portLocation(port)
    {
        switch (port) {
            case 1:
                return new Point(this.x, this.y + this.height/2);
        
            default:
                break;
        }
    }

    over(x, y)
    {
        var distX = abs(x - (this.x + this.width/2));
        var distY = abs(y - (this.y + this.height/2));
        console.log(distX + ":" + distY);

        if (distX < this.width/2 && distY < this.width/2)
            return true;
        else
            return false;
    }

    overPort(x, y)
    {
        var distX;
        var distY;
        var portX;
        var portY;

        portX = this.x;
        portY = this.y + this.height/2;
        distX = abs(portX - x);
        distY = abs(portY - y);

        if(distX < portRadius && distY < portRadius)
            return 1;
        else
            return 0;
    }

    setMat(mat)
    {
        this.mat = mat;
    }

    draw()
    {
        var boxWidth = 25;
        var boxHeight = 25;
        var boxX = this.x + this.width/2 - boxWidth/2;
        var boxY = this.y + this.height/2 - boxHeight/2;

        fill(76, 79, 92);
        rect(this.x, this.y, this.width, this.height);

        fill(255, 120, 120);
        circle(this.x, this.y + this.height/2, portRadius);

        fill(200, 50, 50);
        rect(boxX, boxY, 25, 25);

        textSize(10);
        text("Rate: " + this.rate, this.x + this.width/2 - 10 + 20, this.y + this.height * 1.25);  

        if (this.mat != null)
        {
            this.mat.draw(boxX, boxY, 25, 25);
            textSize(10);
            text(this.mat.idName, this.x + this.width/2 - 10, this.y - this.height*.25); 
        }
    }
}