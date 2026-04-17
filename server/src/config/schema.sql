CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE utilisateur (
    "idUtilisateur" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    "nom" VARCHAR(50) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    mdp VARCHAR(255) NOT NULL,
    "tokenLinky" TEXT,
    prm VARCHAR(14)
);

CREATE TABLE consommation (
    "idConso" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    valeur DECIMAL(10, 3) NOT NULL,
    unite VARCHAR(10) NOT NULL DEFAULT 'kWh',
    "dateMesure" TIMESTAMP NOT NULL,
    "idUtilisateur" UUID REFERENCES utilisateur("idUtilisateur") ON DELETE CASCADE
);

CREATE TABLE alerte (
    "idAlerte" UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    "dateAlerte" TIMESTAMP DEFAULT NOW(),
    "idUtilisateur" UUID REFERENCES utilisateur("idUtilisateur") ON DELETE CASCADE,
    "idConso" UUID REFERENCES consommation("idConso") ON DELETE CASCADE
);