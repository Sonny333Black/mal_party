function netzcontroller(user, leinwand) {
    //Verarbeiten der Paramter udn f�llen privater Varibalen
    var kennung = "harryPotterHund";
    var teilnehmer = 1;
    var maxTeilnehmer = 4;
    var currentGroup = "";
    var admin;
    var maler = 1;
    var userNamesInGroup = new Array();
    var that = this;
    //wird Aktuell nicht gebraucht
    userNamesInGroup[0] = user;
    //als erstes wird die anzeige gef�llt so das dei Buttons sichbar sind
    gruppenDivFuellen();

    try {
        //verbindung mit dem Broadcast wird hergestellt
        //hier richtigen Server eintragen
        //Beispiel der FH-Flensburg:


        //var ws = new WebSocket("ws://borsti1.inf.fh-flensburg.de:8080");
        ws.onopen = function () {


        };
        ws.onmessage = function (e) {
            var str = e.data;
//server Nachricht abfangen
            if (str.substr(0, 3) !== "+++")
            {
                var decodeStr = decode(str);
                //auf kennung pr�fen
                if (decodeStr.substring(0, kennung.length) === kennung) {

                    var obj = JSON.parse(decodeStr.substring(kennung.length));

                    switch (obj.typ)
                    {
                        //Dann kommen die Ganzen Abfragen 
                        //die alle auf den Typ der gesende wurde reagiernen
                        case "gruppeErstellen":
                            //f�r Clients die noch ohne Gruppe malen aber angemledt sind
                            if (currentGroup === "") {

                                var gruppenButton = document.createElement("BUTTON");
                                var imageGroup = document.createElement("img");
                                imageGroup.setAttribute("src", "img/group.png");
                                gruppenButton.appendChild(imageGroup);
                                gruppenButton.appendChild(document.createTextNode(obj.gruppenName));
                                gruppenButton.id = obj.gruppenName;
                                document.getElementById("gruppenDiv").appendChild(gruppenButton);
                                gruppenButton.addEventListener("click", function () {
                                    gruppeBeitreten(obj.gruppenName, obj.admin);
                                }, false);
                            }
                            break;
                        case "anfrageGruppe":
                            if (obj.admin === user)
                            {
                                //sachen die der admin bekommt und sendet an seine Clients die anfragen
                                if (teilnehmer < maxTeilnehmer)
                                {
                                    teilnehmer++;
                                    //***************************aktuelle Leinwandgr��e mit senden
                                    that.sende({"typ": "beigetreten", "username": obj.userName, "gruppenName": obj.gruppenName, "leinwandGrose": localStorage.getItem("breite"), "hintergrundFarbe": localStorage.getItem("hinterGrundFarbe")});
                                }
                                else
                                {
                                    that.sende({"typ": "gruppeVoll", "username": obj.userName, "gruppenName": obj.gruppenName});
                                }
                            }
                            break;
                        case "gruppeVoll" :
                            if (obj.userName === user)
                            {
                                alert(obj.gruppenName + " Voll");
                            }
                            break;
                        case "beigetreten" :
                            if (obj.username === user)
                            {
                                currentGroup = obj.gruppenName;

                                document.getElementById("sketch").setAttribute("style", "width:" + obj.leinwandGrose + "px; height:" + obj.leinwandGrose + "px;");
                                //gr�se der Leinwand wird Ver�andert
                                leinwand.getLeinwand().width = obj.leinwandGrose;
                                leinwand.getLeinwand().height = obj.leinwandGrose;
                                leinwand.setGrose(obj.leinwandGrose);
                                //Farbe der Leinwand wird ge�ndert
                                leinwand.setLeinwandHintergrundMalen(obj.hintergrundFarbe);
                                //asurichten
                                leinwand.getLeinwand().style.left = leinwand.getLeinwandBackUp().style.left = document.getElementById("sketch").offsetLeft + "px";
                                leinwand.getLeinwand().style.top = leinwand.getLeinwandBackUp().style.top = document.getElementById("sketch").offsetTop + "px";

                                gruppenDivLeeren();

                                inGruppeLayoutErzeugen(currentGroup, true);
                            }
                            break;
                        case "malen" :
                            if (obj.gruppenName === currentGroup)
                            {
                                leinwand.onpaint(obj);
                            }
                            break;
                        case "gruppeVerlassen" :
                            if (obj.admin === user)
                            {
                                teilnehmer--;
                            }
                            break;
                        case "gruppeAufloesen" :
                            if (obj.gruppenName === currentGroup)
                            {

                                currentGroup = "";
                                gruppenDivLeeren();
                                gruppenDivFuellen();

                            }
                            break;
                        case "gruppeOffen" :
                            if (admin !== "")
                            {
                                that.sende({"typ": "habeGruppe", "gruppenName": currentGroup, "admin": admin});
                            }
                            break;

                        case "habeGruppe":
                            if (!document.getElementById(obj.gruppenName)) {
                                if (obj.gruppenName !== "") {
                                    // hier werden die Gruppen Button erstellt
                                    var gruppenButton = document.createElement("BUTTON");
                                    var imageGroup = document.createElement("img");
                                    imageGroup.setAttribute("alt", "");
                                    imageGroup.setAttribute("src", "img/group.png");
                                    gruppenButton.appendChild(imageGroup);
                                    gruppenButton.appendChild(document.createTextNode(obj.gruppenName));
                                    gruppenButton.id = obj.gruppenName;
                                    document.getElementById("gruppenDiv").appendChild(gruppenButton);
                                    gruppenButton.addEventListener("click", function () {
                                        gruppeBeitreten(obj.gruppenName, obj.admin);
                                    }, false);
                                    break;
                                }
                            }
                            break;
                    }
                }
            }
        };
        ws.onclose = function () {

        };
    } catch (e) {
        console.log("Fehler im netzconroller");
    }
    //getter
    this.getCurrentGroup = function () {
        return currentGroup;
    };
    //das ist meine Sende Funktion
    this.sende = function (obj) {
        var jasonStr = JSON.stringify(obj);
        ws.send(encode(kennung) + encode(jasonStr));
    };
    //Verschl�sselung f�r das Netzwerk
    function encode(str) {
        var str = str;
        var encodeStr = "";

        for (var i = 0; i < str.length; i++)
        {
            encodeStr = encodeStr + String.fromCharCode((str.charCodeAt(i) + 23 + kennung.length));
        }

        return encodeStr;

    }
    function decode(str) {
        var str = str;
        var decodeStr = "";
        for (var i = 0; i < str.length; i++)
        {
            decodeStr = decodeStr + String.fromCharCode((str.charCodeAt(i) - 23 - kennung.length));
        }

        return decodeStr;
    }
    //Wenn ein User eine Gruppe beitretten will
    function gruppeBeitreten(gruppenName, admin) {

        that.sende({"typ": "anfrageGruppe", "gruppenName": gruppenName, "admin": admin, "userName": user});
    }
    //Hier wird das Layout erzeugt wenn man einer Gruppe beigetretten ist
    function inGruppeLayoutErzeugen(gruppenName, boolean) {
        var gruppenNameDiv = document.createElement("DIV");
        var imageGroup = document.createElement("img");
        imageGroup.setAttribute("src", "img/group.png");
        gruppenNameDiv.appendChild(imageGroup);
        gruppenNameDiv.appendChild(document.createTextNode(gruppenName));
        document.getElementById("gruppenDiv").appendChild(gruppenNameDiv);
        var onlineAlsDiv = document.createElement("DIV");
        var userBild = document.createElement("img");
        userBild.setAttribute("src", "img/user.png");
        userBild.setAttribute("alt", "");
        onlineAlsDiv.appendChild(userBild);
        onlineAlsDiv.appendChild(document.createTextNode(user));
        document.getElementById("gruppenDiv").appendChild(userBild);
        document.getElementById("gruppenDiv").appendChild(onlineAlsDiv);
        //Einstellungen f�r den User
        if (boolean) {
            var verlassenButten = document.createElement("BUTTON");
            verlassenButten.addEventListener("click", function () {
                currentGroup = "";
                that.sende({"typ": "gruppeVerlassen", "gruppenName": gruppenName, "admin": user});
                gruppenDivLeeren();
                gruppenDivFuellen();
                document.getElementById("buttonEinstellungen").style.display = 'block';
            }, false);
            verlassenButten.setAttribute("id", "verlassenButten");
            var imageVerlassenButton = document.createElement("img");
            imageVerlassenButton.setAttribute("src", "img/door.png");
            imageVerlassenButton.setAttribute("alt", "");
            verlassenButten.appendChild(imageVerlassenButton);
//Hier die Buttons f�r passive und aktive Clints zum hin und her Schalten
            var passivClientDeaktiv = document.createElement("BUTTON");
            var imagePCD = document.createElement("img");
            imagePCD.setAttribute("src", "img/passiv.png");
            imagePCD.setAttribute("alt", "");
            passivClientDeaktiv.appendChild(imagePCD);
            passivClientDeaktiv.addEventListener("click", function () {
                
                localStorage.setItem("maler", 1);
                document.getElementById("buttonEinstellungen").style.display = 'block';
                document.getElementById("passivClientAktiv").style.display = 'block';
                document.getElementById("passivClientDeaktiv").style.display = 'none';

            }, false);
            passivClientDeaktiv.setAttribute("id", "passivClientDeaktiv");
            // passivClientDeaktiv.appendChild(document.createTextNode("passivClient Dekativieren"));
            passivClientDeaktiv.style.display = 'none';
            var passivClientAktiv = document.createElement("BUTTON");
            var imagePCA = document.createElement("img");
            imagePCA.setAttribute("src", "img/aktiv.png");
            imagePCA.setAttribute("alt", "");
            passivClientAktiv.appendChild(imagePCA);
            passivClientAktiv.addEventListener("click", function () {

              
                document.getElementById("buttonEinstellungen").style.display = 'none';
                document.getElementById("passivClientAktiv").style.display = 'none';
                document.getElementById("passivClientDeaktiv").style.display = 'block';
                localStorage.setItem("maler", 0);

            }, false);
            passivClientAktiv.setAttribute("id", "passivClientAktiv");
            //passivClientAktiv.appendChild(document.createTextNode("passivClient Aktivieren"));
            document.getElementById("gruppenDiv").appendChild(verlassenButten);
            document.getElementById("gruppenDiv").appendChild(passivClientAktiv);
            document.getElementById("gruppenDiv").appendChild(passivClientDeaktiv);

        }
        //Einstellunge f�r den admin
        else {
            var auflosenGruppeButten = document.createElement("BUTTON");
            var bombeBild = document.createElement("img");
            bombeBild.setAttribute("src", "img/groupRemove.png");
            bombeBild.setAttribute("alt", "");
            auflosenGruppeButten.appendChild(bombeBild);
            auflosenGruppeButten.addEventListener("click", function () {
                currentGroup = "";
                admin = "";
                that.sende({"typ": "gruppeAufloesen", "gruppenName": gruppenName});
                gruppenDivLeeren();
                gruppenDivFuellen();
            }, false);
            auflosenGruppeButten.setAttribute("id", "auflosenGruppeButten");
            //auflosenGruppeButten.appendChild(document.createTextNode("auflosen"));
            document.getElementById("gruppenDiv").appendChild(auflosenGruppeButten);
        }
    }
    function gruppenDivLeeren() {
        //Damit ist das linke Feld wieder gelleert
        while (document.getElementById("gruppenDiv").hasChildNodes())
        {
            document.getElementById("gruppenDiv").removeChild(document.getElementById("gruppenDiv").childNodes[0]);
        }
    }
    //Hier wird das normale Layout erstellt was am Anfang angezeigt wird
    function gruppenDivFuellen() {
        var sucheButton = document.createElement("BUTTON");
        sucheButton.addEventListener("click", function () {
            //dadurch verschwinden alle gruppen die nicht mehr aktiv sind
            gruppenDivLeeren();
            gruppenDivFuellen();
            that.sende({"typ": "gruppeOffen"});
        }, false);
        sucheButton.setAttribute("id", "sucheButton");
        sucheButton.setAttribute("style", "");
        //sucheButton.appendChild(document.createTextNode("Suche"));
        var imageSuchButton = document.createElement("img");
        imageSuchButton.setAttribute("alt", "");
        imageSuchButton.setAttribute("src", "img/groupSearch.png");
        sucheButton.appendChild(imageSuchButton);

        var gruppeErstellButton = document.createElement("BUTTON");
        gruppeErstellButton.addEventListener("click", function () {
            var gruppenName = prompt("Bitte GruppenName eingeben", "Gruppe 1");
            if (gruppenName !== "" && gruppenName !== null)
            {
                that.sende({"typ": "gruppeErstellen", "gruppenName": gruppenName, "admin": user});
                currentGroup = gruppenName;
                admin = user;
                gruppenDivLeeren();
                inGruppeLayoutErzeugen(gruppenName, false);
            }
            else {
                alert("Gruppen Name darf nicht leer sein");
            }
        }, false);
        gruppeErstellButton.setAttribute("id", "gruppeErstellButton");
        gruppeErstellButton.setAttribute("style", "");
        //gruppeErstellButton.appendChild(document.createTextNode("Neue Gruppe"));

        var imageErstellButton = document.createElement("img");
        imageErstellButton.setAttribute("src", "img/groupAdd.png");
        imageErstellButton.setAttribute("alt", "");
        gruppeErstellButton.appendChild(imageErstellButton);
        document.getElementById("gruppenDiv").appendChild(gruppeErstellButton);
        document.getElementById("gruppenDiv").appendChild(sucheButton);
    }
}
    