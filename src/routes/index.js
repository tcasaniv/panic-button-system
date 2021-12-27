
const express = require('express');
const router = express.Router();
const strings = require('../strings/strings.json');
const data = require('../strings/data.json');
// strings.es.pages.index.title;
const es_string = strings.es;
const en_string = strings.en;


/*****************************************************/
/*                     PÁGINAS                       */
/*****************************************************/
function rutas(lang_string){
  const pages = lang_string.pages;
  router.get(pages.index.path, (req, res) => {
    res.render('index', lang_string);
  });
  
  router.get(pages.offline.path, (req, res) => {
    res.render('offline', lang_string);
  });
  
  router.get(pages.signIn.path, (req, res) => {
    res.render('signIn', lang_string);
  });
  
  router.get(pages.signUp.path, (req, res) => {
    res.render('signUp', lang_string);
  });
  
  router.get(pages.status.path, (req, res) => {
    res.render('status', lang_string);
  });
  
  router.get(pages.data.path, (req, res) => {
    res.render('data', lang_string);
  });
  
  router.get(pages.grupo.path, (req, res) => {
    res.render('grupo', lang_string);
  });
  
  router.get(pages.info.path, (req, res) => {
    res.render('info', lang_string);
  });
  
  router.get(pages.maps.path, (req, res) => {
    res.render('maps', lang_string);
  });
  
  router.get(pages.developing.path, (req, res) => {
    res.render('developing', lang_string);
  });
}

/*****************************************************/
/*                PÁGINAS ESPAÑOL                    */
                rutas  (es_string);
/*****************************************************/

/*****************************************************/
/*                ENGLISH PAGES                      */
                rutas  (en_string);
/*****************************************************/


/*****************************************************/
/*                  OTRAS RUTAS                      */
/*****************************************************/
router.post('/signin', (req, res) => {
  console.log('Están enviando datos para iniciar sesión.');
  console.log(req.body);
  res.redirect('/info');
  // res.json(req.body);
});

router.post('/signup', (req, res) => {
  console.log('Están enviando datos para registrarse.');
  console.log(req.body);
  res.redirect('/info');
  // res.json(req.body);
});

router.post('/panic', (req, res) => {
  console.log('¡Se ha producido un evento!');
  console.log(req.body);
  
  // Obtiene los datos del JSON en variables
  const { name, latitude, longitude, type } = req.body;
  //Comprueba si están los datos suficientes para almacenarlos
  if (name && latitude && longitude && type) {
    // Crea un bucle que compara "name" con los de la base de datos
    for (i=0; data[i].name!=name;i++){
      console.log("Encontrado ");
      console.log(name);
      console.log(" en posición: ");
      console.log(i);
    } var dispositivo=data[i];
    // Después de encontrarlo en base de datos, añade fecha y hora
    var fecha = new Date();
    function zone(fecha) { zone = fecha.toTimeString(); return zone.substring(19, zone.length - 1); }
    var date = fecha.toLocaleDateString();
    var time = fecha.toLocaleTimeString();
    var GMT = fecha.toTimeString().substring(9,17);
    var zona = zone(fecha);
    // Crea un JSON con los datos recogidos
    var newevent = {
      "date": date, "time": time, "GMT": GMT, "zone": zona,
      "latitude": latitude, "longitude": longitude,
      "type": type
    };
    // Añade el JSON a "events" dentro de la sección del dispositivo
    var disp_event = dispositivo.events;
    // disp_event = 
    /* var fs = require('fs');
    fs.writeFile( "./src/strings/data.json", newData, 
      function(err, result){ if(err) console.log('error', err); }
    );*/
    // Devuelve respuesta de confirmación
    res.json(newevent);
    // res.redirect('/info');
    // res.json(movies);
  } else {
    res.status(500).json({error: 'Hubo un error con los datos recibidos en la base de datos.'});
  }

  // res.json(req.body);
  // console.log('¡Se ha producido un evento!');
  // console.log('  > Con name: ',req.body.name);
  // console.log('  > Desde el dispositivo: ',req.body.dispositivo);
});

router.get('/panic', (req, res) => {
  res.render('panic', es_string);
  console.log('Solicitada página de alerta de pánico...');
});

module.exports = router;