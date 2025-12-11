import requests
import random
import time

API_URL = "http://localhost:3000/mesures"

while True:
    data = {
        "ruche_id": 1,
        "poids": random.uniform(10, 30),
        "temperature_int": random.uniform(30, 38),
        "temperature_ext": random.uniform(15, 30),
        "humidite": random.uniform(40, 90),
        "luminosite": random.uniform(200, 900),
        "pluie": random.choice([True, False])
    }

    requests.post(API_URL, json=data)
    print("Data sent:", data)
    time.sleep(5)
