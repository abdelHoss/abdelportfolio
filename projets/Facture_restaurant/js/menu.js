var theHeader = '<header class="w3-display-container w3-khaki"><img class=" mySlides w3-opacity" draggable="false" src="images/slideshow/bg-salade.jpg">' +
    '<img class="mySlides w3-opacity" draggable="false" src="images/slideshow/bg-escargot.jpg">' +
    '<img class="mySlides w3-opacity" draggable="false" src="images/slideshow/bg-pasta.jpg">' +
    '<img class="mySlides w3-opacity" draggable="false" src="images/slideshow/bg-lasagne.jpg">' +
    '' +
    '<div class="restaurant-text w3-display-middle">' +
    'Bienvenue au restaurant Elysee' +
    '</div>' +
    '<img class="w3-button w3-display-left" src="images/icons/chevron-left.svg" onclick="plusDivs(-1)">' +
    '<img class="w3-button w3-display-right" src="images/icons/chevron-right.svg" onclick="plusDivs(1)"></header>';


document.writeln(theHeader);

//Fonction pour le fonctionnement de la diaporama
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = x.length
    }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}
//Fonction pour le fonctionnement de la diaporama


//tableau JSON menu 
var menu = [
    {
        "plat": "Salade",
        "categorie": "entrée",
        "prix": 5.95,
        "image": "images/entree/salade.jpg"
    },
    {
        "plat": "escargot",
        "categorie": "entrée",
        "prix": 4.95,
        "image": "images/entree/escargot.jpg"
    },
    {
        "plat": "spaghetti",
        "categorie": "repas",
        "prix": 8.95,
        "image": "images/repas/pasta.jpg"
    },
    {
        "plat": "lasagne",
        "categorie": "repas",
        "prix": 9.95,
        "image": "images/repas/lasagne.jpg"
    },
];

//tableau JSON menu 

function addOption() {
    var firstSelect = document.getElementById('select1');
    var secondSelect = document.getElementById('select2');
    var firstOpt = firstSelect.options[0] = new Option('Choisir votre entrée...');
    var secondOpt = secondSelect.options[0] = new Option('Choisir votre repas...');
    firstOpt.selected;
    firstOpt.disabled = true;
    secondOpt.selected;
    secondOpt.disabled = true;
    for (x = 0; x < (menu.length / 2); x++) {
        firstSelect.options[x + 1] = new Option(menu[x].plat);
        secondSelect.options[x + 1] = new Option(menu[x + 2].plat);
    }
}
var firstConfirm = false;
var secondConfirm = false;
var entreChoisi = "";
var prixEntre = 0;
var repasChoisi = "";
var prixRepas = 0;

function firstSelChange(x) {
    var firstContainer = document.getElementById('first-container');
    for (i = 0; i < menu.length / 2; i++) {
        if (x == menu[i].plat) {
            firstContainer.innerHTML = "<ul class='container-ul'><li><b>Plat pris: </b>" + menu[i].plat + "</li><li><b>prix: </b>" + menu[i].prix + "</li><li><img src=" + menu[i].image + "></li></ul>";
            firstConfirm = true;
            entreChoisi = menu[i].plat;
            prixEntre = menu[i].prix;
        }
    }

    if (firstConfirm && secondConfirm) {
        var coutTotal = prixEntre + prixRepas;
        var tps = coutTotal * 0.05;
        var tvq = coutTotal * 0.09975;
        var coutFinal = coutTotal + tps + tvq;
        var newModal = '<div id="theModal" class="w3-modal-content w3-animate-top"><div class="w3-container w3-amber"><h1>La Facture</h1><span class="w3-right" onclick="hideModal()">X</span></div>' +
            '<div class="w3-container"><ul class="w3-ul"><li><b>' + entreChoisi + ' : ' + prixEntre + '$ </b></li>' +
            '<li><b>' + repasChoisi + ' : ' + prixRepas + ' </b></li>' +
            '<li><b>Cout Total ' + ' : ' + coutTotal.toFixed(2) + '$ </b></li>' +
            '<li><b>TPS : ' + tps.toFixed(2) + '$ </b></li>' +
            '<li><b>TVQ : ' + tvq.toFixed(2) + '$ </b></li>' +
            '<li><b>Cout Final : ' + coutFinal.toFixed(2) + '$ </b><li></div>' +
            '</li><footer class="w3-container w3-amber"></footer></div>';
        document.getElementById('modal-div').innerHTML = newModal;
    }

}

function hideModal() {
    document.getElementById('theModal').style.display = "none";
}


function secondSelChange(x) {
    var secondContainer = document.getElementById('second-container');
    for (i = 0; i < menu.length / 2; i++) {
        if (x == menu[i + 2].plat) {
            secondContainer.innerHTML = "<ul class='container-ul'><li><b>Plat pris: </b>" + menu[i + 2].plat + "</li><li><b> prix: </b>" + menu[i + 2].prix + "</li><li><img src=" + menu[i + 2].image + "></li></ul>";
            secondConfirm = true;
            repasChoisi = menu[i + 2].plat;
            prixRepas = menu[i + 2].prix;
        }
    }

    if (firstConfirm && secondConfirm) {
        var coutTotal = prixEntre + prixRepas;
        var tps = coutTotal * 0.05;
        var tvq = coutTotal * 0.09975;
        var coutFinal = coutTotal + tps + tvq;
        var newModal = '<div id="theModal" class="w3-modal-content w3-animate-top"><div class="w3-container w3-amber"><h1>La Facture</h1><span class="w3-right" onclick="hideModal()">X</span></div>' +
            '<div class="w3-container"><ul class="w3-ul"><li><b>' + entreChoisi + ' : ' + prixEntre + '$ </b></li>' +
            '<li><b>' + repasChoisi + ' : ' + prixRepas + '$ </b></li>' +
            '<li><b>Cout Total ' + ' : ' + coutTotal.toFixed(2) + '$ </b></li>' +
            '<li><b>TPS : ' + tps.toFixed(2) + '$ </b></li>' +
            '<li><b>TVQ : ' + tvq.toFixed(2) + '$ </b></li>' +
            '<li><b>Cout Final : ' + coutFinal.toFixed(2) + '$ </b><li></div>' +
            '</li><footer class="w3-container w3-amber "></footer></div>';
        document.getElementById('modal-div').innerHTML = newModal;
    }
}
