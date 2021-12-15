function login() {
    var correo = document.getElementById("email").value;
    var contra = document.getElementById("pwd1").value;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (correo == '') {
        alert("Por favor, introduzca su dirección de correo electrónico.");
    }
    else if (contra == '') {
        alert("Introduzca la contraseña");
    }
    else if (!filter.test(correo)) {
        alert("Introduzca una dirección de correo electrónico válida.");
    }
    else if (contra.length < 6 || contra.length > 6) {
        alert("La longitud mínima y máxima de la contraseña es de 6.");
    }
    else {
        alert('Gracias por iniciar sesión, estás siendo redirigido a la página principal.');
        //Redirigir a otra página o código webste o puede establecer su propia página html.
        window.location = "/";
    }
}
//Restablecer el código del campo de entrada.
function clearFunc() {
    document.getElementById("email").value = "";
    document.getElementById("pwd1").value = "";
}
