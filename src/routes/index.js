
const express = require('express');
const router = express.Router();
const strings = require('../strings/strings.json');
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
  // res.redirect('/info');
  res.json(req.body);
  // console.log('¡Se ha producido un evento!');
  // console.log('  > Con id: ',req.body.id);
  // console.log('  > Desde el dispositivo: ',req.body.dispositivo);
});

router.get('/panic', (req, res) => {
  res.render('panic', es_string);
  console.log('Datos enviados correctamente...');
});

module.exports = router;