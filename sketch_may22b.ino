#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <TimeLib.h>

const char* ssid = "pol69";
const char* password = "123456789";
const int waterSensorPin = A0;

void setup() {
    Serial.begin(115200);
    delay(100);

    // Connect to WiFi network
    Serial.println();
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);

    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi...");
        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop() {
    if (WiFi.status() == WL_CONNECTED) {
        WiFiClient client;
        HTTPClient http;

        int water_level = analogRead(waterSensorPin);
        Serial.println(water_level);

        // Get current timestamp in seconds since the epoch
        time_t timestamp = now();

        // Get current date
        String date = String(year()) + "-" + String(month()) + "-" + String(day());

        String url = "http://192.168.179.207:5000/api/water_level";
        http.begin(client, url);

        http.addHeader("Content-Type", "application/json");

        // Construct JSON payload with water level, timestamp, and date
        String json = "{\"water_level\": " + String(water_level) + ", \"timestamp\": " + String(timestamp) + ", \"date\": \"" + date + "\"}";

        int httpResponseCode = http.POST(json);

        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println("HTTP Response code: " + String(httpResponseCode));
            Serial.println("Response: " + response);
        } else {
            Serial.print("Error sending data to server. HTTP Response code: ");
            Serial.println(httpResponseCode);
            Serial.println(http.errorToString(httpResponseCode));
        }

        http.end();
    } else {
        Serial.println("Wifi not connected. Unable to send data to MongoDB.");
    }

    delay(10000); // Delay for 10 seconds
}