#include <WiFi.h>
#include <ThingSpeak.h>
#include <DHT.h>

// Wi-Fi credentials
const char* ssid = "bappahive";      // Your Wi-Fi name
const char* password = "bapparawal"; // Your Wi-Fi password

// ThingSpeak settings
unsigned long channelID = 2908962;   // Your Channel ID
const char* apiKey = "ODCQ0EM84E9QUYCT"; // Your new Write API Key
const char* server = "api.thingspeak.com";

// Sensor pins
#define DHT_PIN 4
#define MQ2_PIN 34
#define MQ135_PIN 35
#define DHT_TYPE DHT11

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient client;

void setup() {
  Serial.begin(115200);
  dht.begin();

  Serial.print("Connecting to Wi-Fi...");
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  if (ThingSpeak.begin(client)) {
    Serial.println("ThingSpeak initialized successfully");
  } else {
    Serial.println("ThingSpeak initialization failed");
  }
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int mq2Value = analogRead(MQ2_PIN);
  int mq135Value = analogRead(MQ135_PIN);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT11!");
    return;
  }

  Serial.print("Temp: "); Serial.print(temperature, 1); Serial.println(" °C");
  Serial.print("Humidity: "); Serial.print(humidity, 1); Serial.println(" %");
  Serial.print("MQ2: "); Serial.println(mq2Value);
  Serial.print("MQ135: "); Serial.println(mq135Value);

  if (WiFi.status() == WL_CONNECTED && client.connect(server, 80)) {
    ThingSpeak.setField(1, temperature);
    ThingSpeak.setField(2, humidity);
    ThingSpeak.setField(3, mq2Value);
    ThingSpeak.setField(4, mq135Value);

    Serial.print("Sending data to ThingSpeak with API Key: ");
    Serial.println(apiKey);

    // Capture and print the raw request (if possible)
    Serial.println("Attempting to capture request...");
    client.flush(); // Clear any previous data
    int response = ThingSpeak.writeFields(channelID, apiKey);

    // Read and print server response
    while (client.connected() || client.available()) {
      if (client.available()) {
        String line = client.readStringUntil('\n');
        Serial.print("Server Response: ");
        Serial.println(line);
      }
    }
    client.stop();

    if (response == 200) {
      Serial.println("Data sent successfully!");
    } else {
      Serial.println("Error sending data: " + String(response));
    }
  } else {
    Serial.println("Connection to ThingSpeak failed");
  }

  delay(30000); // Wait 30 seconds
}
