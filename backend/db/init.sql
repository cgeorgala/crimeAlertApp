-- Initialization script for postgres configuration

-- Create the uuid extension for uuidv4 unique data item IDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create USER table
CREATE TYPE usr_role AS ENUM ('citizen', 'police');

CREATE TABLE IF NOT EXISTS users(
  id               uuid NOT NULL DEFAULT uuid_generate_v4(),
  first_name       character varying(255) NOT NULL,
  last_name        character varying(255) NOT NULL,
  email            character varying(255) NOT NULL,
  username         character varying(50) NOT NULL,
  password         character varying(200) NOT NULL,
  role             usr_role NOT NULL,
  address          character varying(255),

  -- Keys
  -- Primary Key
  CONSTRAINT user_pkey PRIMARY KEY (id),

  -- Unique
  CONSTRAINT user_umail_key UNIQUE (email),
  CONSTRAINT user_uname_key UNIQUE (username)
);

-- Create INCIDENT  table
CREATE TYPE inc_type AS ENUM ('Robery', 'Burglary', 'Vandalism', 'Vehicle Theft', 'Murder', 'Assault', 'Other');
CREATE TYPE verif_status AS ENUM ('Verified-official', 'Verified-Unofficial', 'Unverified');
CREATE TYPE sev_type AS ENUM ('Critical', 'Major', 'Minor', 'Not Applicable');

CREATE TABLE IF NOT EXISTS incidents (
  id               uuid NOT NULL DEFAULT uuid_generate_v4(),
  usr_id           uuid NOT NULL,
  title            character varying(255) NOT NULL,
  incident_type    inc_type NOT NULL,
  incident_date    timestamp without time zone,
  severity         sev_type NOT NULL,
  address          TEXT CHECK (length(address) <= 255),
  latitude         DOUBLE PRECISION,
  longitude        DOUBLE PRECISION,         
  verify_status    verif_status NOT NULL,
  description      text DEFAULT '' CHECK (length(description) <= 255),
  date_created     timestamp without time zone DEFAULT timezone('eest'::text, now()),
  date_modified    timestamp without time zone DEFAULT timezone('eest'::text, now()),


  -- Keys
  -- Primary Key
  CONSTRAINT inc_pkey PRIMARY KEY (id),

  -- Foreign
  CONSTRAINT inc_user_fkey FOREIGN KEY (usr_id)
    REFERENCES users (id) MATCH SIMPLE
    ON DELETE CASCADE ON UPDATE CASCADE

);

