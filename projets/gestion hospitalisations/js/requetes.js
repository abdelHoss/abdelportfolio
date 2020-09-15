var patient = null;
var etab = null;
var hosp = null;

function requete() {
    $.ajax({
        type: "GET",
        url: "donnees/patients.xml",
        dataType: "xml",
        success: function (reponse) {
            patient = reponse;
        },

        fail: function (err) {
            alert(err);
        }
    });

    $.ajax({
        type: "GET",
        url: "donnees/etablissement.xml",
        dataType: "xml",
        success: function (reponse) {
            etab = reponse;
        },
        fail: function (err) {
            alert(err);
        }
    });

    $.ajax({
        type: "GET",
        url: "donnees/hospitalisations.xml",
        dataType: "xml",
        success: function (reponse) {
            hosp = reponse;
        },
        fail: function (err) {
            alert(err);
        }
    });

}
