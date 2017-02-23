function male(leinwand, stift, netzCrlt) {
    //verarbeiten der paramter in Varibalen
    var canvas = leinwand.getLeinwand();
    var ctx = canvas.getContext('2d');
    var currentColor = stift.getStiftFarbe();
    var stiftBreite = stift.getStiftBreite();
    var stiftTyp = stift.getStiftTyp();
    var mouse = {x: 0, y: 0};
    //start Postion unm Nacher das als Paket zu senden
    var startPos = {x: 0, y: 0};

    //setzt den context zum malen
    ctx.lineWidth = stiftBreite;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    //setzten der Special Funktionen
    ctx.shadowColor = currentColor;
    ctx.shadowBlur = 0;

    if (stiftTyp !== 1)
    {
        //falls Special an sit mache den Schatten auf 10
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentColor;
    }
    //Abfangen der Mous Koordinaten
    //als sicherheit erstmal Löschen und dann einen neune anlagnen
    //damit nicht mehrer da sind
    canvas.removeEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);
    canvas.addEventListener('mousemove', function (e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        //Damit der bildschirm nicht scrollt 
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    }, false);

//hier das ganze nochmal für Touch Events

    canvas.removeEventListener('touchmove', function (e) {
        mouse.x = e.changedTouches[0].pageX - this.offsetLeft;
        mouse.y = e.changedTouches[0].pageY - this.offsetTop;
        //Damit der bildschirm nicht scrollt
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);
    }, false);
    canvas.addEventListener('touchmove', function (e) {
        mouse.x = e.changedTouches[0].pageX - this.offsetLeft;
        mouse.y = e.changedTouches[0].pageY - this.offsetTop;
        //Damit der bildschirm nicht scrollt
        document.body.addEventListener('touchmove', function (event) {
            event.preventDefault();
        }, false);

    }, false);
    canvas.addEventListener('mousedown', function (e) {
        speicherAufBackground();
        //speichert Start Postition
        startPos.x = mouse.x;
        startPos.y = mouse.y;
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function () {

        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    //ist dafür da das wenn man die Leinwand verlässt auch nicht weiter gemalt wird
    canvas.addEventListener('mouseleave', function () {

        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);
    //und alles nochmal für das Touch Event
    canvas.addEventListener('touchstart', function (e) {
        speicherAufBackground();
        mouse.x = e.changedTouches[0].pageX - this.offsetLeft;
        mouse.y = e.changedTouches[0].pageY - this.offsetTop;
        startPos.x = mouse.x;
        startPos.y = mouse.y;

        canvas.addEventListener('touchmove', onPaint, false);
    }, false);
    canvas.addEventListener('touchend', function () {

        canvas.removeEventListener('touchmove', onPaint, false);
    }, false);
    canvas.addEventListener('touchleave', function () {
        canvas.removeEventListener('touchmove', onPaint, false);
    }, false);
    
//Hier wird die eigentlich mal funktion ausgeführt
    var onPaint = function () {
        if (localStorage.getItem("maler") === "1") {
            ctx.beginPath();
            if (netzCrlt.getCurrentGroup() !== "")
            {
                //hier wird das paket mit allen sachen geschickt
                netzCrlt.sende({"typ": "malen", "gruppenName": netzCrlt.getCurrentGroup(), "startPosX": startPos.x, "startPoxY": startPos.y, "mouseX": mouse.x, "mouseY": mouse.y, "stiftBreite": stiftBreite, "stiftFarbe": currentColor, "stiftTyp": stiftTyp});
            }
            //Hier wird das ganze gemalt in einer Art Paket
            ctx.moveTo(startPos.x, startPos.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.closePath();
            ctx.stroke();
            startPos.x = mouse.x;
            startPos.y = mouse.y;
            //Dann muss die Farbe und Breite wieder auf 0 gesetzt werden
            currentColor = "";
            stiftBreite = 0;
        }

    };
    //speichert das Bild auf die Backgroudn Leinwand
    function speicherAufBackground()
    {
        //Variablen werden gefüllt
        var tempBackUp = leinwand.getLeinwandBackUp();
        var tempCtx = tempBackUp.getContext('2d');
        var canvasNew = leinwand.getLeinwand();
        tempBackUp.width = canvasNew.width;
        tempBackUp.height = canvasNew.height;
        //hier wird das Bild von der Leinwand auf den Background gemalt
        tempCtx.drawImage(canvas, 0, 0);
    }







}