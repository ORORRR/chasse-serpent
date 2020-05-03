// Grille : 

var grille = new Array(17);
var context = null;
var rectangle = { x: 0, y: 0, hauteur: 0, largeur: 0, couleur: "" };

init();
var game = null;

// DEMO :
var c = document.getElementById("myCanva");
var ctx = c.getContext("2d");

// initialisation (appelée au chargement du corps du document <body onload="init">)
function init() {

    // Canva : 
    var c = document.getElementById("myCanva");
    context = c.getContext("2d");

    // Fond 
    var img = new Image();
    img.src = "img/fond.png";
    img.onload = function () {
        context.drawImage(img, 0, 0);
    }
    
    context.width = document.getElementById("myCanva").width;
    context.height = document.getElementById("myCanva").height;

    // Initialisation grille 
    initialisationGrille(grille);
}


function initialisationGrille(grille){
	var k;
	for(k=0 ; k < grille.length ; k++){
		grille[k]=new Array(25);
	}
	for (var i = 0; i < grille.length;i=i+1){
		for (var j = 0 ; j< grille[i].length ; j=j+1){
			if ((i == 2 || i == 13) || (j == 20)){ // entourage de zone de jeu entouré par des deux 
				grille[i][j]=2;
			}else{
				grille[i][j]= 0;
			}
		}
    }
    creaGrille();
}

function creaGrille() { //affichage grille
    var i;
    var j;
    rectangle.hauteur = rectangle.largeur = 64;
    rectangle.couleur = "black";
    context.strokeStyle= rectangle.couleur;

    for (i = 0 ; i <= context.width ; i=i+64){
        for (j = 0 ; j <= context.height ; j=j+64 ){
            context.strokeRect(i,j, rectangle.largeur, rectangle.hauteur);
        }   
    }
}

let cursor = 0;
const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
document.addEventListener('keydown', (e) => {
  cursor = (e.keyCode == KONAMI_CODE[cursor]) ? cursor + 1 : 0;
  if (cursor == KONAMI_CODE.length){
    document.getElementById("pinata").style.display="block";
    setTimeout(function(){ hidePinata(); }, 2000);
  }
});

function hidePinata(){
    document.getElementById("pinata").style.display="none";
}

// Désactive le scroll avec les touches directionnelles 
function disableScroll(e){
	
	if (e.keyCode) {
		/^(32|33|34|35|36|38|40)$/.test(e.keyCode) && e.preventDefault();
	}else {
		e.preventDefault();
    }
} 

addEventListener("keydown", disableScroll, false);
addEventListener("keyup", disableScroll, false);
addEventListener("keyleft", disableScroll, false);
addEventListener("keyright", disableScroll, false);