DO $$
  BEGIN
      IF NOT EXISTS (
          SELECT 1
          FROM pg_type
          WHERE typname = 'stations_status'
      ) THEN
          CREATE TYPE stations_status AS ENUM (
              'ativo',
              'inativo',
              'em_implantacao'
          );
      END IF;
  END
$$;

CREATE TABLE IF NOT EXISTS station_responsible (
    id BIGSERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    position VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS station_address (
    id BIGSERIAL PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(20),
    complement VARCHAR(255),
    neighborhood VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state CHAR(2) NOT NULL,
    zip_code VARCHAR(8) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (
    state,city,zip_code,street,neighborhood,number
    )
);

CREATE TABLE IF NOT EXISTS stations (
    id BIGSERIAL PRIMARY KEY,
    cnpj VARCHAR(14) UNIQUE NOT NULL,
    legal_name VARCHAR(255) NOT NULL,
    trade_name VARCHAR(255),
    brand VARCHAR(100) NOT NULL,
    address_id BIGINT NOT NULL
        REFERENCES station_address(id),
    responsible_person_id BIGINT
        REFERENCES station_responsible(id),
    inauguration_date DATE,
    nozzle_count INTEGER DEFAULT 0,
    lane_count INTEGER DEFAULT 0,
    status stations_status DEFAULT 'inativo',
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fuels (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS station_fuels (
    station_id BIGINT NOT NULL REFERENCES stations(id) ON DELETE CASCADE,
    fuel_id INTEGER NOT NULL REFERENCES fuels(id),
    PRIMARY KEY (station_id, fuel_id)
);

CREATE INDEX IF NOT EXISTS idx_station_fuels_fuel
ON station_fuels(fuel_id);

CREATE INDEX IF NOT EXISTS idx_stations_address
ON stations(address_id);

CREATE INDEX IF NOT EXISTS idx_stations_responsible
ON stations(responsible_person_id);

CREATE INDEX IF NOT EXISTS idx_station_brand
ON stations(brand);

CREATE INDEX IF NOT EXISTS idx_station_status
ON stations(status);

CREATE INDEX IF NOT EXISTS idx_address_state_city
ON station_address(state, city);
