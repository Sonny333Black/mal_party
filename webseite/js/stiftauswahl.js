function stiftauswahl() {
    //erstellen der privaten Variablen
    var anzahlFesterStifte = 5;
    var erstellteStifte = 0;
    var stiftAuswahlDiv = new Array();
    var gebauteStifte = new Array();
    var festeStifte = new Array();
    var currentStiftFarbe = "#000000";
    var currentStiftBreite = 1;
    var currentStift;
    //Für die festen Stifte
    var festeFarben = new Array("red", "#00ff00", "yellow", "#000000");
    var festeBreite = new Array("15", "5", "20", "30");
    var beweglicheBreite = 15;
    var aktuelleStifte = 0;
    var anzahlStifte = 0;


//bekommt die sachen aus dem Local storage nur stifte
    function gespeicherteStifteLaden() {
        // wenn sich was im Local Storage befindet dann soll er das erstmal laden
        if (localStorage.getItem("gespeicherteStifte") !== null)
        {

            var anzahlGespeicherterStifte = localStorage.getItem("gespeicherteStifte");
            // sind zwar mehr stifte im speicher nimmt aber nur die die auch vorher gespeichert waren
            for (var i = 0; i < anzahlGespeicherterStifte; i++)
            {
                var jsonStr = localStorage.getItem("stift" + [i]);
                var stiftAusSpeicher = JSON.parse(jsonStr);

                //Bild erstellen aus Speicher
                var tempCanvas = document.createElement("canvas");
                tempCanvas.width = 50;
                tempCanvas.height = 50;
                tempCanvas.setAttribute("id", "tempCanvas");
                var ctx = tempCanvas.getContext("2d");
                var img = new Image();
                img.src = stiftAusSpeicher.canvasBild;
                ctx.drawImage(img, 0, 0);

                //stift machen
                gebauteStifte[i] = new stift(stiftAusSpeicher.farbe, stiftAusSpeicher.breite, stiftAusSpeicher.id, tempCanvas);

                var stiftPalette = document.getElementById("stiftPalette");
                var gebauteStifteDiv = gebauteStifte[aktuelleStifte].getStiftDiv();
                //Neuen Stift setzen
                currentStift = gebauteStifte[aktuelleStifte];
                gebauteStifteDiv.setAttribute("id", "stiftDiv" + aktuelleStifte);
                //Ruf Funktion auf damit immer ein neuer scope erzeugt wird
                addListener(gebauteStifteDiv, aktuelleStifte);
                //Funktion mit neuem scope
                function addListener(stifteDiv, index) {
                    //EventListener hinzufÃ¼gen
                    stifteDiv.addEventListener("click", function () {
                        currentStift = gebauteStifte[index];
                        setzeStiftTypNormal();
                    }, false);
                    stifteDiv.addEventListener("touchstart", function () {
                        currentStift = gebauteStifte[index];
                        setzeStiftTypNormal();
                        console.log("bin in touchstart");
                    }, false);
                }
                //variablen hochzählen
                erstellteStifte++;
                aktuelleStifte++;
                stiftPalette.appendChild(gebauteStifteDiv);
            }

        }


    }

    //wird asugelöst wenn der Butten Stift speicher gedrückt wird
    function speicherStiftObjekt() {
        //begrentzung auf 4 gebaute Stifte
        if (gebauteStifte.length < 4)
        {
            //setzt Paramter auf aktuelle
            setBreite();
            setFarbe();
            //Erstellt eine neue Instanz in einem Array von dem Objekt stift
            gebauteStifte[aktuelleStifte] = new stift(currentStiftFarbe, currentStiftBreite, aktuelleStifte, vorschau);
            var stiftPalette = document.getElementById("stiftPalette");
            var gebauteStifteDiv = gebauteStifte[aktuelleStifte].getStiftDiv();
            //Neuen Stift setzen
            currentStift = gebauteStifte[aktuelleStifte];
            gebauteStifteDiv.setAttribute("id", "stiftDiv" + aktuelleStifte);
            setzeStiftTypNormal();
            //Ruf Funktion auf damit immer ein neuer scope erzeugt wird
            addListener(gebauteStifteDiv, aktuelleStifte);
            //Funktion mit neuem scope
            function addListener(stifteDiv, index) {
                //EventListener hinzufÃ¼gen
                stifteDiv.addEventListener("click", function () {
                    currentStift = gebauteStifte[index];
                    setzeStiftTypNormal();
                }, false);
                stifteDiv.addEventListener("touchstart", function () {
                    currentStift = gebauteStifte[index];
                    setzeStiftTypNormal();
                }, false);
            }
            erstellteStifte++;
            aktuelleStifte++;
            stiftPalette.appendChild(gebauteStifteDiv);
        }
        else {
            alert("Zu viele eigene Stifte lÃ¶schen sie erst einen ihrere Stifte");
        }
    }
    function loescheStiftObjekt() {
        if (aktuelleStifte !== 0)
        {
            var stiftPalette = document.getElementById("stiftPalette");

            var tempArray = new Array();
            // alle abhÃ¤ngen
            //erster durchgang hier geht 
            for (var i = 0; i < aktuelleStifte; i++)
            {
                document.getElementById("stiftDiv" + i).remove();
            }

            //das erste raus kicken
            for (var i = 1; i < gebauteStifte.length; i++)
            {
                var k = i - 1;
                tempArray[k] = gebauteStifte[i];
            }
            //wieder ins rihcitge aray laden
            gebauteStifte = tempArray;
            // und wieder auf die StiftPalette hängen
            //und natürlcih alle Listener wieder setzten
            for (var i = 0; i < gebauteStifte.length; i++)
            {
                gebauteStifte[i].getStiftDiv().setAttribute("id", "stiftDiv" + i);
                addListener(gebauteStifte[i].getStiftDiv(), i);
                //Funktion mit neuem scope
                function addListener(stifteDiv, index) {
                    //EventListener hinzufÃ¼gen
                    stifteDiv.addEventListener("click", function () {
                        currentStift = gebauteStifte[index];
                        setzeStiftTypNormal();
                    }, false);
                    stifteDiv.addEventListener("touchstart", function () {
                        currentStift = gebauteStifte[index];
                        setzeStiftTypNormal();
                    }, false);
                }
                stiftPalette.appendChild(gebauteStifte[i].getStiftDiv());
            }
            aktuelleStifte = gebauteStifte.length;
        }

    }
    function speicherFesteStiftObjekt(index) {
        //speichert neue Instanzen in das festeStifte Array und zeigt dieses auch an
        festeStifte[index] = new stift(currentStiftFarbe, currentStiftBreite, index, vorschau);
        var stiftPalette = document.getElementById("stiftPalette");
        var festerStifteDiv = festeStifte[index].getStiftDiv();
        //Neuen Stift setzen
        currentStift = festeStifte[index];
        festerStifteDiv.setAttribute("id", "festerStiftDiv" + index);
        //Ruf Funktion auf damit immer ein neuer scope erzeugt wird
        addListener(festerStifteDiv, index);
        //Funktion mit neuem scope
        function addListener(stifteDiv, index) {
            //EventListener hinzufÃ¼gen
            stifteDiv.addEventListener("click", function () {
                currentStift = festeStifte[index];
                setzeStiftTypNormal();
            }, false);
        }

        stiftPalette.appendChild(festerStifteDiv);



    }
// nur für den Specail Stift
    function setzeStiftTypNormal() {
        currentStift.setStiftTyp(1);
        document.getElementById("normalerStitfDiv").firstChild.setAttribute("src", "img/normalerStiftAktiv.png");
        document.getElementById("specialStiftDiv").firstChild.setAttribute("src", "img/specialStift.png");
    }
    function setzeStiftTypSpecial() {
        currentStift.setStiftTyp(2);
        document.getElementById("normalerStitfDiv").firstChild.setAttribute("src", "img/normalerStift.png");
        document.getElementById("specialStiftDiv").firstChild.setAttribute("src", "img/specialStiftAktiv.png");
    }
    //setzt breite und Farbe auf aktuellen Stift
    function setBreite() {
        currentStiftBreite = stiftBreiteAnzeige.value;
    }
    function setFarbe() {
        currentStiftFarbe = farbAuswahl.value;
    }
// Hier werden die festen Sfite anhand einer vorschleife erstellt
    function setFesteStifte() {
        for (var i = 0; i < festeFarben.length; i++) {
            currentStiftFarbe = festeFarben[i];
            currentStiftBreite = festeBreite[i];
            setVorschau();
            speicherFesteStiftObjekt(i);
        }

    }

// hier wird die Vorschau von dem gebauten Stift live gesetzt
    function setVorschau() {
        var context = vorschau.getContext("2d");
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, vorschau.width, vorschau.height);
        context.fillStyle = currentStiftFarbe;
        context.beginPath();
        context.arc(26, 26, currentStiftBreite * 0.6, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
    }
//Errstellung der Elemente
    var farbAuswahl = document.createElement("INPUT");
    farbAuswahl.addEventListener("change", setFarbe, false);
    farbAuswahl.setAttribute("type", "color");
    farbAuswahl.setAttribute("style", "width:20%; height:95%;");
    farbAuswahl.setAttribute("value", "#000000");
    farbAuswahl.addEventListener("change", setFarbe, false);
    farbAuswahl.addEventListener("change", setVorschau, false);

    var speicherButton = document.createElement("BUTTON");
    speicherButton.setAttribute("id", "speicherButton");
    var imageAdd = document.createElement("img");
    imageAdd.setAttribute("alt", "");
    imageAdd.setAttribute("src", "img/neuerStift.png");
    speicherButton.appendChild(imageAdd);
    speicherButton.addEventListener("click", speicherStiftObjekt, false);
    var loescheButton = document.createElement("BUTTON");
    loescheButton.setAttribute("id", "loescheButton");
    var imageDel = document.createElement("img");
    imageDel.setAttribute("alt", "");
    imageDel.setAttribute("src", "img/loescheStift.png");
    loescheButton.appendChild(imageDel);
    loescheButton.addEventListener("click", loescheStiftObjekt, false);

    var stiftBreiteAnzeige = document.createElement("INPUT");
    stiftBreiteAnzeige.setAttribute("style", "width:80%;");
    stiftBreiteAnzeige.setAttribute("type", "range");
    stiftBreiteAnzeige.setAttribute("value", beweglicheBreite);
    stiftBreiteAnzeige.setAttribute("min", "1");
    stiftBreiteAnzeige.setAttribute("max", "40");
    stiftBreiteAnzeige.addEventListener("change", setBreite, false);
    stiftBreiteAnzeige.addEventListener("change", setVorschau, false);

    var vorschauDiv = document.createElement("DIV");
    vorschauDiv.setAttribute("style", "width:40%;border:solid black 1px;");
    vorschauDiv.setAttribute("id", "vorschauDiv");

    var vorschau = document.createElement("canvas");
    vorschau.setAttribute("id", "vorschau");
    vorschau.width = 50;
    vorschau.height = 50;
    vorschauDiv.appendChild(vorschau);
//hier werden die Funktion einmal ausgeführt
//damit alles schön für den user angezeigt wird
    setVorschau();
    setFesteStifte();
    gespeicherteStifteLaden();
    //für die Hilight anzeige zum umschalten der Spceial Stifte funktion
    document.getElementById("normalerStitfDiv").addEventListener("click", setzeStiftTypNormal, false);
    document.getElementById("specialStiftDiv").addEventListener("click", setzeStiftTypSpecial, false);
    document.getElementById("normalerStitfDiv").addEventListener("touchstart", setzeStiftTypNormal, false);
    document.getElementById("specialStiftDiv").addEventListener("touchstart", setzeStiftTypSpecial, false);

    //setter und getter
    this.getSiftLoescheButton = function () {
        return loescheButton;
    };
    this.getSiftSpeicherButton = function () {
        return speicherButton;
    };
    this.getstiftFarbeAuswahl = function () {
        return farbAuswahl;
    };
    this.getStiftBreite = function () {
        return currentStiftBreite;
    };

    this.getStiftBreiteAnzeige = function () {
        return stiftBreiteAnzeige;
    };

    this.getVorschauDiv = function () {
        return vorschauDiv;
    };

    this.getStiftAuswahlDiv = function (number) {
        return stiftAuswahlDiv[number];
    };

    this.getAnzahlStiftauswahlen = function () {
        anzahlStifte = anzahlFesterStifte + erstellteStifte;
        return anzahlStifte;
    };

    this.getCurrentStift = function () {
        return currentStift;
    };
    this.getGebauteStifte = function () {
        return gebauteStifte;
    };

    this.loescheAlleStifte = function () {
        //Jascha ist coool
        var tempNum = aktuelleStifte;
        for (var i = 0; i < tempNum; i++) {
            loescheStiftObjekt();
        }
    };
//Setter um von auserhalb stifte reinladen zu können
    this.setGebautenStift = function (farbe, breite, canvasBild) {
        //begrentzung auf 4 gebaute Stifte
        if (gebauteStifte.length < 4)
        {
            //Bild erstellen aus Speicher
            var tempCanvas = document.createElement("canvas");
            tempCanvas.width = 50;
            tempCanvas.height = 50;
            tempCanvas.setAttribute("id", "tempCanvas");
            var ctx = tempCanvas.getContext("2d");
            var img = new Image();
            img.src = canvasBild;
            ctx.drawImage(img, 0, 0);

            //setzt Paramter auf aktuelle
            setBreite();
            setFarbe();
            //Erstellt eine neue Instanz in einem Array von dem Objekt stift
            gebauteStifte[aktuelleStifte] = new stift(farbe, breite, aktuelleStifte, tempCanvas);
            var stiftPalette = document.getElementById("stiftPalette");
            var gebauteStifteDiv = gebauteStifte[aktuelleStifte].getStiftDiv();
            //Neuen Stift setzen
            currentStift = gebauteStifte[aktuelleStifte];
            gebauteStifteDiv.setAttribute("id", "stiftDiv" + aktuelleStifte);
            setzeStiftTypNormal();
            //Ruf Funktion auf damit immer ein neuer scope erzeugt wird
            addListener(gebauteStifteDiv, aktuelleStifte);
            //Funktion mit neuem scope
            function addListener(stifteDiv, index) {
                //EventListener hinzufÃ¼gen
                stifteDiv.addEventListener("click", function () {
                    currentStift = gebauteStifte[index];
                    setzeStiftTypNormal();
                }, false);
                stifteDiv.addEventListener("touchstart", function () {
                    currentStift = gebauteStifte[index];
                    setzeStiftTypNormal();
                }, false);
            }
            erstellteStifte++;
            aktuelleStifte++;
            stiftPalette.appendChild(gebauteStifteDiv);
        }
        else {
            alert("Zu viele eigene Stifte lÃ¶schen sie erst einen ihrere Stifte");
        }
    };


}

