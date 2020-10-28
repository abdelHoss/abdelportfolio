    var alertPatient = "Vous avez affiché la liste des patients";
    var alertEtab = "Vous avez affiché la liste des Établissements";
    var alertHosp = "Vous avez affiché la liste des hospitalisations";

    function lister(nomTag, domXml, message) {
        $("#carousel").hide();
        $("#tableau").html("");
        $("#closeButton").show();
        var elem = domXml.getElementsByTagName(nomTag);
        var nbrElem = elem.length;
        var nbrNode = elem[0].children;
        var nodeValue = [];
        var contenu = "<table id='theTable' border='1' class='uk-table'><tr class='teal'>";
        for (var x = 0; x < nbrNode.length; x++) {
            nodeValue[x] = nbrNode[x].tagName;
            contenu += "<th>" + nodeValue[x] + "</th>";
        }
        contenu += "</tr>";
        for (var x = 0; x < nbrElem; x++) {
            var tagVal = elem[x].children;
            if (x % 2 !== 0) {
                contenu += "<tr class='light'>";
            } else {
                contenu += "<tr>";
            }
            contenu += "<td>" + tagVal[0].innerHTML + "</td><td>" + tagVal[1].innerHTML + "</td><td>" + tagVal[2].innerHTML + "</td><td>" + tagVal[3].innerHTML + "</td><td>" + tagVal[4].innerHTML + "</td>";
        }
        $("#tableau").html(contenu);
        $("#alert").show();
        $("#message").html(message);
    }


    function closeAlert() {
        $("#alert").hide();
    }

    function closeTab() {
        $("#tableau").html("");
        $("#carousel").show();
        $("#closeButton").hide();
        $("#alert").hide();
    }

    function showSel(num) {
        $("#closeButton").show();
        $("#carousel").hide();
        var tableau = document.getElementById("tableau");
        var noDossier = patient.getElementsByTagName("dossier");
        var codeEtab = etab.getElementsByTagName("num_etab");
        var spec = hosp.getElementsByTagName("specialite");
        tableau.innerHTML = "";

        for (var i = 0; i < num; i++) {
            var select = document.createElement("select");
            tableau.appendChild(select);
            select.classList.add("uk-select", "selects");
            switch (i) {
                case 0:
                    select.setAttribute("id", "firstSel");
                    break;
                default:
                    select.setAttribute("id", "secondSel");

            }
        }


        switch (num) {
            case 1:
                var firstSel = document.getElementById("firstSel");
                firstSel.onchange = function () {
                    patientParHosp(1);
                }
                var theOpt = document.createElement("option");
                var val = document.createTextNode("Veuillez choisir votre numéro de patient");
                theOpt.appendChild(val);
                theOpt.disabled = true;
                theOpt.selected = true;
                select.appendChild(theOpt);
                for (var x = 0; x < noDossier.length; x++) {
                    theOpt = document.createElement("option");
                    val = document.createTextNode(x + 1);
                    theOpt.appendChild(val);
                    select.appendChild(theOpt);
                }
                break;
            default:
                var firstSel = document.getElementById("firstSel");
                var secSel = document.getElementById("secondSel");
                firstSel.onchange = function () {
                    patientParHosp(0);
                };
                secSel.onchange = function () {
                    patientParHosp(4);
                };
                theOpt = document.createElement("option");
                val = document.createTextNode("Veuillez choisir le code de l'établissement");
                var value = document.createTextNode("Veuillez choisir la spécialité");
                theOpt.appendChild(val);
                theOpt.disabled = true;
                theOpt.selected = true;
                firstSel.appendChild(theOpt);

                var opt = theOpt = document.createElement("option");
                var value = document.createTextNode("Veuillez choisir la spécialité");
                opt.appendChild(value);
                opt.disabled = true;
                opt.selected = true;
                secSel.appendChild(opt);


                for (var x = 0; x < codeEtab.length; x++) {
                    var firstOpt = document.createElement("option");
                    var val = document.createTextNode(codeEtab[x].innerHTML);
                    firstOpt.appendChild(val);
                    firstSel.append(firstOpt);

                }
                var different;
                var compteur = 1;
                var specTab = [];
                for (x = 0; x < spec.length; x++) {

                    var selectLen = secSel.options.length;
                    for (y = 0; y < selectLen; y++) {

                        if (spec[x].innerHTML !== secSel.options[y].value) {
                            different = true;
                        } else {
                            different = false;
                            y = selectLen;
                        }
                    }
                    //alert(different);
                    if (different) {
                        firstOpt = document.createElement("option");
                        val = document.createTextNode(spec[x].innerHTML);
                        firstOpt.appendChild(val);
                        secSel.append(firstOpt);
                    }
                }
        }

    }

    function patientParHosp(nombre) {
        $("#closeButton").show();
        var firstSel = document.getElementById('firstSel');
        var secSel = document.getElementById('secondSel');
        //var secondSel = document.getElementById('secSel');
        var elem = hosp.getElementsByTagName('hospitalisation');
        var contenu = "<table id='theTable' border='1' class='uk-table'><tr class='teal'>";
        switch (nombre) {
            case 4:
                var elemChoisi = secSel.value;
                contenu += "<th>spécialité</th><th>code établissement</th><th>no dossier</th><th>date admission</th><th>date sortie</th></tr>";
                break;
            case 0:
                var elemChoisi = firstSel.value;
                contenu += "<th>code établissement</th><th>no dossier</th><th>date admission</th><th>date sortie</th><th>spécialité</th></tr>";
                break;
            default:
                contenu += "<th>no dossier</th><th>code établissement</th><th>date admission</th><th>date sortie</th><th>spécialité</th></tr>";
                var elemChoisi = firstSel.value;
        }
        var compteur = 0;


        for (var x = 0; x < elem.length; x++) {
            var tagVal = elem[x].children;
            // alert(elem[x].children);
            if (tagVal[nombre].innerHTML == elemChoisi) {
                compteur++;
                if (compteur % 2 == 0) {
                    contenu += "<tr class='light'>";
                } else {
                    contenu += "<tr>";
                }
                switch (nombre) {
                    case 1:
                        contenu += "<td>" + tagVal[1].innerHTML + "</td><td>" + tagVal[0].innerHTML + "</td><td>" + tagVal[2].innerHTML + "</td><td>" + tagVal[3].innerHTML + "</td><td>" + tagVal[4].innerHTML + "</td><tr>";
                        break;
                    case 0:
                        contenu += "<td>" + tagVal[0].innerHTML + "</td><td>" + tagVal[1].innerHTML + "</td><td>" + tagVal[2].innerHTML + "</td><td>" + tagVal[3].innerHTML + "</td><td>" + tagVal[4].innerHTML + "</td><tr>";
                        break;
                    default:
                        contenu += "<td>" + tagVal[4].innerHTML + "</td><td>" + tagVal[0].innerHTML + "</td><td>" + tagVal[1].innerHTML + "</td><td>" + tagVal[2].innerHTML + "</td><td>" + tagVal[3].innerHTML + "</td><tr>";
                }
            }
        }
        contenu += "</table>"
        $("#tableau").html(contenu);
        var message = "";
        if (compteur > 0) {
            switch (nombre) {
                case 1:
                    message = "Vous avez affichez les hospitalisations du patient de dossier numéro " + elemChoisi;
                    break;
                case 0:
                    message = "Vous avez affichez les hospitalisations du code d'établissement " + elemChoisi;
                    break;
                default:
                    message = "Vous avez affichez les hospitalisations de la spécialité " + elemChoisi;
            }
        } else {

            message = "Aucun résultat ne s'affiche pour votre recherche";
        }


        $("#alert").show();
        $("#message").html(message);

    }
