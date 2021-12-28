//si usas esp32
// #include <HTTPClient.h>
// #include <WiFi.h>

//si usas esp8266
#include <ESP8266WiFiMulti.h>
#include <ESP8266HTTPClient.h>

const char *ssid = "YOUR_SSID"; //Nombre de la red
const char *password = "YOUR_PASSWORD"; //Contraseña

String name = "ESP-82B2E6";
String description = "NodeMCU (ESP-12E) - ESP8266";
String latitude = "-16.4049287";
String longitude = "-71.5287552";
String type = "Emergency";
String fabricacion = "19-12-2021";

int estado = 0;

void setup() {
  // Serial.begin(115200);
  Serial.begin(9600);
  delay(10);

  //Configuración  del GPIO5
  pinMode(5, INPUT); //pin D1 (GPI05) como entrada
    
  Serial.println();
  Serial.println();
  Serial.print("Conectandose a red : ");
  Serial.println(ssid);
  //ESP.eraseConfig();
  WiFi.begin(ssid, password); //Conexión a la red

  while (WiFi.status() != WL_CONNECTED) {
    delay(500); Serial.print(".");
  }
  Serial.println("");Serial.println("WiFi conectado con éxito, con IP local: ");
  Serial.println(WiFi.localIP());
}

void enviarData(){
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status
    HTTPClient http; WiFiClient client;
    String datos_a_enviar = "name=" + name + "&description=" + description + "&latitude=" + latitude + "&longitude=" + longitude + "&type=" + type + "&fabricacion=" + fabricacion;
    
    //http.begin(WiFiClient &client, const String& host, uint16_t port, const String& uri, bool https))
    http.begin(client,"botondepanico.tk", 80, "/panic"); //Indicamos el destino
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
    } Serial.println("Liberando recursos: ");
    http.end(); //Libera recursos
  } else {
    Serial.println("Error en la conexión WIFI");
  } delay(5000); //5 segundos para enviar de nuevo petición
}

void loop() {  
  estado = digitalRead(5);
  if(estado == 1){ //Si el botón es presionado
    Serial.println("¡Botón presionado!");
    enviarData();
  } else { Serial.println("No presionado...");}
  estado = 0;  
}
