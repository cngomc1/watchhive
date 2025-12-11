import sys
import json
import struct

def decode(hex_payload):
    try:
        data_bytes = bytes.fromhex(hex_payload)
        # Rappel : Pluie, Lum, TempIn, TempOut, Hum, Poids
        valeurs = struct.unpack('>hhhhhh', data_bytes)
        
        return {
            "rain": valeurs[0],
            "light": valeurs[1],
            "temperature_in": valeurs[2],
            "temperature_out": valeurs[3],
            "humidity": valeurs[4],
            "weight": valeurs[5]
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # Node.js va appeler : python decoder.py "000100FF..."
    if len(sys.argv) > 1:
        payload = sys.argv[1]
        result = decode(payload)
        # On imprime le JSON pour que Node le récupère
        print(json.dumps(result))