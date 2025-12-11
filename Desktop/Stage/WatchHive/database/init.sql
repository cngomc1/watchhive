CREATE DATABASE watchhive;

CREATE TABLE ruchers (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    lat FLOAT,
    lng FLOAT,
    description TEXT
);

CREATE TABLE ruches (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(100),
    rucher_id INT REFERENCES ruchers(id),
    batterie INT,
    poids FLOAT,
    temperature_int FLOAT,
    temperature_ext FLOAT,
    humidite FLOAT
);

CREATE TABLE mesures (
    id SERIAL PRIMARY KEY,
    ruche_id INT REFERENCES ruches(id),
    poids FLOAT,
    temperature_int FLOAT,
    temperature_ext FLOAT,
    humidite FLOAT,
    luminosite FLOAT,
    pluie BOOLEAN,
    date_mesure TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE alertes (
    id SERIAL PRIMARY KEY,
    ruche_id INT REFERENCES ruches(id),
    type VARCHAR(50),
    valeur FLOAT,
    message TEXT,
    date_alerte TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255),
    name VARCHAR(100)
);