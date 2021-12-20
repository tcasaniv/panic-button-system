//=========================    LOADER    ==========================

window.addEventListener("load", () => {
    document.querySelector(".loader").classList.add("fondu-out");
    setTimeout(() => {
        document.querySelector(".loader").remove();
    }, 400);
});
//===============================    MENU LIST    =========================================

function list(number) {
    if (document.querySelector(`.listmenu:nth-child(${number}) ul`).style.display === "none") {
        document.querySelector(`.listmenu:nth-child(${number}) ul`).style.display = "list-item"
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).className = "fas fa-angle-down"
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).style.paddingLeft = '5.25px'
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).style.paddingRight = '5.25px'

    } else {
        document.querySelector(`.listmenu:nth-child(${number}) ul`).style.display = "none"
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).className = "fas fa-angle-right"
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).style.paddingLeft = '6.5px'
        document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).style.paddingRight = '6.5px'
    }
}

function noDisplay(classname) {
    if (document.querySelector(`.${classname}`).style.display === "none") {
        document.querySelector(`.${classname}`).style.display = "block";
    } else {
        document.querySelector(`.${classname}`).style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        if (modal.style.display === "none") {
            modal.style.display = "block";
        } else {
            modal.style.display = "none";
        }
    }
}

function collapnav() {

    if(document.querySelector(`nav.menulist`).hasAttribute("collapsed-nav") === false) {
        function forSelector(elemento) { for(var i = 0; i < elemento.length; i++) { elemento[i].setAttribute("collapsed-nav",""); } }
        forSelector(document.querySelectorAll(`nav.menulist`));
        forSelector(document.querySelectorAll(`.menulink`));
        forSelector(document.querySelectorAll(`.listmenu`));
        forSelector(document.querySelectorAll(`.categorylist`));
        // document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).className = "fas fa-angle-down"

    } else {
        function forSelector(elemento) { for(var i = 0; i < elemento.length; i++) { elemento[i].removeAttribute("collapsed-nav",""); } }
        forSelector(document.querySelectorAll(`nav.menulist`));
        forSelector(document.querySelectorAll(`.menulink`));
        forSelector(document.querySelectorAll(`.listmenu`));
        forSelector(document.querySelectorAll(`.categorylist`));
        // document.querySelector(`.listmenu:nth-child(${number}) button .arrow i`).className = "fas fa-angle-right"
    }
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

