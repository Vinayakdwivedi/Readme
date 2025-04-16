#include <WiFi.h>
#include <ThingSpeak.h>
#include <DHT.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

// Wi-Fi credentials
const char* ssid = "bappahive";      // Your Wi-Fi name
const char* password = "bapparawal"; // Your Wi-Fi password

// ThingSpeak settings
unsigned long channelID = 2908962;   // Your Channel ID
const char* apiKey = "ODCQ0EM84E9QUYCT"; // Your Write API Key
const char* server = "api.thingspeak.com";

// Sensor pins
#define DHT_PIN 4
#define MQ2_PIN 34
#define MQ135_PIN 35
#define DHT_TYPE DHT11

// OLED settings
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_RESET -1 // Reset pin # (or -1 if sharing Arduino reset pin)
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

DHT dht(DHT_PIN, DHT_TYPE);
WiFiClient client;

void setup() {
  Serial.begin(115200);
  dht.begin();

  // Initialize OLED display
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { // Address 0x3C for 128x64
    Serial.println(F("SSD1306 allocation failed"));
    for (;;); // Don't proceed, loop forever
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println(F("Initializing..."));
  display.display();
  delay(1000);

  // Wi-Fi connection
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

  // Update OLED with Wi-Fi status
  display.clearDisplay();
  display.setCursor(0, 0);
  display.println(F("Wi-Fi Connected"));
  display.print(F("IP: "));
  display.println(WiFi.localIP());
  display.display();
  delay(1000);
}

void loop() {
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  int mq2Value = analogRead(MQ2_PIN);
  int mq135Value = analogRead(MQ135_PIN);

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT11!");
    // Display error on OLED
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println(F("DHT11 Error"));
    display.display();
    return;
  }

  // Print to Serial
  Serial.print("Temp: "); Serial.print(temperature, 1); Serial.println(" °C");
  Serial.print("Humidity: "); Serial.print(humidity, 1); Serial.println(" %");
  Serial.print("MQ2: "); Serial.println(mq2Value);
  Serial.print("MQ135: "); Serial.println(mq135Value);

  // Display on OLED
  display.clearDisplay();
  display.setCursor(0, 0);
  display.print(F("Temp: ")); display.print(temperature, 1); display.println(F(" C"));
  display.print(F("Hum: ")); display.print(humidity, 1); display.println(F(" %"));
  display.print(F("MQ2: ")); display.println(mq2Value);
  display.print(F("MQ135: ")); display.println(mq135Value);
  display.display();

  // Send to ThingSpeak
  if (WiFi.status() == WL_CONNECTED && client.connect(server, 80)) {
    ThingSpeak.setField(1, temperature);
    ThingSpeak.setField(2, humidity);
    ThingSpeak.setField(3, mq2Value);
    ThingSpeak.setField(4, mq135Value);

    Serial.print("Sending data to ThingSpeak with API Key: ");
    Serial.println(apiKey);

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
      // Update OLED with success
      display.setCursor(0, 56);
      display.println(F("TS OK"));
      display.display();
    } else {
      Serial.println("Error sending data: " + String(response));
      // Update OLED with error
      display.setCursor(0, 56);
      display.println(F("TS Error"));
      display.display();
    }
  } else {
    Serial.println("Connection to ThingSpeak failed");
    // Update OLED with connection error
    display.setCursor(0, 56);
    display.println(F("TS Conn Fail"));
    display.display();
  }

  delay(30000); // Wait 30 seconds
}
