//kommentar
/*längre kommentar*/


// GEMENSAMMA

function showTab(link) {
    window.location.href = link;
}

function createButton(buttonName) {
    var btn = document.createElement();
    document.body.appendChild(btn);
}

// SLUT GEMENSAMMA FUNKTIONER

// NEW ORDER START
// SLUT NEW ORDER FUNKTIONER

// ORDER QUEUE START
// SLUT ORDER QUEUE FUNKTIONER

// ORDER HISTORY START

//document.getElementById("oHJuicesInOrder").onclick = function() {pressedOHJuicesInOrder()};


function pressedOHJuicesInOrder(){
    // typeTextToDiv('1 x L Applejuice', 'oHJuicesInOrder');
   document.getElementById("oHIngridients").classList.toggle("hide");
   document.getElementById("oHJuicesInOrder").classList.toggle("pressedJucesInTheOrder"); 
}


function typeTextToDiv(text, div_id) {
    var aVariable = document.getElementById(div_id);
    aVariable.innerHTML+=text;
}

function putDivIntoDiv(){

}

function pressedButton(){
    document.getElementById("oHIngridients").classList.toggle("hide");
}

/* TEST FÖR JQUERY; TOGGLE -Ingrid
$(document).ready(function(){
    $("button").click(function(){
        $(getElementById("oHTimeInfo")).hide();
    });
});*/
    


// SLUT ORDER HISTORY

// INVENTORY START
//SLUT INVENTORY

//STATISTICS START
//STATISTICS SLUT




// INGRIDS TESTFUNKTIONER
// testar div

function functionTextTillDiv() {
    var variabelNamn = document.getElementById('testdiv');
    console.log(variabelNamn);
    variabelNamn.innerHTML+="Text som ploppar upp för att jag tryck på knappen. ";
}

function functionTömDiv() {
    var variabelNamn = document.getElementById('testdiv');
    variabelNamn.innerHTML=" ";
}