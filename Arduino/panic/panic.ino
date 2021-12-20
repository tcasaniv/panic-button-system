//si usas esp32
// #include <HTTPClient.h>
// #include <WiFi.h>

//si usas esp8266
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "YOUR_SSID"; //Nombre de la red
const char *password = "YOUR_PASSWORD"; //Contraseña

String id = "NodeMCU-1405";
String dispositivo = "ESP8266";
String latitude = "-16.4049287";
String longitude = "-71.5287552";
String type = "Emergency";
String fabricacion = "19-12-2021";

void setup() {
  // Serial.begin(115200);
  Serial.begin(9600);
  delay(10);

  //Configuración  del GPIO2
  pinMode(2, OUTPUT);
  digitalWrite(2, LOW);
  
  Serial.println();
  Serial.println();
  Serial.print("Conectandose a red : ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password); //Conexión a la red

  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("");Serial.println("WiFi conectado con éxito, con IP local: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http;
    WiFiClient client;
    String datos_a_enviar = "id=" + id + "&dispositivo=" + dispositivo + "&latitude=" + latitude + "&longitude=" + longitude + "&type=" + type + "&fabricacion=" + fabricacion;

    http.begin(client,"botondepanico.tk", 80, "/panic"); //HTTP
    // http.begin(WiFiClient &client, const String& host, uint16_t port, const String& uri, bool https))
    //http.begin("http://botondepanico.tk/panic");                         //Indicamos el destino
    http.addHeader("Content-Type", "application/x-www-form-urlencoded"); //Preparamos el header text/plain si solo vamos a enviar texto plano sin un paradigma llave:valor.

    int codigo_respuesta = http.POST(datos_a_enviar); //Enviamos el post pasándole, los datos que queremos enviar. (esta función nos devuelve un código que guardamos en un int)

    if (codigo_respuesta > 0) {
      Serial.println("Código HTTP ► " + String(codigo_respuesta)); //Print return code
      if (codigo_respuesta == 200) {
        String cuerpo_respuesta = http.getString();
        Serial.println("El servidor respondió ▼ ");
        Serial.println(cuerpo_respuesta);
      }
    } else {
      Serial.print("Error enviando POST, código: ");
      Serial.println(codigo_respuesta);
    } http.end(); //Libera recursos
  } else {
    Serial.println("Error en la conexión WIFI");
  } delay(5000); //5 segundos para enviar de nuevo petición
}
