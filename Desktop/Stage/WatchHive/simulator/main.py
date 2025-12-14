# import requests
# import random
# import time

API_URL = "http://localhost:3000/mesures"

# while True:
#     data = {
#         "ruche_id": 1,
#         "poids": random.uniform(10, 30),
#         "temperature_int": random.uniform(30, 38),
#         "temperature_ext": random.uniform(15, 30),
#         "humidite": random.uniform(40, 90),
#         "luminosite": random.uniform(200, 900),
#         "pluie": random.choice([True, False])
#     }

#     requests.post(API_URL, json=data)
#     print("Data sent:", data)
#     time.sleep(5)

import requests
import struct
import time
import random

# Configuration
API_URL = "http://localhost:3000/readings" # Adresse de ton API locale
DELAY_SECONDS = 15  # On met 10 sec pour le test (au lieu de 15min)

def generer_donnees_capteurs():
    """
    Simule la lecture des capteurs de la ruche.
    Retourne les valeurs brutes (entières).
    """
    # 1. Pluie (D7): 0 (Sec) ou 1 (Mouillé)
    rain = random.choice([0, 1])
    
    # 2. Luminosité (A0): 0 à 1023
    light = random.randint(0, 1023)
    
    # 3. Temp Intérieure (D3): 15°C à 35°C
    temperature_in = random.randint(15, 35)
    
    # 4. Temp Extérieure (DHT22): -5°C à 30°C (Gère les négatifs)
    temperature_out = random.randint(-5, 30)
    
    # 5. Humidité (DHT22): 20% à 90%
    humidity = random.randint(20, 90)
    
    # 6. Masse (A3): 500g à 2000g
    weight = random.randint(500, 2000)
    
    print(f"📊 CAPTEURS RÉELS (SIMULÉS) : Pluie={rain}, Lum={light}, Tin={temperature_in}, Tout={temperature_out}, Hum={humidity}, Poids={weight}")
    
    return rain, light, temperature_in, temperature_out, humidity, weight

def encoder_payload(rain, light, t_in, t_out, hum, w):
    """
    Transforme les 6 valeurs en une chaîne hexadécimale de 12 octets.
    Utilise 'short' (h) 16 bits signé big-endian.
    """
    # struct.pack('>hhhhhh') va convertir les 6 entiers en binaire
    binary_data = struct.pack('>hhhhhh', rain, light, t_in, t_out, hum, w)
    
    # .hex() transforme le binaire en chaîne lisible (ex: "0019")
    hex_string = binary_data.hex().upper()
    
    return hex_string

# --- Boucle Principale ---
print(f"🚀 Démarrage du simulateur de Ruche (Envoi vers {API_URL})")

while True:
    # 1. Lire les capteurs
    valeurs = generer_donnees_capteurs()
    
    # 2. Encoder en Hexadécimal (C'est ce que fait l'Arduino)
    payload_hex = encoder_payload(*valeurs)
    
    print(f"📡 ENVOI MESSAGE SIGFOX : {payload_hex}")
    
    # 3. Envoyer à l'API via POST
    # On simule le format JSON que Sigfox envoie souvent (data)
    json_data = {
        "device": "Ruche01",
        "time": int(time.time()),
        "data": payload_hex  # C'est ici que se trouve notre message codé
    }
    
    try:
        reponse = requests.post(API_URL, json=json_data)
        print(f"✅ Réponse API : {reponse.status_code} - {reponse.json()}")
    except Exception as e:
        print(f"❌ Erreur de connexion à l'API : {e}")

    print("-" * 40)
    time.sleep(DELAY_SECONDS)