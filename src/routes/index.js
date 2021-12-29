const express = require("express");
const router = express.Router();

var admin = require("firebase-admin");
var serviceAccount = require("../../firebase-adminsdk-credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://panic-button-system-default-rtdb.firebaseio.com",
});
const db = admin.database();

const strings = require("../strings/strings.json");
// const data = require('../strings/data.json');
// strings.es.pages.index.title;
const es_string = strings.es;
const en_string = strings.en;

function renderizar(webpath, name_file, idioma, user='null', localization='null'){
  const pages = idioma.pages;
  var cadena = {lang: idioma, user: user, localization: localization};
  return router.get(webpath, (req, res) => {
    res.render(name_file, cadena );
  });
}

/*****************************************************/
/*                     PÁGINAS                       */
/*****************************************************/
function rutas(lang_string) {
  const pages = lang_string.pages;

  renderizar(pages.index.path, 'index', lang_string);
  renderizar(pages.offline.path, 'offline', lang_string);
  renderizar(pages.signIn.path, 'signIn', lang_string);
  renderizar(pages.signUp.path, 'signUp', lang_string);
  renderizar(pages.status.path, 'status', lang_string);
  renderizar(pages.data.path, 'data', lang_string);
  renderizar(pages.grupo.path, 'grupo', lang_string);
  renderizar(pages.info.path, 'info', lang_string);
  renderizar(pages.maps.path, 'maps', lang_string);
  renderizar(pages.developing.path, 'developing', lang_string);
  // renderizar('/panic', 'panic', lang_string);
  
  router.get("/panic", (req, res) => {
    res.render("panic", {lang: lang_string, user: 'null', localization: 'null'} );
    console.log("Solicitada página de alerta de pánico...");
  });

}

//---------------------------------------------------||
rutas(es_string); // PÁGINAS ESPAÑOL                 ||
//---------------------------------------------------||
rutas(en_string); // ENGLISH PAGES                   ||
//---------------------------------------------------||

/*****************************************************/
/*                   RUTAS POST                      */
/*****************************************************/
router.post("/signin", (req, res) => {
  console.log("Están enviando datos para iniciar sesión.");
  console.log(req.body);
  res.redirect("/info");
  // res.json(req.body);
});

router.post("/signup", (req, res) => {
  console.log("Están enviando datos para registrarse.");
  console.log(req.body);
  res.redirect("/info");
  // res.json(req.body);
});

router.post("/panic", (req, res) => {
  console.log("¡Se ha producido un evento!");
  // console.log(req.body);

  // Obtiene los datos del JSON en variables
  const { name, latitude, longitude, type } = req.body;
  //Comprueba si están los datos suficientes para almacenarlos
  if (name && latitude && longitude && type) {
    // Genera fecha y hora del evento
    var fecha = new Date();
    function zone(fecha) {
      zone = fecha.toTimeString();
      return zone.substring(19, zone.length - 1);
    }
    // Crea un JSON con los datos recogidos
    const newevent = {
      date: fecha.toLocaleDateString(),
      time: fecha.toLocaleTimeString(),
      GMT: fecha.toTimeString().substring(9, 17),
      zone: zone(fecha),
      latitude: latitude,
      longitude: longitude,
      type: type,
    };  
    console.log(newevent);
    // Obtener usuario y dispositivo

    /*const user = name;
    const id_dispo = "1";
    //Definimos el lugar al que agregará los datos del evento y añadimos el JSON
    const dir_db_name =
      "usuarios/" + user + "/dispositivos/" + id_dispo + "/events";
    db.ref(dir_db_name).push(newevent);
    //res.redirect('/data');

    const ref = db.ref("usuarios");
    // Attach an asynchronous callback to read the data at our posts reference
    ref.on( "value", (snapshot) => {
        console.log(snapshot.val());

      }, (errorObject) => { console.log("La lectura de datos ha fallado: " + errorObject.name); }
    );*/

    // Devuelve respuesta de confirmación
    // res.json(newevent);
    // res.redirect('/panic');
    res.render("panic", {lang: es_string, user: 'null', localization: newevent} );
  } else {
    res
      .status(500)
      .json({
        error: "Hubo un error con los datos recibidos en la base de datos.",
      });
  }
});


module.exports = router;
