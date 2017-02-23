function stift(farbe, breite, id, canvasBild) {
    //Verabrieten der eingabe Paramter
    var stiftFarbe = farbe;
    var stiftBreite = breite;
    var stiftID = id;
    var stiftDiv;
    var stiftTyp=1;
    var stiftCanvas = cloneCanvasObject(canvasBild);

    createstiftDiv();
// Erstellt das Div worauf das Canvas angezeigt wird
    function createstiftDiv() {
        stiftDiv = document.createElement("DIV");
        stiftDiv.setAttribute("style", "width:"+stiftCanvas.width+"px; height:"+stiftCanvas.height+"px; border: 1px solid black;");
        stiftDiv.appendChild(stiftCanvas);
    }
//erstellt kopie von dem Vorschau Bild des Stiftes
    function cloneCanvasObject(canvas) {
        //Clone Canvas
        var clonedCanvas = document.createElement('canvas');
        var context = clonedCanvas.getContext('2d');
        clonedCanvas.width = canvas.width;
        clonedCanvas.height = canvas.height;

        context.drawImage(canvas, 0, 0);
        return clonedCanvas;
    }
    //setter und getter Methoden
    this.getStiftTyp = function () {
        return stiftTyp;
    };
    this.setStiftTyp = function (stift) {
        stiftTyp = stift;
    };
    this.setStiftBreite = function (breiteStift) {
        stiftBreite = breiteStift;
    };
    this.getStiftFarbe = function () {
        return stiftFarbe;
    };

    this.getStiftBreite = function () {
        return stiftBreite;
    };

    this.getStiftDiv = function () {
        return stiftDiv;
    };

    this.getStiftID = function () {
        return stiftID;
    };
     this.getStiftCanvas = function () {
        return stiftCanvas;
    };
    
}