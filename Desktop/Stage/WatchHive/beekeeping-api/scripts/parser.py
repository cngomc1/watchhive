# import sys
# import json

# def parse_hex(hex_string):
#     # hex_string attendu: ex "001A01F4..." (24 chars pour 12 octets)
#     try:
#         if len(hex_string) != 24:
#             raise ValueError("La chaîne doit faire 12 octets (24 caractères hex)")

#         # Découpage tous les 4 caractères (2 octets = 16 bits)
#         # 2 octets hex -> int décimal
#         rain = int(hex_string[0:4], 16)
#         light = int(hex_string[4:8], 16)
#         temp_in = int(hex_string[8:12], 16)
#         temp_out = int(hex_string[12:16], 16)
#         humidity = int(hex_string[16:20], 16)
#         weight = int(hex_string[20:24], 16)
        
#         # Exemple de conversion si nécessaire (ex: diviser par 10 ou 100 selon le capteur)
#         # Ici je renvoie les valeurs brutes décimales
        
#         result = {
#             "rain": rain,
#             "light": light,
#             "temperature_in": temp_in,
#             "temperature_out": temp_out,
#             "humidity": humidity,
#             "weight": weight
#         }
#         print(json.dumps(result))
        
#     except Exception as e:
#         print(json.dumps({"error": str(e)}))

# if __name__ == "__main__":
#     # L'argument 1 est la data hex envoyée par Node
#     if len(sys.argv) > 1:
#         parse_hex(sys.argv[1])
#     else:
#         print(json.dumps({"error": "No data provided"}))

import sys
import json

def parse_hex(hex_string):
    try:
        # Nettoyage espace vide éventuel
        hex_string = hex_string.strip()
        
        if len(hex_string) != 24:
            raise ValueError("Data length must be 24 characters (12 bytes)")

        # Découpage et conversion Hex -> Int (Decimal)
        # Chaque paramètre prend 2 octets (4 caractères hex)
        rain = int(hex_string[0:4], 16)
        light = int(hex_string[4:8], 16)
        temp_in = int(hex_string[8:12], 16)
        temp_out = int(hex_string[12:16], 16)
        humidity = int(hex_string[16:20], 16)
        weight = int(hex_string[20:24], 16)
        
        result = {
            "rain": rain,
            "light": light,
            "temperature_in": temp_in,
            "temperature_out": temp_out,
            "humidity": humidity,
            "weight": weight
        }
        print(json.dumps(result))
        
    except Exception as e:
        # En cas d'erreur, on renvoie un JSON d'erreur
        print(json.dumps({"error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        parse_hex(sys.argv[1])
    else:
        print(json.dumps({"error": "No data provided"}))