#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Replace with your actual WiFi credentials
const char* ssid = "iPhone";
const char* password = "9999233082";

// IP address of your laptop running the Python Flask backend 'app.py'
// e.g., "http://192.168.1.100:5000/status"
const char* serverName = "http://172.20.10.2:5000/status";

// The GPIO pin where the relay or bulb is connected
// E.g., GPIO 5 is D1 on some ESP8266 boards, or just pin 5 on ESP32
const int relayPin = 23; 

// Timer variables
unsigned long previousMillis = 0;
const long interval = 3000; // Poll every 3 seconds

void setup() {
  Serial.begin(115200);
  
  // Set relay pin as output
  pinMode(relayPin, OUTPUT);
  // Default state: bulb ON (assuming relay is Active HIGH)
  // Note: if relay is Active LOW, change this to LOW initially
  digitalWrite(relayPin, HIGH); 
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  unsigned long currentMillis = millis();

  if(currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;

    // Check WiFi connection status
    if(WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(serverName); // Specify the URL
      
      // Send HTTP GET request
      int httpResponseCode = http.GET();
      
      if (httpResponseCode > 0) {
        String payload = http.getString();
        Serial.print("HTTP Code: ");
        Serial.println(httpResponseCode);
        
        // Parse the JSON. We expect: {"state": "off"} or {"state": "on"}
        DynamicJsonDocument doc(1024);
        DeserializationError error = deserializeJson(doc, payload);
        
        if (!error) {
          String state = doc["state"].as<String>();
          if (state == "off") {
            Serial.println("Command Received: OFF -> Disconnecting bulb...");
            digitalWrite(relayPin, LOW); // Turn bulb off
            
          } else if (state == "on") {
            Serial.println("Command Received: ON -> Reconnecting bulb...");
            digitalWrite(relayPin, HIGH); // Turn bulb on
          }
        } else {
          Serial.print("deserializeJson() failed: ");
          Serial.println(error.c_str());
        }
      } else {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
      }
      
      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
  }
}
