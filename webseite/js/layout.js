//damit man per ID auf Elemente zu greifen kann
"use strict";
//Diese Funktion dient dazu das Globale Namesn Raum nicht verletzt wird
(function () {
// Hier sind drei Varibalen die Nachher mit Objekten zu Instanzen werden
    var leinwand;
    var stiftauswahlObject;
    var netzCrlt;
//Das wird aufgerufen sobald die Seite Geladen wird
    window.addEventListener("load", function ()
    {

        //Zwei wichitge Variablen für den Hinter Grund
        var backgroundColor;
        var malFeldSize;
        //Alles was man zum erstellen der Seite brauch wird hier schonmal in
        //die Variablen geladen
        //Die Funktion dient dazu nochmal übersicht zu verschaffen
        ladenStartWerteLocalStorage();
        function ladenStartWerteLocalStorage() {
            //Hier wird geprüft ob ein Inahlt von dem Namen breite
            //überhaupt im localStorage ist
            if (localStorage.getItem("breite"))
            {
                //da gehst du rein wenn  du was hast
                malFeldSize = localStorage.getItem("breite");
            }
            //ist dies nicht der Fall wird eine Standart Größe gesetzt
            else {
                malFeldSize = 400;
                //Die größe wird auch dann direkt Im Local Storage geladen
                //um an anderen Stellen ausgelesen werden zu können
                localStorage.setItem("breite", malFeldSize);
            }
            //Geprüft ob Liste von Einstellungs SÄtzen da ist
            //wenn nicht wird sie auf 0 gesetzt damit wenn jemand Speichern will was da ist
            if (localStorage.getItem("ListeEinstellungen"))
            {
                //Ist es vorhanden ist alles gut
            }
            //ist dies nicht der Fall wird eine Standart Größe gesetzt
            else {
                var listeEinstellungen = new Array();
                //Die größe wird auch dann direkt Im Local Storage geladen
                //um an anderen Stellen ausgelesen werden zu können
                localStorage.setItem("ListeEinstellungen", JSON.stringify(listeEinstellungen));
            }
            if (localStorage.getItem("hinterGrundFarbe"))
            {
                backgroundColor = localStorage.getItem("hinterGrundFarbe");
            }
            else {
                //Wieder eine Standart Farbe wen man nichts im LocalStorage hat
                backgroundColor = "#21F1FF";
                localStorage.setItem("hinterGrundFarbe", backgroundColor);
            }
            // Hier wird die Maler Variable auf true gesetzt
            //diese wird später für den passiven Client benötigt
            localStorage.setItem("maler", 1);
        }
        //Dann wird ein Event Listener auf den anmelde Button gelegt
        //um dann den User Namen einspeichern zu können
        document.getElementById("anmelden").addEventListener("click", maleFeldschaffen, false);
        //Dieser Teil dient nur dazu das man direkt Enter Drücken kann wenn man
        //alles eingegeben hat
        document.getElementById("userEingabe").addEventListener("keydown", userEingabeAnmelden, false);
        function userEingabeAnmelden(e) {
            if (e.keyCode === 13) // Enter Taste
                maleFeldschaffen();
        }
        //Bei drücken auf Anmelden wird diese Funktion auf gerufen
        function maleFeldschaffen() {
            //der user name wird gehalten
            var user = document.getElementById("userEingabe").value;
            //Die HTML Seite komplett geleert
            htmlSeiteLeeren();
            //und den user Namen in seite Erstelen mit rein gegeben
            seiteErstellen(user);
        }

        function htmlSeiteLeeren() {
            var e = document.getElementById("anmeldung");
            //Die Parent Node von Anmeldung ist der Body
            //Somit wird alles im Body gelöscht
            e.parentNode.removeChild(e);
        }


        function seiteErstellen(user) {

            //Seite wrid kommplett neu in den Body Geschreiben
            // Am Anfang werden alle Elemente erschaffen und mit einer ID und einem Style versehen
            var wrapper = document.createElement("DIV");
            wrapper.setAttribute("id", "wrapper");
            wrapper.setAttribute("style", "display:flex;flex-wrap:wrap;justify-content:space-around;align-items: center;");
            var mitte = document.createElement("DIV");
            mitte.setAttribute("id", "mitte");
            mitte.setAttribute("style", "display: flex;flex-direction:column;align-items:center;justify-content: space-between;align-content:space-between;");
            var gruppenDiv = document.createElement("DIV");
            gruppenDiv.setAttribute("id", "gruppenDiv");
            gruppenDiv.setAttribute("style", "width:90px; height:100%; border: 2px solid black;display: flex;flex-direction:column;");
            var sketch = document.createElement("DIV");
            sketch.setAttribute("id", "sketch");
            sketch.setAttribute("style", "width:" + malFeldSize + "px; height:" + malFeldSize + "px;");
            var optionDiv = document.createElement("DIV");
            optionDiv.setAttribute("id", "optionDiv");
            optionDiv.setAttribute("style", "width:90px; height:100%; border: 2px solid black;display:flex;justify-content: space-around;flex-direction:column;");
            var toolbar = document.createElement("DIV");
            toolbar.setAttribute("id", "toolbar");
            toolbar.setAttribute("style", "width:500px; height:100%;border: 1px solid black;display:flex;flex-direction:row;");
            var allesAnStifteDiv = document.createElement("DIV");
            allesAnStifteDiv.setAttribute("id", "stifte");
            allesAnStifteDiv.setAttribute("style", "width:50%; height:104px; border: 1px solid black;display:flex;flex-direction:column;");
            var stiftErstellungDiv = document.createElement("DIV");
            stiftErstellungDiv.setAttribute("id", "stiftErstellungDiv");
            stiftErstellungDiv.setAttribute("style", "width:100%; height:60%; border: 1px solid black;display:flex;flex-direction:row;");
            var stiftTypDiv = document.createElement("DIV");
            stiftTypDiv.setAttribute("id", "stiftTypDiv");
            stiftTypDiv.setAttribute("style", "width:11%; height:104px; border: 1px solid black;display:flex;flex-direction:column;");
            var normalerStitfDiv = document.createElement("DIV");
            normalerStitfDiv.setAttribute("id", "normalerStitfDiv");
            normalerStitfDiv.setAttribute("style", "width:100%; height:50%;border: 1px solid black;");
            var imageNormal = document.createElement("img");
            imageNormal.setAttribute("alt", "");
            imageNormal.setAttribute("src", "img/normalerStiftAktiv.png");
            normalerStitfDiv.appendChild(imageNormal);
            var specialStiftDiv = document.createElement("DIV");
            specialStiftDiv.setAttribute("id", "specialStiftDiv");
            specialStiftDiv.setAttribute("style", "width:100%; height:50%;border: 1px solid black;");
            var imageSpecial = document.createElement("img");
            imageSpecial.setAttribute("alt", "");
            imageSpecial.setAttribute("src", "img/specialStift.png");
            specialStiftDiv.appendChild(imageSpecial);
            var stiftSpeicherDiv = document.createElement("DIV");
            stiftSpeicherDiv.setAttribute("id", "stiftSpeicherDiv");
            stiftSpeicherDiv.setAttribute("style", "width:100%; height:40%; border: 1px solid black;display:flex;flex-direction:row;");
            var stiftPalette = document.createElement("DIV");
            stiftPalette.setAttribute("id", "stiftPalette");
            stiftPalette.setAttribute("style", "height:100%;width:222px;border: 1px solid black;display:flex;flex-direction:row;flex-wrap:wrap;");
            var buttonSpeichern = document.createElement("BUTTON");
            buttonSpeichern.setAttribute("id", "buttonSpeichern");
            var buttonSpeichernFunktion = document.createElement("A");
            buttonSpeichernFunktion.setAttribute("id", "buttonSpeichernFunktion");
            var imageSave = document.createElement("img");
            imageSave.setAttribute("alt", "");
            imageSave.setAttribute("src", "img/save.png");
            buttonSpeichernFunktion.appendChild(imageSave);
            buttonSpeichernFunktion.addEventListener("click", speichern, false);
            var buttonRueckgaenging = document.createElement("BUTTON");
            buttonRueckgaenging.setAttribute("id", "buttonRueckgaenging");
            var imageRueck = document.createElement("img");
            imageRueck.setAttribute("alt", "");
            imageRueck.setAttribute("src", "img/undo.png");
            buttonRueckgaenging.appendChild(imageRueck);
            buttonRueckgaenging.addEventListener("click", ruckgangig, false);
            var buttonEinstellungen = document.createElement("BUTTON");
            buttonEinstellungen.setAttribute("id", "buttonEinstellungen");
            var imageEinstell = document.createElement("img");
            imageEinstell.setAttribute("alt", "");
            imageEinstell.setAttribute("src", "img/settings.png");
            buttonEinstellungen.appendChild(imageEinstell);
            buttonEinstellungen.addEventListener("click", einstellungenEinblenden, false);
            var buttonLoeschen = document.createElement("BUTTON");
            buttonLoeschen.setAttribute("id", "buttonLoeschen");
            var imageLoeschen = document.createElement("img");
            imageLoeschen.setAttribute("alt", "");
            imageLoeschen.setAttribute("src", "img/delete.png");
            buttonLoeschen.appendChild(imageLoeschen);
            buttonLoeschen.addEventListener("click", neueLeinwand, false);
            buttonLoeschen.setAttribute("id", "buttonLoeschen");


//******************Ab hier beginnt nun Das erstellen für die Einstellungen
//          das Was sich in den Einstellungen befindet wnen diese eingeblendet werden

            var kleinLeinwand = document.createElement("BUTTON");
            var bildKlein = document.createElement("img");
            bildKlein.setAttribute("alt", "");
            bildKlein.setAttribute("src", "img/klein.png");
            kleinLeinwand.appendChild(bildKlein);
            kleinLeinwand.setAttribute("id", "kleinLeinwand");
            var mittelLeinwand = document.createElement("BUTTON");
            var bildMittel = document.createElement("img");
            bildMittel.setAttribute("alt", "");
            bildMittel.setAttribute("src", "img/mittel.png");
            mittelLeinwand.appendChild(bildMittel);
            mittelLeinwand.setAttribute("id", "mittelLeinwand");
            var grosLeinwand = document.createElement("BUTTON");
            var bildGros = document.createElement("img");
            bildGros.setAttribute("alt", "");
            bildGros.setAttribute("src", "img/gros.png");
            grosLeinwand.appendChild(bildGros);
            grosLeinwand.setAttribute("id", "grosLeinwand");
            var leinwandEinstellungenDiv = document.createElement("DIV");
            leinwandEinstellungenDiv.setAttribute("id", "leinwandEinstellungenDiv");
            leinwandEinstellungenDiv.setAttribute("style", "width:100%;height:100%;display:flex;flex-direction:column;align-items:center;");
            leinwandEinstellungenDiv.style.display = 'none';
            var leinwandHintergrund = document.createElement("INPUT");
            leinwandHintergrund.setAttribute("type", "color");
            leinwandHintergrund.setAttribute("value", backgroundColor);
            leinwandHintergrund.setAttribute("id", "leinwandHintergrund");
            var regelerP = document.createElement("p");
            var farbeHintergrundP = document.createElement("p");
            var imageBackground = document.createElement("img");
            imageBackground.setAttribute("alt", "");
            imageBackground.setAttribute("src", "img/hinterggrundFarbe.png");
            var imageSize = document.createElement("img");
            imageSize.setAttribute("alt", "");
            imageSize.setAttribute("src", "img/size.png");
            regelerP.appendChild(imageSize);
            farbeHintergrundP.setAttribute("id", "farbeHintergrundP");
            farbeHintergrundP.appendChild(imageBackground);
            var einstellungenSpeichern = document.createElement("BUTTON");
            einstellungenSpeichern.setAttribute("id", "einstellungenSpeichern");
            einstellungenSpeichern.style.width = '100%';
            var imageUebern = document.createElement("img");
            imageUebern.setAttribute("alt", "");
            imageUebern.setAttribute("src", "img/uebern.png");
            einstellungenSpeichern.appendChild(imageUebern);
            var einstellungenBack = document.createElement("BUTTON");
            einstellungenBack.setAttribute("id", "einstellungenBack");
            einstellungenBack.style.width = '100%';
            var imageAbbr = document.createElement("img");
            imageAbbr.setAttribute("alt", "");
            imageAbbr.setAttribute("src", "img/abbr.png");
            einstellungenBack.appendChild(imageAbbr);
            einstellungenBack.addEventListener("click", einstellungenAusblenden, false);
            var groseSchieben = document.createElement("INPUT");
            groseSchieben.setAttribute("type", "range");
            groseSchieben.setAttribute("value", malFeldSize);
            groseSchieben.setAttribute("min", "200");
            groseSchieben.setAttribute("max", "800");
            groseSchieben.setAttribute("style", "width:80px");
            groseSchieben.setAttribute("id", "groseSchieben");

//**************Hier werden Die Einstellungs Sachen an das Einstellungs Div gebunden
            verbindenDerEinstellungen();
            function verbindenDerEinstellungen() {
                regelerP.appendChild(groseSchieben);
                farbeHintergrundP.appendChild(leinwandHintergrund);
                leinwandEinstellungenDiv.appendChild(kleinLeinwand);
                leinwandEinstellungenDiv.appendChild(mittelLeinwand);
                leinwandEinstellungenDiv.appendChild(grosLeinwand);
                leinwandEinstellungenDiv.appendChild(farbeHintergrundP);
                leinwandEinstellungenDiv.appendChild(regelerP);
                leinwandEinstellungenDiv.appendChild(einstellungenSpeichern);
                leinwandEinstellungenDiv.appendChild(einstellungenBack);
            }





            // nun wird eine Instanz von dem Objekt leinwandErstellen erzeugt
            leinwand = new leinwandErstellen();
            //Hier werden schonmal alle Sachen auf den Wrapper gehängt
            //aber nur von der mitte
            verbinden();
            //nun wird auchdie Instanz von dem Objekt stiftauswahl erzeugt
            stiftauswahlObject = new stiftauswahl();
            //Hier wird das Option div gefülllt und dem mittel Teil hinzugefügt
            appendOption();
            // Hier werden alle Stift sachen zusammen gebaut und an allesAnStifteDiv gehängt
            appendStiftauswahl();

            function verbinden() {
                stiftTypDiv.appendChild(normalerStitfDiv);
                stiftTypDiv.appendChild(specialStiftDiv);
                toolbar.appendChild(allesAnStifteDiv);
                toolbar.appendChild(stiftPalette);
                toolbar.appendChild(stiftTypDiv);
                mitte.appendChild(toolbar);
                sketch.appendChild(leinwand.getLeinwandBackUp());
                sketch.appendChild(leinwand.getLeinwand());
                mitte.appendChild(sketch);
                //Mitte erstellen                
                wrapper.appendChild(mitte);
                //Dies musste eingebaut werden damit Die Instanz stiftauswahl auch 
                //alle Sachen finden kann die Sie braucht
                document.body.appendChild(wrapper);
            }

            function appendOption() {
                buttonSpeichern.appendChild(buttonSpeichernFunktion);
                optionDiv.appendChild(buttonSpeichern);
                optionDiv.appendChild(buttonRueckgaenging);
                optionDiv.appendChild(leinwandEinstellungenDiv);
                optionDiv.appendChild(buttonEinstellungen);
                optionDiv.appendChild(buttonLoeschen);
                mitte.appendChild(optionDiv);
            }

            function appendStiftauswahl() {
                stiftErstellungDiv.appendChild(stiftauswahlObject.getstiftFarbeAuswahl());
                stiftErstellungDiv.appendChild(stiftauswahlObject.getStiftBreiteAnzeige());
                stiftErstellungDiv.appendChild(stiftauswahlObject.getVorschauDiv());
                stiftSpeicherDiv.appendChild(stiftauswahlObject.getSiftSpeicherButton());
                stiftSpeicherDiv.appendChild(stiftauswahlObject.getSiftLoescheButton());
                allesAnStifteDiv.appendChild(stiftErstellungDiv);
                allesAnStifteDiv.appendChild(stiftSpeicherDiv);
            }
            //Dies wird aus geführt wenn man Auf Einstellungen klickt
            function einstellungenEinblenden() {
                //eine Zähl variable die gebraucht wird damit prompt nicht mehrmals angezegit wird
                var einmalFragen = 0;
                var leinwandTemp = new leinwandErstellen();
                var ctx = leinwandTemp.getLeinwand().getContext('2d');
                //nun wird die aktuelle leinwand erstmal entfernt
                leinwand.getLeinwand().remove();
                leinwand.getLeinwandBackUp().remove();
                //Hier werden alle Sachen aus dem Eistellungs die beraucht werden ein und ausgeschaltet
                document.getElementById("leinwandEinstellungenDiv").style.display = 'block';
                document.getElementById("einstellungenSpeichern").style.display = 'block';
                document.getElementById("einstellungenBack").style.display = 'block';
                document.getElementById("buttonSpeichern").style.display = 'none';
                document.getElementById("buttonRueckgaenging").style.display = 'none';
                document.getElementById("buttonEinstellungen").style.display = 'none';
                document.getElementById("buttonLoeschen").style.display = 'none';
                //Event Listener für die Schiebe Regeler und den Color Input
                //zur sicherheit wird auch erstmal alles removed
                groseSchieben.removeEventListener("change", setMalFeldSize, false);
                groseSchieben.addEventListener("change", setMalFeldSize, false);
                leinwandHintergrund.removeEventListener("change", setLeinwand, false);
                leinwandHintergrund.addEventListener("change", setLeinwand, false);
                //Diese FUnktoin wird benutzt um die Hintergrund Farbe zu verändern
                function setMalFeldSize() {
                    malFeldSize = groseSchieben.value;
                    setLeinwand();
                }
                // Hier werden die drei festen Größen mit einem Listener versehen und auch direkt
                //setLeinwand auf gerufen
                mittelLeinwand.addEventListener("click", setzeCurrentBreiteMittle, false);
                function setzeCurrentBreiteMittle() {
                    malFeldSize = 400;
                    groseSchieben.setAttribute("value", malFeldSize);
                    setLeinwand();
                }
                grosLeinwand.addEventListener("click", setzeCurrentBreiteGros, false);
                function setzeCurrentBreiteGros() {
                    malFeldSize = 600;
                    groseSchieben.setAttribute("value", malFeldSize);
                    setLeinwand();
                }
                kleinLeinwand.addEventListener("click", setzeCurrentBreiteKlein, false);
                function setzeCurrentBreiteKlein() {
                    malFeldSize = 200;
                    groseSchieben.setAttribute("value", malFeldSize);
                    setLeinwand();
                }



                einstellungenSpeichern.removeEventListener("click", speicherNeueEinstellungen, false);
                einstellungenSpeichern.addEventListener("click", speicherNeueEinstellungen, false);
                einstellungenBack.removeEventListener("click", keineNeuenEinstellungen, false);
                einstellungenBack.addEventListener("click", keineNeuenEinstellungen, false);
                //ausrichtender Leinwand
                leinwandTemp.getLeinwand().style.left = leinwandTemp.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                leinwandTemp.getLeinwand().style.top = leinwandTemp.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";
                // hier wird die Temporäre Leinwand auf den sketch gehangen
                sketch.appendChild(leinwandTemp.getLeinwand());
                window.addEventListener("resize", function ()
                {
                    //ausrichtender Leinwand
                    leinwandTemp.getLeinwand().style.left = leinwandTemp.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                    leinwandTemp.getLeinwand().style.top = leinwandTemp.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";
                });
                //wenn doch nichts geändert werden soll bringt diese Funktion alles auf den ursprung zurück
                function keineNeuenEinstellungen() {
                    document.getElementById("sketch").appendChild(leinwand.getLeinwandBackUp());
                    document.getElementById("sketch").appendChild(leinwand.getLeinwand());
                    document.getElementById("sketch").setAttribute("style", "width:" + leinwand.getLeinwand().width + "px; height:" + leinwand.getLeinwand().height + "px;");
                    leinwandTemp.getLeinwand().remove();
                    //leinwandTemp = {};
                    einstellungenAusblenden();
                }
                //hier werden die neuen Einstellungen gesetzt
                function speicherNeueEinstellungen() {
                    //damit er nur einmal nachfragt 
                    //wenn das nicht is dann Frage er so oft da schon 
                    //in der laufenden Session drauf geklickt wurde


                    var tempCtx = leinwand.getLeinwand().getContext('2d');
                    leinwand.getLeinwand().width = leinwandTemp.getLeinwand().width;
                    leinwand.getLeinwand().height = leinwandTemp.getLeinwand().height;
                    leinwand.getLeinwandBackUp().width = leinwandTemp.getLeinwand().width;
                    leinwand.getLeinwandBackUp().height = leinwandTemp.getLeinwand().height;
                    tempCtx.drawImage(leinwandTemp.getLeinwand(), 0, 0);
                    leinwandTemp.getLeinwand().remove();
                    document.getElementById("sketch").appendChild(leinwand.getLeinwandBackUp());
                    document.getElementById("sketch").appendChild(leinwand.getLeinwand());
                    localStorage.setItem("hinterGrundFarbe", leinwandHintergrund.value);
                    localStorage.setItem("breite", leinwand.getLeinwand().width);
                    //ausrichten
                    leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                    leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";

                    if (einmalFragen === 0)
                    {
                        // eine abfrage ob das alte bild noch gespeichert werden soll
                        altesBildNichtDirektVerwerfen();
                        einmalFragen++;
                    }

                    einstellungenAusblenden();
                }
                function setLeinwand() {
                    ctx = leinwandTemp.getLeinwand().getContext('2d');
                    leinwandTemp.getLeinwand().height = malFeldSize;
                    ctx.canvas.width = malFeldSize;
                    ctx.canvas.height = malFeldSize;
                    ctx.fillStyle = leinwandHintergrund.value;
                    ctx.fillRect(0, 0, malFeldSize, malFeldSize);
                    document.getElementById("sketch").setAttribute("style", "width:" + malFeldSize + "px; height:" + malFeldSize + "px;");
                    leinwandTemp.getLeinwand().style.left = leinwandTemp.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                    leinwandTemp.getLeinwand().style.top = leinwandTemp.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";
                }
                ;
            }
//************* hier wird wieder alles eingeblendet was vorher da war und das andere ausgeblendet
            function einstellungenAusblenden() {
                document.getElementById("leinwandEinstellungenDiv").style.display = 'none';
                document.getElementById("einstellungenSpeichern").style.display = 'none';
                document.getElementById("einstellungenBack").style.display = 'none';
                document.getElementById("buttonSpeichern").style.display = 'block';
                document.getElementById("buttonRueckgaenging").style.display = 'block';
                document.getElementById("buttonEinstellungen").style.display = 'block';
                document.getElementById("buttonLoeschen").style.display = 'block';
                //ausrichten
                leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";

            }





// hier werden alle Elemente richitg angeordent auf den Body geschrieben
            aufbody();
            function aufbody() {
                //body lÃ¶schen und wieder erneuern
                var e = document.getElementById("wrapper");
                e.parentNode.removeChild(e);
                wrapper.appendChild(gruppenDiv);
                wrapper.appendChild(mitte);
                wrapper.appendChild(optionDiv);
                document.body.appendChild(wrapper);
                leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = sketch.offsetLeft + "px";
                leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = sketch.offsetTop + "px";
            }

//************ falls ein altes Bild exestiert wird es hier auf die Aktuelle Leinwand geschrieben
            ladenLocalStorage();
            function ladenLocalStorage() {
                var ctx = leinwand.getLeinwand().getContext("2d");
                if (localStorage.getItem("meinLocStoreBild")) {
                    var img = new Image();
                    img.src = localStorage.getItem("meinLocStoreBild");
                    ctx.drawImage(img, 0, 0);
                    //Damit das BackUp das selbe Bild bekommt

                    //Variablen werden gefüllt
                    var tempBackUp = leinwand.getLeinwandBackUp();
                    var tempCtx = tempBackUp.getContext('2d');

                    //hier wird das Bild von der Leinwand auf den Background gemalt
                    tempCtx.drawImage(img, 0, 0);

                }
                else {
                }

            }

            //Netzwerk
            //Objekt vom Netzocnrotller erzeugt
            netzCrlt = new netzcontroller(user, leinwand);
//*******************Custom Element 
            //Hier wird mein Custom Elemnt Regestriert
            var dbProt = Object.create(HTMLButtonElement.prototype);
            //Hier werden Eigentschafte festgelegt
            dbProt.createdCallback = function () {
                var visible = true;
                var button = document.createElement("BUTTON");
                button.addEventListener("click", function () {
                    //Ein und ausblenden
                    if (visible) {
                        visible = false;
                        imageButton.setAttribute("src", "img/fullscreen2.png");
                        document.getElementById("gruppenDiv").style.visibility = "hidden";
                        document.getElementById("optionDiv").style.visibility = "hidden";
                        document.getElementById("toolbar").style.visibility = "hidden";
                        document.getElementById("ladenDerEinstellungen").style.visibility = "hidden";
                        document.getElementById("speichernDerEinstellungen").style.visibility = "hidden";

                    }
                    else {
                        visible = true;
                        imageButton.setAttribute("src", "img/fullscreen.png");
                        document.getElementById("gruppenDiv").style.visibility = "visible";
                        document.getElementById("optionDiv").style.visibility = "visible";
                        document.getElementById("toolbar").style.visibility = "visible";
                        document.getElementById("ladenDerEinstellungen").style.visibility = "visible";
                        document.getElementById("speichernDerEinstellungen").style.visibility = "visible";
                    }
                });
                //Hier wird das Fenster mit den Elementen für dieses erstellt
                var vordergrundDiv = document.createElement("DIV");
                vordergrundDiv.setAttribute("id", "vordergrundDiv");
                vordergrundDiv.setAttribute("style", "position:absolute; top:0; left:0; width:100%; height:100%; z-index:1000; background-color: rgba(100,100,100,0.5);");
                vordergrundDiv.style.display = 'none';
                document.body.appendChild(vordergrundDiv);
                var fenster = document.createElement("DIV");
                fenster.setAttribute("id", "fenster");
                fenster.setAttribute("style", "width:200px;height:200px;background-color:grey;position:absolute; border: 10px solid blue;left:" + (window.innerWidth / 2 - 100) + "px;top:" + (window.innerHeight / 2 - 100) + "px;");
                vordergrundDiv.appendChild(fenster);
                var speichernDerEinstellungen = document.createElement("BUTTON");
                speichernDerEinstellungen.setAttribute("id", "speichernDerEinstellungen");
                var imageSpeichernDerEinstellungen = document.createElement("img");
                imageSpeichernDerEinstellungen.setAttribute("src", "img/saveSettings.png");
                imageSpeichernDerEinstellungen.setAttribute("alt", "");
                speichernDerEinstellungen.appendChild(imageSpeichernDerEinstellungen);
                //klick event
                speichernDerEinstellungen.addEventListener("click", function () {
                    var einstellungName = prompt("Bitte Name für Einstellung eingeben", "test");
                    if (einstellungName !== "" && einstellungName !== null)
                    {
                        var listeEinstellungen = JSON.parse(localStorage.getItem("ListeEinstellungen"));
                        listeEinstellungen.push(einstellungName);
                        localStorage.setItem("ListeEinstellungen", JSON.stringify(listeEinstellungen));
                        //Arrays bauen um das nachher als JSON zu speichern
                        var stifteAnzahl = stiftauswahlObject.getGebauteStifte();
                        var speichereFarbe = new Array();
                        var speichereBreite = new Array();
                        var speichereBild = new Array();
                        for (var i = 0; i < stifteAnzahl.length; i++) {
                            speichereFarbe[i] = stifteAnzahl[i].getStiftFarbe();
                            speichereBreite[i] = stifteAnzahl[i].getStiftBreite();
                            speichereBild[i] = stifteAnzahl[i].getStiftCanvas().toDataURL();
                        }
                        // array werden zusammen gefasst
                        var speicherStifte = [speichereFarbe, speichereBreite, speichereBild];
                        //JSON 1 dammit die Grund Einstellungen geladen werden
                        var jsonEinstellungSet = {
                            "hintergrundFarbeAktuell": localStorage.getItem("hinterGrundFarbe"),
                            "leinwandGrose": leinwand.getLeinwand().width,
                            "anzahlStifte": stifteAnzahl.length,
                            "bild": leinwand.getLeinwand().toDataURL()
                        };
                        var einstellungNameBasis = einstellungName + "Basis";
                        var einstellungNameStifte = einstellungName + "Stifte";
                        localStorage.setItem(einstellungNameBasis, JSON.stringify(jsonEinstellungSet));
                        //JSSON 2 mit den ganzen Stiften
                        localStorage.setItem(einstellungNameStifte, JSON.stringify(speicherStifte));
                    }
                });
                //Hier kommt der Laden Teil der Einstellungssets 
                var ladenDerEinstellungen = document.createElement("BUTTON");
                ladenDerEinstellungen.setAttribute("id", "ladenDerEinstellungen");
                var imageLadenDerEinstellungen = document.createElement("img");
                imageLadenDerEinstellungen.setAttribute("src", "img/loadSettings.png");
                imageLadenDerEinstellungen.setAttribute("alt", "");
                ladenDerEinstellungen.appendChild(imageLadenDerEinstellungen);
                ladenDerEinstellungen.addEventListener("click", function () {
                    //Fenster wird eingeblendet
                    vordergrundDiv.style.display = 'block';
                    //Liste der Einstellungen werden geladen
                    var listeEinstellungen = JSON.parse(localStorage.getItem("ListeEinstellungen"));
                    //Hier wird das dropdown menü gemacht 
                    var auswahlEinstellungen = document.createElement("SELECT");
                    auswahlEinstellungen.setAttribute("id", "auswahlEinstellungen");
                    for (var i = 0; i < listeEinstellungen.length; i++) {
                        var option = document.createElement("OPTION");
                        option.setAttribute("value", listeEinstellungen[i]);
                        option.appendChild(document.createTextNode(listeEinstellungen[i]));
                        auswahlEinstellungen.appendChild(option);
                    }
                    fenster.appendChild(auswahlEinstellungen);
                    //Laden der eisntellugn Button
                    var einstellungenLaden = document.createElement("Button");
                    einstellungenLaden.setAttribute("id", "einstellungenLaden");
                    var imageBackButtonSets = document.createElement("img");
                    imageBackButtonSets.setAttribute("src", "img/loadSettings.png");
                    imageBackButtonSets.setAttribute("alt", "");
                    einstellungenLaden.appendChild(imageBackButtonSets);
                    einstellungenLaden.addEventListener("click", function () {
                        var gespeicherteStifte = JSON.parse(localStorage.getItem(auswahlEinstellungen.value + "Stifte"));
                        var gespeicherteBasis = JSON.parse(localStorage.getItem(auswahlEinstellungen.value + "Basis"));
                        //löschen aller bisher vorhanden stifte
                        stiftauswahlObject.loescheAlleStifte();
                        for (var i = 0; i < gespeicherteBasis.anzahlStifte; i++) {
                            //Hier werden die stifte neu rein geladen
                            stiftauswahlObject.setGebautenStift(gespeicherteStifte[0][i], gespeicherteStifte[1][i], gespeicherteStifte[2][i]);
                        }
                        //Hier wird die Leinwand verändert
                        document.getElementById("sketch").setAttribute("style", "width:" + gespeicherteBasis.leinwandGrose + "px; height:" + gespeicherteBasis.leinwandGrose + "px;");
                        leinwand.getLeinwand().width = gespeicherteBasis.leinwandGrose;
                        leinwand.getLeinwand().height = gespeicherteBasis.leinwandGrose;
                        leinwand.getLeinwandBackUp().width = gespeicherteBasis.leinwandGrose;
                        leinwand.getLeinwandBackUp().height = gespeicherteBasis.leinwandGrose;

                        //ausrichten
                        leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                        leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";
                        leinwand.setLeinwandHintergrundMalen(gespeicherteBasis.hintergrundFarbeAktuell);
                        localStorage.setItem("hinterGrundFarbe", gespeicherteBasis.hintergrundFarbeAktuell);
                        localStorage.setItem("breite", gespeicherteBasis.leinwandGrose);
                        
           //************* hier bild malen        
                    var img = new Image();
                    img.src = gespeicherteBasis.bild;
                    leinwand.getLeinwand().getContext('2d').drawImage(img, 0, 0);
                        fertigEinstellungenSets();
                    });
                    //Alles Löschen Button
                    var allesLoeschen = document.createElement("Button");
                    allesLoeschen.setAttribute("id", "allesLoeschen");
                    var imageAllesLoeschen = document.createElement("img");
                    imageAllesLoeschen.setAttribute("src", "img/deleteSettings.png");
                    imageAllesLoeschen.setAttribute("alt", "");
                    allesLoeschen.appendChild(imageAllesLoeschen);
                    allesLoeschen.addEventListener("click", function () {
                        var listeEinstellungen = JSON.parse(localStorage.getItem("ListeEinstellungen"));
                        for (var i = 0; i < listeEinstellungen.length; i++) {
                            localStorage.removeItem(listeEinstellungen[i] + "Stifte");
                            localStorage.removeItem(listeEinstellungen[i] + "Basis");
                        }
                        //neue Liste anfertigen
                        listeEinstellungen = new Array();
                        localStorage.setItem("ListeEinstellungen", JSON.stringify(listeEinstellungen));
                        //alle sachen vom drop downmenüü löschen
                        var tempSelect = document.getElementById("auswahlEinstellungen");
                        while (tempSelect.hasChildNodes()) {
                            tempSelect.removeChild(document.getElementById("auswahlEinstellungen").childNodes[0]);
                        }
                        fertigEinstellungenSets();
                    });
                    var backButtonSets = document.createElement("Button");
                    backButtonSets.setAttribute("id", "backButtonSets");
                    var imageVerlassenButton = document.createElement("img");
                    imageVerlassenButton.setAttribute("src", "img/door.png");
                    imageVerlassenButton.setAttribute("alt", "");
                    backButtonSets.appendChild(imageVerlassenButton);
                    backButtonSets.addEventListener("click", fertigEinstellungenSets, false);


                    //Anhängen
                    fenster.appendChild(einstellungenLaden);
                    fenster.appendChild(allesLoeschen);
                    fenster.appendChild(backButtonSets);

                    function fertigEinstellungenSets() {
                        while (fenster.hasChildNodes()) {
                            fenster.removeChild(document.getElementById("fenster").childNodes[0]);
                        }
                        vordergrundDiv.style.display = 'none';
                    }

                });
                //Anhängen des Button an das Element
                button.setAttribute("id", "Ausblenden");
                var imageButton = document.createElement("img");
                imageButton.setAttribute("id","imageButton");
                imageButton.setAttribute("src", "img/fullscreen.png");
                imageButton.setAttribute("alt", "");
                button.appendChild(imageButton);
                this.appendChild(ladenDerEinstellungen);
                this.appendChild(button);
                this.appendChild(speichernDerEinstellungen);                
            };
            document.registerElement('db-button', {prototype: dbProt});
            //Erstellen des Costum Elements und anhängen an den Body
            var costumElement = document.createElement("DB-BUTTON");
            costumElement.setAttribute("id", "costumElement");
            document.body.appendChild(costumElement);



        }





    });
    // Falls eine neue Leinwand erstellt werden soll 
    // wird einfach ein Rechteck mit der HintergrundFarbe gemalt
    function neueLeinwand() {
        var backgroundcolor = localStorage.getItem("hinterGrundFarbe");
        var malFeldSize = localStorage.getItem("breite");
        var ctx = leinwand.getLeinwand().getContext('2d');
        ctx.fillStyle = backgroundcolor;
        ctx.fillRect(0, 0, malFeldSize, malFeldSize);
    }
//Hier ist das Obejkt leinwandErstellen
    function leinwandErstellen() {
        //Füllen der Varibalen aus dem localStorage
        var malFeldSize = localStorage.getItem("breite");
        var backgroundcolor = localStorage.getItem("hinterGrundFarbe");
        //erstellen und edetieren des ersten Canvas Element
        var leinwand = document.createElement("canvas");
        leinwand.setAttribute("id", "leinwand");
        leinwand.width = malFeldSize;
        leinwand.height = malFeldSize;
        leinwand.style.position = "absolute";
        leinwand.style.top = "0px";
        leinwand.style.left = "0px";
        var ctx = leinwand.getContext('2d');
        ctx.fillStyle = backgroundcolor;
        ctx.fillRect(0, 0, malFeldSize, malFeldSize);
        //Erstellen und edetiern des BackUp Canvas
        var leinwandBackUp = document.createElement("canvas");
        leinwandBackUp.setAttribute("id", "leinwandBackUp");
        leinwandBackUp.style.position = "absolute";
        leinwandBackUp.style.top = leinwand.style.top;
        leinwandBackUp.style.left = leinwand.style.left;
        leinwandBackUp.width = malFeldSize;
        leinwandBackUp.height = malFeldSize;
        //Hier werden die Listern zum malen auf das Canvas leinwand elemtn gelegt
        leinwand.addEventListener("mouseover", repaint, false);
        leinwand.addEventListener("touchmove", repaint, false);
        //setter und getter methoden
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
            localStorage.setItem("hinterGrundFarbe", farbe);
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
            var tempBreite = obj.stiftBreite;
            var tempFarbe = obj.stiftFarbe;

            ctx.strokeStyle = tempFarbe;
            ctx.lineWidth = tempBreite;
            ctx.lineCap = ctx.lineJoin = "round";
            ctx.shadowColor = obj.stiftFarbe;
            ctx.shadowBlur = 0;
            if (obj.stiftTyp === 1)
            {
                ctx.shadowBlur = 0;
            }
            else {
                ctx.shadowBlur = 10;
            }
            ctx.beginPath();
            //Paket Empfangen und Variablen füllen  


            //Hier beginnt der eigentliche mal Prozess

            ctx.moveTo(obj.startPosX, obj.startPoxY);
            ctx.lineTo(obj.mouseX, obj.mouseY);
            ctx.closePath();
            ctx.stroke();

            //ebenfalls 0 gesetzt

            ctx.shadowBlur = 0;

        };
    }
    //Nun die Rückgänig Funktion
    function ruckgangig() {
        //erstmal wird die Fläche gelöscht
        leinwand.getLeinwand().getContext('2d').clearRect(0, 0, localStorage.getItem("breite"), localStorage.getItem("breite"));
        var leinwandNew = leinwand.getLeinwand();
        var tempCtx = leinwandNew.getContext('2d');
        var leinwandBackUp = leinwand.getLeinwandBackUp();
        leinwandNew.width = leinwandBackUp.width;
        leinwandNew.height = leinwandBackUp.height;
        //Bild machen von BackUp
        var img = new Image();
        img.src = leinwandBackUp.toDataURL();
        //hier wird das Bild von der BackUp Leinwand auf die Normale Leinwand gemalt
        tempCtx.drawImage(img, 0, 0);
    }
    function repaint() {
        //eine funktoin die male Aufruft mit 3 übergabe Paramtern
        var ctx = leinwand.getLeinwand().getContext('2d');
        ctx.strokeStyle = null;
        male(leinwand, stiftauswahlObject.getCurrentStift(), netzCrlt);
    }
    function altesBildNichtDirektVerwerfen() {
        var r = confirm("Wollen Sie das aktuelle Bild speichern ?");
        if (r === true) {
            //simuliert den Klick auf speichern
            document.getElementById("buttonSpeichernFunktion").click();
        }
    }
    function speichern() {
        //Damit der Speicher geleert wird und nix drin steht 
        document.getElementById("buttonSpeichernFunktion").removeAttribute("download");
        document.getElementById("buttonSpeichernFunktion").removeAttribute("href");
        var dt = leinwand.getLeinwand().toDataURL('image/png');
        var bildname = prompt("Bitte Dateinamen eingeben", "MeinBild");
        //Abfangen was passiert wenn man auf abrechen drückt
        if (bildname !== null)
        {
            document.getElementById("buttonSpeichernFunktion").setAttribute("HREF", dt);
            document.getElementById("buttonSpeichernFunktion").setAttribute("DOWNLOAD", bildname);
        }
    }
    //Dies passiert wenn das Fesnter geschlossen wird neu geladen oder die Seite verlaasssen wird
    window.addEventListener("unload", speichernLocalStorage, false);
    function speichernLocalStorage() {
        //Speichert die Canvas Bild in den local Storage
        var canvas = leinwand.getLeinwand();
        localStorage.setItem("meinLocStoreBild", canvas.toDataURL());
        //Hier wird nur nochmal die breite gespichert da die Hintergrund Farbe immer gesichert wird
        //wenn diese gestzt oder verändert wird
        localStorage.setItem("breite", leinwand.getLeinwand().width);
        //Hier werden die Stifte als JSON gespeichert
        var stifteArray = stiftauswahlObject.getGebauteStifte();
        for (var i = 0; i < stifteArray.length; i++)
        {
            var jsonStr = {"farbe": stifteArray[i].getStiftFarbe(),
                "breite": stifteArray[i].getStiftBreite(),
                "id": stifteArray[i].getStiftID(),
                "canvasBild": stifteArray[i].getStiftCanvas().toDataURL()};
            localStorage.setItem("stift" + i, JSON.stringify(jsonStr));
        }
        //Damit nachher auch die richtige anzahl an stiften geladen werden kann
        localStorage.setItem("gespeicherteStifte", stifteArray.length);
    }
    //asurichten der Leinwand bei verändern der Fenster größe
    window.addEventListener("resize", function ()
    {
        leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
        leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";
        //Damit das Fester immer in der Mitte bleibt egal was passiert
        document.getElementById("fenster").style.left = (window.innerWidth / 2 - 100) + "px";
        document.getElementById("fenster").style.top = (window.innerHeight / 2 - 100) + "px";
    });




})();