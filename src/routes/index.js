
const express = require('express');
const router = express.Router();
const strings = require('../strings/strings.json');
// strings.es.pages.index.title;
const es_string = strings.es;
const en_string = strings.en;

/*****************************************************/
/*                PÁGINAS ESPAÑOL                    */
/*****************************************************/
router.get('/', (req, res) => {
  res.render('index', es_string);
});

router.get('/offline', (req, res) => {
  res.render('offline', es_string);
});

router.get('/offline.html', (req, res) => {
  res.render('offline', es_string);
});

/*****************************************************/
/*                PÁGINAS ESPAÑOL                    */
/*****************************************************/

router.get('/login', (req, res) => {
  res.render('login', es_string);
});

router.get('/status', (req, res) => {
  res.render('status', es_string);
});

router.get('/data', (req, res) => {
  res.render('data', es_string);
});

router.get('/grupo', (req, res) => {
  res.render('grupo', es_string);
});

router.get('/info', (req, res) => {
  res.render('info', es_string);
});

router.get('/maps', (req, res) => {
  res.render('maps', es_string);
});

router.get('/developing', (req, res) => {
  res.render('developing', es_string);
});

/*****************************************************/
/*                ENGLISH PAGES                      */
/*****************************************************/
router.get('/en/', (req, res) => {
  res.render('index', en_string);
});

router.get('/en/offline', (req, res) => {
  res.render('offline', en_string);
});

router.get('/en/offline.html', (req, res) => {
  res.render('offline', en_string);
});

/*****************************************************/
/*                ENGLISH PAGES                      */
/*****************************************************/

router.get('/en/login', (req, res) => {
  res.render('login', en_string);
});

router.get('/en/status', (req, res) => {
  res.render('status',en_string);
});

router.get('/en/datos', (req, res) => {
  res.render('datos', en_string);
});

router.get('/en/grupo', (req, res) => {
  res.render('grupo', en_string);
});

router.get('/en/info', (req, res) => {
  res.render('info', en_string);
});

router.get('/en/maps', (req, res) => {
  res.render('maps', en_string);
});

router.get('/en/developing', (req, res) => {
  res.render('developing', en_string);
});

/*****************************************************/
/*                 FIN DE RUTAS                      */
/*****************************************************/
router.post('/api', (req, res) => {
  console.log('Están solicitando la API');
  console.log(req.body);
  res.status(404).send("No se encontró la página.");
});
module.exports = router;