function $(id) {
    return document.getElementById(id);
}

 function leinwandErstellen() {
        var malFeldSize = localStorage.getItem("breite");
        var leinwand = document.createElement("canvas");
        var backgroundcolor = localStorage.getItem("hinterGrundFarbe");
        leinwand.setAttribute("id", "leinwand");
        leinwand.width = malFeldSize;
        leinwand.height = malFeldSize;
        leinwand.style.position = "absolute";
        leinwand.style.top = "0px";
        leinwand.style.left = "0px";
        var ctx = leinwand.getContext('2d');
        ctx.fillStyle = backgroundcolor;
        ctx.fillRect(0, 0, malFeldSize, malFeldSize);
        var leinwandBackUp = document.createElement("canvas");
        leinwandBackUp.setAttribute("id", "leinwandBackUp");
        leinwandBackUp.style.position = "absolute";
        leinwandBackUp.style.top = leinwand.style.top;
        leinwandBackUp.style.left = leinwand.style.left;
        leinwandBackUp.width = malFeldSize;
        leinwandBackUp.height = malFeldSize;
        leinwand.addEventListener("mouseover", repaint, false);
        leinwand.addEventListener("touchmove", repaint, false);
        this.getLeinwand = function () {
            return leinwand;
        };
        this.getLeinwandBackUp = function () {
            return leinwandBackUp;
        };
        this.getLeinwandEinstellungen = function () {
            return leinwandBackUp;
        };
        this.getGrose = function () {
            return malFeldSize;
        };
        this.setLeinwandHintergrundMalen = function (farbe) {
            ctx = leinwand.getContext('2d');
            ctx.fillStyle = farbe;
            ctx.fillRect(0, 0, malFeldSize, malFeldSize);
            backgroundColor = farbe;
        };
        this.setLeinwandBackUp = function (newBackUp) {
            leinwandBackUp = newBackUp;
        };
        this.setLeinwand = function (newLeinwand) {
            leinwand = newLeinwand;
        };
        this.setGrose = function (newGrose) {
            malFeldSize = newGrose;
        };
        //Hier wird alles was online kommt gemalt auf die leinwand bzw auf das leinwand objekt
        this.onpaint = function (obj) {
            ctx.strokeStyle = obj.stiftFarbe;
            ctx.lineWidth = obj.stiftBreite;
            ctx.lineCap = ctx.lineJoin = "round";
            ctx.shadowColor = obj.stiftFarbe;
            if (obj.stiftTyp === 1)
            {
                ctx.shadowBlur = 0;
            }
            else {
                ctx.shadowBlur = 10;
            }
            ctx.beginPath();
            ctx.moveTo(obj.startPosX, obj.startPoxY);
            ctx.lineTo(obj.mouseX, obj.mouseY);
            ctx.stroke();
            ctx.shadowBlur = 0;
        };
    }


