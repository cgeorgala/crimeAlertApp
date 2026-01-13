-- INCIDENT  table

CREATE TYPE inc_type AS ENUM ('Robbery', 'Burglary', 'Vandalism', 'Vehicle Theft', 'Murder', 'Assault', 'Other');
CREATE TYPE verif_status AS ENUM ('Verified-official', 'Verified-Unofficial', 'Unverified');
CREATE TYPE sev_type AS ENUM ('Critical', 'Major', 'Minor', 'Not Applicable');

CREATE TABLE incidents (
  id               uuid NOT NULL DEFAULT uuid_generate_v4(),
  usr_id           uuid NOT NULL,
  title            character varying(255) NOT NULL,
  incident_type    inc_type NOT NULL,
  incident_date    timestamp without time zone,
  severity         sev_type NOT NULL ,
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
    ON DELETE RESTRICT ON UPDATE CASCADE

);

-- Index for map filtering
CREATE INDEX IF NOT EXISTS idx_incidents_lat_long
  ON incidents (latitude, longitude);