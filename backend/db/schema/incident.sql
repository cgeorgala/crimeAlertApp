-- INCIDENT  table

CREATE TYPE inc_type AS ENUM ('Robery', 'Burglary', 'Vandalism', 'Vehicle Theft', 'Murder', 'Assault', 'Other');
CREATE TYPE verif_status AS ENUM ('Verified-official', 'Verified-Unofficial', 'Unverified');
CREATE TYPE sev_type AS ENUM ('Critical', 'Major', 'Minor', 'Not Applicable');

CREATE TABLE incidents (
  id               uuid NOT NULL DEFAULT uuid_generate_v4(),
  usr_id           uuid NOT NULL,
  incident_id      uuid NOT NULL,
  date_created     timestamp without time zone DEFAULT timezone('eest'::text, now()),
  date_modified    timestamp without time zone DEFAULT timezone('eest'::text, now()),
  title            character varying(255) NOT NULL,
  incident_type    incident_type NOT NULL,
  incident_date    timestamp without time zone DEFAULT timezone('eest'::text, now()),
  severity         sev_type NOT NULL,
  address          TEXT CHECK (length(address) <= 255),
  latidude         DOUBLE PRECISION,
  longtitude       DOUBLE PRECISION,         
  verify_status    verif_status NOT NULL,
  description      text DEFAULT '' CHECK (length(description) <= 255),


  -- Keys
  -- Primary Key
   CONSTRAINT inc_pkey PRIMARY KEY (id),

  -- Foreign
  CONSTRAINT inc_user_fkey FOREIGN KEY (usr_id)
    REFERENCES users (id) MATCH SIMPLE
    ON DELETE CASCADE ON UPDATE CASCADE

);